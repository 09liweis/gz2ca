import { Media } from '../../../models/media.schema'
import { handleBadRequest, handleInternalError } from '../../../utils/error'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    handleBadRequest('活动ID不能为空')
  }

  try {
    const mediaList = await Media.find({ event_id: id }).sort({ ts: -1 })

    return {
      success: true,
      media: mediaList
    }
  } catch (error: any) {
    console.error('Get media error:', error)
    handleInternalError('获取媒体列表失败')
  }
})
