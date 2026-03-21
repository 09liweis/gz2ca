import { defineEventHandler, getRouterParam } from 'h3'
import { Event } from '../../models/event.schema'
import { User } from '../../models/user.schema'
import { Media } from '../../models/media.schema'
import { handleBadRequest, handleNotFound, handleInternalError } from '../../utils/error'
import { connectDB } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    return handleBadRequest('活动ID不能为空')
  }

  try {
    await connectDB();

    const eventDoc = await Event.findById(id).populate('place_id')

    if (!eventDoc) {
      return handleNotFound('活动不存在')
    }

    const organizer = await User.findById(eventDoc.user_id).select('fn ln email avt')
    const mediaList = await Media.find({ event_id: id }).sort({ ts: -1 })

    return {
      success: true,
      event: eventDoc,
      organizer,
      medias: mediaList
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    return handleInternalError('获取活动详情失败')
  }
})
