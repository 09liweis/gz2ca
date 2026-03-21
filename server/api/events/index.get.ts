import { defineEventHandler } from 'h3';
import { Event } from '../../models/event.schema';
import { handleInternalError } from '../../utils/error';
import { connectDB } from '../../utils/db';

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const events = await Event.find({ status: 'published' })
      .populate('place_id')
      .sort({ date: -1 })
      .lean();

    return {
      success: true,
      events
    };
  } catch (error: any) {
    console.error('Get events error:', error);
    return handleInternalError('获取活动失败');
  }
});
