import { defineEventHandler, readMultipartFormData } from 'h3';
import { User } from '../../models/user.schema';
import { verifyToken } from '../../utils/jwt';
import { uploadToR2, deleteFromR2, extractKeyFromUrl } from '../../utils/storage';
import { resizeAndOptimizeImage } from '../../utils/image';
import { extractToken } from '../../utils/auth';
import { handleUnauthorized, handleBadRequest, handleNotFound, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = extractToken(event);

  if (!token) {
    return handleUnauthorized();
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      return handleUnauthorized('用户不存在');
    }

    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      return handleBadRequest('未上传文件');
    }

    const fileData = formData.find(item => item.name === 'avatar');

    if (!fileData || !fileData.data) {
      return handleBadRequest('未找到头像文件');
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const fileType = fileData.type || 'image/jpeg';

    if (!allowedTypes.includes(fileType)) {
      return handleBadRequest('只支持图片格式 (JPEG, PNG, GIF, WebP)');
    }

    // Validate file size (max 5MB before optimization)
    const maxSize = 5 * 1024 * 1024;
    if (fileData.data.length > maxSize) {
      return handleBadRequest('图片大小不能超过 5MB');
    }

    // Resize and optimize image to max 50KB
    const optimizedBuffer = await resizeAndOptimizeImage(fileData.data, 50, 200);

    // Delete old avatar if exists
    const existingUser = await User.findById(user._id);
    if (existingUser?.avt) {
      try {
        const oldKey = extractKeyFromUrl(existingUser.avt);
        await deleteFromR2(oldKey);
      } catch (error) {
        console.error('Failed to delete old avatar:', error);
        // Continue with upload even if delete fails
      }
    }

    // Generate unique key for avatar
    const timestamp = Date.now();
    const key = `avatars/${user._id}_${timestamp}.jpg`;

    // Convert optimized Buffer to File
    const file = new File([optimizedBuffer], 'avatar.jpg', { type: 'image/jpeg' });

    // Upload to R2 (no thumbnail for avatar)
    const result = await uploadToR2(file, key, false);

    // Update user avatar
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        avt: result.url,
        mt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return handleNotFound('用户不存在');
    }

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.pwd;

    return {
      success: true,
      message: '头像上传成功',
      user: userResponse
    };
  } catch (error: any) {
    console.error('Upload avatar error:', error);
    return handleInternalError(error.message || '上传失败');
  }
});
