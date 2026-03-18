import { defineEventHandler, setCookie } from 'h3'
import { User } from '../../models/user.schema'
import { getLoginToken } from '../../utils/jwt'
import { handleBadRequest, handleUnauthorized, handleInternalError } from '../../utils/error'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { code } = body

  if (!code) {
    return handleBadRequest('Google authorization code is required')
  }

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return handleBadRequest('Google Client ID or Secret not configured')
  }

  try {
    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code: code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code'
      })
    })

    const tokenData = await tokenResponse.json() as any

    if (tokenData.error) {
      console.error('Google token exchange error:', tokenData)
      return handleBadRequest('Failed to exchange Google authorization code')
    }

    // Use the ID token to get user info
    const idToken = tokenData.id_token

    // Verify ID token with Google
    const userInfoResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    const googleUser = await userInfoResponse.json() as any

    if (googleUser.error || googleUser.aud !== GOOGLE_CLIENT_ID) {
      return handleUnauthorized('Invalid Google ID token')
    }

    if (!googleUser.email_verified) {
      return handleBadRequest('Email must be verified')
    }

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId: googleUser.sub }, { eml: googleUser.email }] })

    if (user) {
      // Update existing user with Google ID if not already set
      if (!user.googleId) {
        user.googleId = googleUser.sub
      }
      // Update avatar if not set and Google provides one
      if (!user.avt && googleUser.picture) {
        user.avt = googleUser.picture
      }
      user.lts = new Date()
      user.mt = new Date()
      await user.save()
    } else {
      // Create new user from Google account
      user = await User.create({
        googleId: googleUser.sub,
        eml: googleUser.email,
        fn: googleUser.given_name || '',
        ln: googleUser.family_name || '',
        avt: googleUser.picture,
        role: 'user',
        lts: new Date(),
        ts: new Date(),
        mt: new Date()
      })
    }

    // Generate JWT token
    const token = await getLoginToken({ userId: user._id })

    // Set token in cookie
    setCookie(event, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // Remove password from response
    const userResponse = user.toObject()
    delete userResponse.pwd

    return {
      success: true,
      message: '登录成功',
      token,
      user: userResponse
    }
  } catch (error: any) {
    console.error('Google login error:', error)
    if (error.statusCode) {
      throw error
    }
    return handleInternalError('Google登录失败，请稍后重试')
  }
})
