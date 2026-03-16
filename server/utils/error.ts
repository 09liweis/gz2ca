/**
 * Unified error handler for API endpoints
 * Creates and throws standardized errors with proper status codes and messages
 */
export const handleApiError = (statusCode: number, message: string) => {
  throw createError({
    statusCode,
    statusMessage: message
  })
}

/**
 * Common error handlers for specific scenarios
 */
export const handleUnauthorized = (message: string = '未授权访问') => {
  handleApiError(401, message)
}

export const handleBadRequest = (message: string = '请求参数错误') => {
  handleApiError(400, message)
}

export const handleNotFound = (message: string = '资源不存在') => {
  handleApiError(404, message)
}

export const handleForbidden = (message: string = '无权访问此资源') => {
  handleApiError(403, message)
}

export const handleInternalError = (message: string = '服务器内部错误') => {
  handleApiError(500, message)
}
