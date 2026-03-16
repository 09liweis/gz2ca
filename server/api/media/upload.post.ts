import { Media } from '../../models/media.schema'
import { uploadToR2 } from '../../utils/storage'
import { handleBadRequest, handleInternalError } from '../../utils/error'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { eventId, files } = body

  if (!eventId) {
    handleBadRequest('活动ID不能为空')
  }

  if (!files || !Array.isArray(files) || files.length === 0) {
    handleBadRequest('请至少上传一张图片')
  }

  try {
    const uploadedMedia = []

    for (const file of files) {
      const { name, type, base64 } = file

      // Convert base64 to Buffer
      const buffer = Buffer.from(base64, 'base64')

      // Create file object for upload
      const fileObj = new File([buffer], name, { type })

      // Generate unique key
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const key = `events/${eventId}/${timestamp}-${randomString}-${name}`

      // Upload to R2 with thumbnail
      const { url, thumb } = await uploadToR2(fileObj, key, true)

      // Save to database
      const media = await Media.create({
        event_id: eventId,
        thumb: thumb || url,
        src: url,
        ts: new Date(),
        mt: new Date()
      })

      uploadedMedia.push(media)
    }

    return {
      success: true,
      media: uploadedMedia
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    handleInternalError(error.message || '上传失败')
  }
})
