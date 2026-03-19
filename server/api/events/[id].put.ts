import { defineEventHandler, readBody, getRouterParam } from 'h3';
import { Event } from '../../models/event.schema';
import { verifyToken } from '../../utils/jwt';
import { upsertPlace } from '../../utils/place';
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

    if (existingEvent.user_id.toString() !== user._id.toString()) {
      return handleForbidden('无权修改此活动');
    }

    const body = await readBody(event);
    const { tl, desc, date, place, status } = body;

    const place_id = place ? await upsertPlace(place) : existingEvent.place_id;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        tl,
        desc,
        date,
        place_id,
        status,
        mt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return handleNotFound('活动更新失败');
    }

    const populatedEvent = await Event.findById(updatedEvent._id).populate('place_id');
    return {
      success: true,
      message: '活动更新成功',
      event: populatedEvent
    };
  } catch (error: any) {
    console.error('Update event error:', error);
    handleInternalError(error.message || '更新活动失败');
  }
});
