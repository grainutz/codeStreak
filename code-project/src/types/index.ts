
import mongoose from 'mongoose';

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

export interface LessonChallenge {
  question: string;
  starterCode: string;
  solution: string;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  challenge: LessonChallenge;
}

export interface LessonData {
  lessons: Lesson[];
}