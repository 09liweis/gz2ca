import { defineEventHandler, getCookie, readBody } from 'h3';
import { Event } from '../../models/event.schema';
import { verifyToken } from '../../utils/jwt';
import { upsertPlace } from '../../utils/place';
import { handleUnauthorized, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token') || event.node.req.headers.authorization?.split(' ')[1];

  if (!token) {
    return handleUnauthorized('请先登录');
  }

  try {
    const user = await verifyToken(token);
    if (!user || !user._id) {
      handleUnauthorized('用户不存在');
    }

    const body = await readBody(event);
    const { tl, desc, date, place, status } = body;

    const place_id = await upsertPlace(place);

    const newEvent = await Event.create({
      tl,
      desc,
      user_id: user._id,
      date,
      place_id,
      status: status || 'draft',
      ts: new Date(),
      mt: new Date()
    });

    const populatedEvent = await Event.findById(newEvent._id).populate('place_id');

    return {
      success: true,
      message: '活动创建成功',
      event: populatedEvent
    };
  } catch (error: any) {
    console.error('Create event error:', error);
    handleInternalError(error.message || '创建活动失败');
  }
});
