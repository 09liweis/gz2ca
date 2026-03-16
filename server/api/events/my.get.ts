import { defineEventHandler, getCookie } from 'h3';
import { Event } from '../../models/event.schema';
import { verifyToken } from '../../utils/jwt';
import { handleUnauthorized, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    handleUnauthorized('请先登录');
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      handleUnauthorized('用户不存在');
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
    handleInternalError('获取活动失败');
  }
});
