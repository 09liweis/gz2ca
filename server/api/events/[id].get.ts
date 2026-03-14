import { Event } from '../../models/event.schema'
import { User } from '../../models/user.schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '活动ID不能为空'
    })
  }

  try {
    const eventDoc = await Event.findById(id)

    if (!eventDoc) {
      throw createError({
        statusCode: 404,
        statusMessage: '活动不存在'
      })
    }

    const organizer = await User.findById(eventDoc.user_id).select('fn ln email')

    return {
      success: true,
      event: eventDoc,
      organizer
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: '获取活动详情失败'
    })
  }
})
