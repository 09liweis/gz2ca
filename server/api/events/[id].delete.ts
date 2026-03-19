import { defineEventHandler, getRouterParam } from 'h3';
import { Event } from '../../models/event.schema';
import { verifyToken } from '../../utils/jwt';
import { extractToken } from '../../utils/auth';
import { handleUnauthorized, handleBadRequest, handleNotFound, handleForbidden, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = extractToken(event);

  if (!token) {
    return handleUnauthorized('请先登录');
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      return handleUnauthorized('用户不存在');
    }

    const eventId = getRouterParam(event, 'id');
    if (!eventId) {
      return handleBadRequest('活动ID不能为空');
    }

    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      return handleNotFound('活动不存在');
    }

    // Check if user is the organizer
    if (existingEvent.user_id !== user._id.toString()) {
      return handleForbidden('无权删除此活动');
    }

    // Delete event
    await Event.findByIdAndDelete(eventId);

    return {
      success: true,
      message: '活动删除成功'
    };
  } catch (error: any) {
    console.error('Delete event error:', error);
    return handleInternalError(error.message || '删除活动失败');
  }
});
