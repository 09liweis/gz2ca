import { Event } from '../../models/event.schema'
import { User } from '../../models/user.schema'
import { handleBadRequest, handleNotFound, handleInternalError } from '../../utils/error'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    handleBadRequest('活动ID不能为空')
  }

  try {
    const eventDoc = await Event.findById(id).populate('place_id')

    if (!eventDoc) {
      return handleNotFound('活动不存在')
    }

    const organizer = await User.findById(eventDoc.user_id).select('fn ln email')
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
    handleInternalError('获取活动详情失败')
  }
})
