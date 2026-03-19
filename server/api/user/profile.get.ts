import { defineEventHandler, getCookie } from 'h3';
import { verifyToken } from '../../utils/jwt';
import { handleUnauthorized } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    return handleUnauthorized();
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      return handleUnauthorized('用户不存在');
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
    return handleUnauthorized('获取用户信息失败');
  }
});
