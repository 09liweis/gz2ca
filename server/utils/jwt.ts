import jwt from 'jsonwebtoken';

export const getLoginToken = async ({userId}:{userId:any}) => {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1w' });
  return token;
}

export const getRefreshToken = async ({userId}:{userId:any}) => {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
  return token;
}

export const verifyToken = async (token:string) => {
  const EMPTY_USER = {role:'',_id:''};
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string) as {userId:string};
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found');
      return EMPTY_USER;
    }
    return user;
  } catch (err) {
    console.error(`VerifyToken ${token} error: `, err);
    return EMPTY_USER;
  }
}