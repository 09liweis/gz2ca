import { createCanvas, loadImage } from 'canvas'

export const generateThumbnail = async (buffer: Buffer, width = 300, height = 200): Promise<Buffer> => {
  try {
    const image = await loadImage(buffer)

    // Calculate aspect ratio
    const aspectRatio = image.width / image.height
    let targetWidth = width
    let targetHeight = height

    if (aspectRatio > width / height) {
      targetHeight = width / aspectRatio
    } else {
      targetWidth = height * aspectRatio
    }

    const canvas = createCanvas(Math.round(targetWidth), Math.round(targetHeight))
    const ctx = canvas.getContext('2d')

    ctx.drawImage(image, 0, 0, Math.round(targetWidth), Math.round(targetHeight))

    return canvas.toBuffer('image/jpeg', { quality: 0.8 })
  } catch (error) {
    console.error('Thumbnail generation error:', error)
    // Return original buffer if thumbnail generation fails
    return buffer
  }
}
