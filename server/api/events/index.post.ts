import { defineEventHandler, getCookie, readBody } from 'h3';
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

    const body = await readBody(event);
    const { tl, desc, date, address, city, status } = body;

    // Create event
    const newEvent = await Event.create({
      tl,
      desc,
      user_id: user._id,
      date,
      address,
      city,
      status: status || 'draft',
      ts: new Date(),
      mt: new Date()
    });

    return {
      success: true,
      message: '活动创建成功',
      event: newEvent
    };
  } catch (error: any) {
    console.error('Create event error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '创建活动失败'
    });
  }
});
