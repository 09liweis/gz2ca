import { defineEventHandler, getCookie, readBody } from 'h3';
import { User } from '../../models/user.schema';
import { verifyToken } from '../../utils/jwt';

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

    const body = await readBody(event);
    const { fn, ln, graduationYear, location, bio } = body;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        fn,
        ln,
        graduationYear,
        location,
        bio,
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
      message: '个人资料更新成功',
      user: userResponse
    };
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '更新失败'
    });
  }
});
