import { defineEventHandler, getCookie, readMultipartFormData } from 'h3';
import { User } from '../../models/user.schema';
import { verifyToken } from '../../utils/jwt';
import { uploadToR2, deleteFromR2, extractKeyFromUrl } from '../../utils/storage';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: '未授权访问'
    });
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      throw createError({
        statusCode: 401,
        statusMessage: '用户不存在'
      });
    }

    const formData = await readMultipartFormData(event);
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '未上传文件'
      });
    }

    const fileData = formData.find(item => item.name === 'avatar');
    
    if (!fileData || !fileData.data) {
      throw createError({
        statusCode: 400,
        statusMessage: '未找到头像文件'
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const fileType = fileData.type || 'image/jpeg';
    
    if (!allowedTypes.includes(fileType)) {
      throw createError({
        statusCode: 400,
        statusMessage: '只支持图片格式 (JPEG, PNG, GIF, WebP)'
      });
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (fileData.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: '图片大小不能超过 5MB'
      });
    }

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
    const ext = getFileExtension(fileData.filename || 'jpg');
    const key = `avatars/${user._id}_${timestamp}.${ext}`;

    // Convert Buffer to File
    const file = new File([fileData.data], fileData.filename || 'avatar.jpg', { type: fileType });

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
      throw createError({
        statusCode: 404,
        statusMessage: '用户不存在'
      });
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
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || '上传失败'
    });
  }
});

function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop();
  return ext || 'jpg';
}
