import { defineEventHandler, readBody } from 'h3';
import { User } from '../../models/user.schema';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.split(' ')[1];
  if (!token) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const decoded = await verifyToken(token);
    if (decoded.role !== 'admin') {
      return { success: false, error: 'Forbidden' };
    }
  } catch (error) {
    return { success: false, error: 'Invalid token' };
  }

  const body = await readBody(event);
  const { email, password, name, role, status } = body;

  // Basic validation
  if (!email || !password || !name) {
    return { success: false, error: 'Missing required fields' };
  }

  if (password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters' };
  }

  const data = { email, password, name, role, status }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = new User({
    ...data,
    password: hashedPassword,
    role: data.role || 'user',
  });

  try {
    await user.save();
    return { success: true, user };
  } catch (error) {
    return { success: false, error };
  }
});