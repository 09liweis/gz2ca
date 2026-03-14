import { defineEventHandler, setCookie } from 'h3';
import { User } from '../../models/user.schema';
import { comparePassword } from '../../utils/password';
import { getLoginToken } from '../../utils/jwt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Basic validation
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: '邮箱和密码为必填项'
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ eml: email });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '邮箱或密码错误'
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.pwd);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: '邮箱或密码错误'
      });
    }

    // Update last login time
    user.lts = new Date();
    await user.save();

    // Generate JWT token
    const token = await getLoginToken({ userId: user._id });

    // Set token in cookie
    setCookie(event, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.pwd;

    return {
      success: true,
      message: '登录成功',
      token,
      user: userResponse
    };
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: '登录失败，请稍后重试'
    });
  }
});
