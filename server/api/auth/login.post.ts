import { defineEventHandler, setCookie } from 'h3';
import { User } from '../../models/user.schema';
import { comparePassword } from '../../utils/password';
import { getLoginToken } from '../../utils/jwt';
import { handleBadRequest, handleUnauthorized, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Basic validation
  if (!email || !password) {
    return handleBadRequest('邮箱和密码为必填项');
  }

  try {
    // Find user by email
    const user = await User.findOne({ eml: email });
    if (!user) {
      return handleUnauthorized('邮箱或密码错误');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.pwd);
    if (!isPasswordValid) {
      return handleUnauthorized('邮箱或密码错误');
    }

    // Update last login time
    user.lts = new Date();
    await user.save();

    // Generate JWT token
    const token = await getLoginToken({ userId: user._id });

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
    return handleInternalError('登录失败，请稍后重试');
  }
});
