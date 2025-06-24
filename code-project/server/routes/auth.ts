// routes/auth.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Progress from '../models/Progress';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ error: 'Email, password, and name are required' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters long' });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409).json({ error: 'User already exists with this email' });
    return;
  }

  const user = new User({ email, password, name });
  await user.save();

  const progress = new Progress({
    userId: user._id,
    language: 'JavaScript',
    weeklyProgress: []
  });
  await progress.save();

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'User created successfully',
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
    }
  });
}));

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      lastLoginAt: user.lastLoginAt
    }
  });
}));

router.get(
  '/profile',
  authenticateToken,
  asyncHandler<AuthRequest>(async (req, res) => {
    const user = req.user!;

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  })
);


export default router;