export const verifyGoogleToken = async (idToken: string) => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

  if (!GOOGLE_CLIENT_ID) {
    throw new Error('Google Client ID not configured')
  }

  try {
    // Verify token with Google's tokeninfo endpoint (no third-party library needed)
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    const data = await response.json() as any

    // Check if token is valid
    if (data.error || data.aud !== GOOGLE_CLIENT_ID) {
      throw new Error('Invalid Google token')
    }

    return {
      googleId: data.sub,
      email: data.email,
      name: data.name,
      picture: data.picture,
      givenName: data.given_name,
      familyName: data.family_name,
      emailVerified: data.email_verified
    }
  } catch (error: any) {
    console.error('Google token verification error:', error)
    throw new Error('Failed to verify Google token')
  }
}
