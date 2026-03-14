import { Media } from '../../../models/media.schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '活动ID不能为空'
    })
  }

  try {
    const mediaList = await Media.find({ event_id: id }).sort({ ts: -1 })

    return {
      success: true,
      media: mediaList
    }
  } catch (error: any) {
    console.error('Get media error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '获取媒体列表失败'
    })
  }
})
