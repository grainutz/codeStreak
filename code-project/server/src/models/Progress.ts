
import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyProgress {
  date: Date;
  completed: boolean;
  lessonsCompleted: number;
  timeSpent: number; // in minutes
  xpEarned: number;
}

export interface IAchievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: Date;
  type: 'streak' | 'lessons' | 'xp' | 'time';
}

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  language: string;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  totalXP: number;
  totalTimeSpent: number; // in minutes
  weeklyProgress: IDailyProgress[];
  achievements: IAchievement[];
  currentLevel: number;
  lastUpdated: Date;
  createdAt: Date;
}

const dailyProgressSchema = new Schema<IDailyProgress>({
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  lessonsCompleted: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  xpEarned: { type: Number, default: 0 }
});

const achievementSchema = new Schema<IAchievement>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  unlockedAt: { type: Date, required: true },
  type: { 
    type: String, 
    enum: ['streak', 'lessons', 'xp', 'time'],
    required: true 
  }
});

const progressSchema = new Schema<IProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'JavaScript'
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  totalLessonsCompleted: {
    type: Number,
    default: 0
  },
  totalXP: {
    type: Number,
    default: 0
  },
  totalTimeSpent: {
    type: Number,
    default: 0
  },
  weeklyProgress: [dailyProgressSchema],
  achievements: [achievementSchema],
  currentLevel: {
    type: Number,
    default: 1
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for user and language
progressSchema.index({ userId: 1, language: 1 }, { unique: true });

export default mongoose.model<IProgress>('Progress', progressSchema);