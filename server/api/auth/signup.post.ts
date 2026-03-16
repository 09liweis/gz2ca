import { defineEventHandler, readBody, setCookie } from 'h3';
import { User } from '../../models/user.schema';
import { hashPassword } from '../../utils/password';
import { handleBadRequest, handleInternalError } from '../../utils/error';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password,fn,ln } = body;

  // Basic validation
  if (!email || !password) {
    handleBadRequest('邮箱和密码为必填项');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    handleBadRequest('邮箱格式不正确');
  }

  // Validate password strength (minimum 6 characters)
  if (password.length < 6) {
    handleBadRequest('密码长度至少为6位');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ eml: email });
    if (existingUser) {
      handleBadRequest('该邮箱已被注册');
    }

    // Hash password with bcrypt
    const hashedPassword = await hashPassword(password);

    // Create new user with minimal fields
    const user = await User.create({
      eml: email,
      pwd: hashedPassword,
      fn,
      ln,
      role: 'user',
      lts: new Date(),
      ts: new Date(),
      mt: new Date()
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.pwd;

    return {
      success: true,
      message: '注册成功',
      user: userResponse
    };
  } catch (error: any) {
    console.error('Signup error:', error);
    if (error.statusCode) {
      throw error;
    }
    handleInternalError('注册失败，请稍后重试');
  }
});
