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

export const resizeAndOptimizeImage = async (buffer: Buffer, maxSizeKB = 50, maxDimension = 200): Promise<Buffer> => {
  try {
    const image = await loadImage(buffer)

    // Calculate target dimensions maintaining aspect ratio
    let targetWidth = maxDimension
    let targetHeight = maxDimension

    const aspectRatio = image.width / image.height

    if (aspectRatio > 1) {
      // Landscape: width is limited by maxDimension
      targetWidth = Math.min(maxDimension, image.width)
      targetHeight = targetWidth / aspectRatio
    } else {
      // Portrait or square: height is limited by maxDimension
      targetHeight = Math.min(maxDimension, image.height)
      targetWidth = targetHeight * aspectRatio
    }

    const canvas = createCanvas(Math.round(targetWidth), Math.round(targetHeight))
    const ctx = canvas.getContext('2d')

    // Draw the image maintaining aspect ratio
    ctx.drawImage(image, 0, 0, Math.round(targetWidth), Math.round(targetHeight))

    // Start with quality 0.9 and reduce if too large
    let quality = 0.9
    let optimizedBuffer = canvas.toBuffer('image/jpeg', { quality })
    const maxBytes = maxSizeKB * 1024

    // Reduce quality until size is under limit or quality is too low
    while (optimizedBuffer.length > maxBytes && quality > 0.1) {
      quality -= 0.05
      optimizedBuffer = canvas.toBuffer('image/jpeg', { quality })
    }

    // If still too large, reduce dimensions while maintaining aspect ratio
    if (optimizedBuffer.length > maxBytes) {
      let scale = 0.8
      while (optimizedBuffer.length > maxBytes && scale > 0.2) {
        const smallerWidth = Math.round(targetWidth * scale)
        const smallerHeight = Math.round(targetHeight * scale)
        const smallerCanvas = createCanvas(smallerWidth, smallerHeight)
        const smallerCtx = smallerCanvas.getContext('2d')
        smallerCtx.drawImage(image, 0, 0, smallerWidth, smallerHeight)
        quality = 0.8
        optimizedBuffer = smallerCanvas.toBuffer('image/jpeg', { quality })
        scale -= 0.1
      }
    }

    return optimizedBuffer
  } catch (error) {
    console.error('Image resize error:', error)
    // Return original buffer if resize fails
    return buffer
  }
}
