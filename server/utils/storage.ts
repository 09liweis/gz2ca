import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { generateThumbnail } from './image'

let s3Client: S3Client | null = null

const getS3Client = () => {
  if (!s3Client) {
    s3Client = new S3Client({
      region: process.env.R2_REGION || 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
      }
    })
  }
  return s3Client
}

export const uploadToR2 = async (file: File, key: string, generateThumb = true): Promise<{ url: string; thumb?: string }> => {
  const client = getS3Client()
  const bucket = process.env.R2_BUCKET_NAME || ''

  if (!bucket) {
    throw new Error('R2 bucket name not configured')
  }

  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload original image
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type
    })

    await client.send(command)

    const url = `${process.env.R2_PUBLIC_URL}/${key}`

    let thumbUrl: string | undefined

    // Generate and upload thumbnail if it's an image
    if (generateThumb && file.type.startsWith('image/')) {
      try {
        const thumbBuffer = await generateThumbnail(buffer)
        const thumbKey = key.replace(/(\.[^.]+)$/, '_thumb$1')

        const thumbCommand = new PutObjectCommand({
          Bucket: bucket,
          Key: thumbKey,
          Body: thumbBuffer,
          ContentType: 'image/jpeg'
        })

        await client.send(thumbCommand)

        thumbUrl = `${process.env.R2_PUBLIC_URL}/${thumbKey}`
      } catch (thumbError) {
        console.error('Thumbnail generation error:', thumbError)
        // Continue without thumbnail if generation fails
      }
    }

    return { url, thumb: thumbUrl }
  } catch (error) {
    console.error('Upload error:', error)
    throw new Error('文件上传失败')
  }
}

export const deleteFromR2 = async (key: string): Promise<void> => {
  const client = getS3Client()
  const bucket = process.env.R2_BUCKET_NAME || ''

  if (!bucket) {
    throw new Error('R2 bucket name not configured')
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key
    })

    await client.send(command)
  } catch (error) {
    console.error('Delete error:', error)
    throw new Error('文件删除失败')
  }
}

export const extractKeyFromUrl = (url: string): string => {
  const publicUrl = process.env.R2_PUBLIC_URL || ''
  if (url.startsWith(publicUrl)) {
    return url.replace(publicUrl + '/', '')
  }
  return url
}
