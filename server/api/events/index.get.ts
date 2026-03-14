import { defineEventHandler } from 'h3';
import { Event } from '../../models/event.schema';

export default defineEventHandler(async (event) => {
  try {
    // Get all published events
    const events = await Event.find({ status: 'published' })
      .sort({ date: 1 })
      .lean();

    return {
      success: true,
      events
    };
  } catch (error: any) {
    console.error('Get events error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '获取活动失败'
    });
  }
});
