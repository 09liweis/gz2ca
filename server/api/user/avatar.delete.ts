import { defineEventHandler, getCookie } from 'h3';
import { User } from '../../models/user.schema';
import { verifyToken } from '../../utils/jwt';
import { deleteFromR2, extractKeyFromUrl } from '../../utils/storage';
import { handleUnauthorized, handleBadRequest, handleNotFound, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    handleUnauthorized();
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      handleUnauthorized('用户不存在');
    }

    const existingUser = await User.findById(user._id);

    if (!existingUser?.avt) {
      handleBadRequest('用户没有头像');
    }

    // Delete avatar from R2
    try {
      const key = extractKeyFromUrl(existingUser.avt);
      await deleteFromR2(key);
    } catch (error) {
      console.error('Failed to delete avatar from R2:', error);
      // Continue with user update even if delete fails
    }

    // Remove avatar URL from user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $unset: { avt: '' },
        mt: new Date()
      },
      { new: true }
    );

    if (!updatedUser) {
      handleNotFound('用户不存在');
    }

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.pwd;

    return {
      success: true,
      message: '头像删除成功',
      user: userResponse
    };
  } catch (error: any) {
    console.error('Delete avatar error:', error);
    handleInternalError(error.message || '删除失败');
  }
});
