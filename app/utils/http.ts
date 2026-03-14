/**
 * HTTP request utility functions
 */

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  headers?: Record<string, string>
  params?: Record<string, string>
}

/**
 * Generic HTTP request function
 * @param url - API endpoint URL
 * @param options - Request options
 * @returns Response data
 */
export const request = async <T = any>(url: string, options: RequestOptions = {}): Promise<T> => {
  const {
    method = 'GET',
    body,
    headers = {},
    params
  } = options

  // Add authorization header from localStorage if token exists
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Build URL with query params
  let finalUrl = url
  if (params) {
    const queryParams = new URLSearchParams(params).toString()
    finalUrl = `${url}?${queryParams}`
  }

  try {
    const response = await $fetch<T>(finalUrl, {
      method,
      body,
      headers
    })
    return response
  } catch (error: any) {
    console.error('Request error:', error)
    
    // Handle common error scenarios
    if (error.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      navigateTo('/login')
      throw new Error('请先登录')
    }
    
    throw error
  }
}

/**
 * GET request
 */
export const get = <T = any>(url: string, options?: Omit<RequestOptions, 'method'>): Promise<T> => {
  return request<T>(url, { ...options, method: 'GET' })
}

/**
 * POST request
 */
export const post = <T = any>(url: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> => {
  return request<T>(url, { ...options, method: 'POST', body })
}

/**
 * PUT request
 */
export const put = <T = any>(url: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> => {
  return request<T>(url, { ...options, method: 'PUT', body })
}

/**
 * DELETE request
 */
export const del = <T = any>(url: string, options?: Omit<RequestOptions, 'method'>): Promise<T> => {
  return request<T>(url, { ...options, method: 'DELETE' })
}

/**
 * PATCH request
 */
export const patch = <T = any>(url: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> => {
  return request<T>(url, { ...options, method: 'PATCH', body })
}
