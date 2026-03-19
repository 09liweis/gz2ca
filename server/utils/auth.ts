import { H3Event, getCookie } from 'h3'

export function extractToken(event: H3Event): string | null {
  const cookieToken = getCookie(event, 'token')
  if (cookieToken) {
    return cookieToken
  }

  const authHeader = event.node.req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1]
  }

  return null
}
