import { defineEventHandler, getRouterParam } from 'h3';
import { Event } from '../../models/event.schema';
import { Media } from '../../models/media.schema';
import { verifyToken } from '../../utils/jwt';
import { extractToken } from '../../utils/auth';
import { deleteFromR2, extractKeyFromUrl } from '../../utils/storage'
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
      return handleNotFound(`${eventId} 活动不存在`);
    }

    // Check if user is the organizer
    if (existingEvent.user_id.toString() !== user._id.toString()) {
      return handleForbidden(`${existingEvent.user_id} ${user._id}无权删除此活动`);
    }

    // Delete event
    await Event.findByIdAndDelete(eventId);
    const medias = await Media.find({event_id: eventId});
    medias.forEach(async(media)=>{
      // Delete from R2
      const key = extractKeyFromUrl(media.src.toString())
      await deleteFromR2(key)
    })
    await Media.deleteMany({event_id: eventId})

    return {
      success: true,
      message: '活动删除成功'
    };
  } catch (error: any) {
    console.error('Delete event error:', error);
    return handleInternalError(error.message || '删除活动失败');
  }
});
