
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Access token required' });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};