import { Media } from '../../models/media.schema'
import { deleteFromR2, extractKeyFromUrl } from '../../utils/storage'
import { handleBadRequest, handleNotFound, handleInternalError } from '../../utils/error'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    handleBadRequest(`媒体ID不能为空`)
  }

  try {
    const media = await Media.findById(id)

    if (!media) {
      return handleNotFound(`${id} 媒体不存在`)
    }

    if (!media.src) {
      return handleBadRequest(`${id} 媒体源不能为空`)
    }

    // Delete from R2
    const key = extractKeyFromUrl(media.src.toString())
    await deleteFromR2(key)

    // Delete from database
    await Media.findByIdAndDelete(id)

    return {
      success: true,
      message: '删除成功'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Delete error:', error)
    handleInternalError(error.message || '删除失败')
  }
})
