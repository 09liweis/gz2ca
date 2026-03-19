import { defineEventHandler, readBody } from 'h3';
import { User } from '../../models/user.schema';
import { verifyToken } from '../../utils/jwt';
import { extractToken } from '../../utils/auth';
import { handleUnauthorized, handleNotFound, handleInternalError } from '../../utils/error';

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
      return handleNotFound('用户不存在');
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
    return handleInternalError(error.message || '更新失败');
  }
});
