import { defineEventHandler, getCookie } from 'h3';
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

    // Return user profile without password
    const userResponse = user.toObject();
    delete userResponse.pwd;

    return {
      success: true,
      user: userResponse
    };
  } catch (error: any) {
    console.error('Get profile error:', error);
    throw createError({
      statusCode: 401,
      statusMessage: '获取用户信息失败'
    });
  }
});
