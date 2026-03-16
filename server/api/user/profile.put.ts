import { defineEventHandler, getCookie, readBody } from 'h3';
import { User } from '../../models/user.schema';
import { verifyToken } from '../../utils/jwt';
import { handleUnauthorized, handleNotFound, handleInternalError } from '../../utils/error';

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

    const body = await readBody(event);
    const { fn, ln, graduationYear, location, bio, avt } = body;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        fn,
        ln,
        graduationYear,
        location,
        bio,
        avt,
        mt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      handleNotFound('用户不存在');
    }

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.pwd;

    return {
      success: true,
      message: '个人资料更新成功',
      user: userResponse
    };
  } catch (error: any) {
    console.error('Update profile error:', error);
    handleInternalError(error.message || '更新失败');
  }
});
