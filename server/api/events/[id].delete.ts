import { defineEventHandler, getCookie, getRouterParam } from 'h3';
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

    const eventId = getRouterParam(event, 'id');
    if (!eventId) {
      throw createError({
        statusCode: 400,
        statusMessage: '活动ID不能为空'
      });
    }

    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      throw createError({
        statusCode: 404,
        statusMessage: '活动不存在'
      });
    }

    // Check if user is the organizer
    if (existingEvent.user_id !== user._id.toString()) {
      throw createError({
        statusCode: 403,
        statusMessage: '无权删除此活动'
      });
    }

    // Delete event
    await Event.findByIdAndDelete(eventId);

    return {
      success: true,
      message: '活动删除成功'
    };
  } catch (error: any) {
    console.error('Delete event error:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || '删除活动失败'
    });
  }
});
