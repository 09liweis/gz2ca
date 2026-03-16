import { defineEventHandler, getCookie, readBody, getRouterParam } from 'h3';
import { Event } from '../../models/event.schema';
import { verifyToken } from '../../utils/jwt';
import { handleUnauthorized, handleBadRequest, handleNotFound, handleForbidden, handleInternalError } from '../../utils/error';

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

    const eventId = getRouterParam(event, 'id');
    if (!eventId) {
      handleBadRequest('活动ID不能为空');
    }

    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      handleNotFound('活动不存在');
    }

    // Check if user is the organizer
    if (existingEvent.user_id !== user._id.toString()) {
      handleForbidden('无权修改此活动');
    }

    const body = await readBody(event);
    const { tl, desc, date, address, city, status } = body;

    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        tl,
        desc,
        date,
        address,
        city,
        status,
        mt: new Date()
      },
      { new: true, runValidators: true }
    );

    return {
      success: true,
      message: '活动更新成功',
      event: updatedEvent
    };
  } catch (error: any) {
    console.error('Update event error:', error);
    handleInternalError(error.message || '更新活动失败');
  }
});
