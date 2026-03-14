import { Media } from '../../models/media.schema'
import { deleteFromR2, extractKeyFromUrl } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '媒体ID不能为空'
    })
  }

  try {
    const media = await Media.findById(id)

    if (!media) {
      throw createError({
        statusCode: 404,
        statusMessage: '媒体不存在'
      })
    }

    // Delete from R2
    const key = extractKeyFromUrl(media.src)
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
    throw createError({
      statusCode: 500,
      statusMessage: error.message || '删除失败'
    })
  }
})
