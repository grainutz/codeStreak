const API_BASE_URL = 'http://localhost:3000/api';
import mongoose, { Document, Schema } from 'mongoose';

export const register = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};


export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  return data; // ✅ must include `data.token`
};

export const getProgress = async (language: string = 'JavaScript'): Promise<UserProgress> => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No auth token found');

  const res = await fetch(`${API_BASE_URL}/progress?language=${language}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to load progress');
  return res.json();
};


export const updateProgress = async (token: string, data: any) => {
  const response = await fetch('/api/progress/daily', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export interface User {
  id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface DailyProgress {
  date: Date;
  completed: boolean;
  lessonsCompleted: number;
  timeSpent: number;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
  type: 'streak' | 'lessons' | 'xp' | 'time';
}

export interface UserProgress {
  userId: mongoose.Types.ObjectId;
  language: string;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalXP: number;
  totalTimeSpent: number;
  weeklyProgress: DailyProgress[];
  achievements: Achievement[];
  currentLevel: number;
  lastUpdated: Date;
  createdAt: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ProgressResponse {
  progress: UserProgress;
}

export interface WeeklyOverview {
  completedDays: boolean[];
  completedCount: number;
  totalDays: number;
  progressValue: number;
}
