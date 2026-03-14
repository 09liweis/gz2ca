import { defineEventHandler, getCookie } from 'h3';
import { Event } from '../../models/event.schema';
import { verifyToken } from '../../utils/jwt';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: '请先登录'
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

    // Get all events created by the user (draft and published)
    const events = await Event.find({ user_id: user._id.toString() })
      .sort({ date: 1 })
      .lean();

    return {
      success: true,
      events
    };
  } catch (error: any) {
    console.error('Get my events error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '获取活动失败'
    });
  }
});
