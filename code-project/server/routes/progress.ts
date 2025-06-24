import express, { Response } from 'express';
import Progress from '../models/Progress';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

// Get user progress
router.get('/', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { language = 'JavaScript' } = req.query;
  
  let progress = await Progress.findOne({ 
    userId: req.user!._id, 
    language: language as string 
  });

  if (!progress) {
    // Create new progress record if doesn't exist
    progress = new Progress({
      userId: req.user!._id,
      language: language as string,
      weeklyProgress: []
    });
    await progress.save();
  }

  res.json({ progress });
}));

// Update daily progress
router.post('/daily', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { 
    language = 'JavaScript', 
    lessonsCompleted, 
    timeSpent, 
    xpEarned 
  } = req.body;

  let progress = await Progress.findOne({ 
    userId: req.user!._id, 
    language 
  });

  if (!progress) {
    progress = new Progress({
      userId: req.user!._id,
      language,
      weeklyProgress: []
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find or create today's progress
  let todayProgress = progress.weeklyProgress.find(
    day => day.date.getTime() === today.getTime()
  );

  if (!todayProgress) {
    todayProgress = {
      date: today,
      completed: false,
      lessonsCompleted: 0,
      timeSpent: 0,
      xpEarned: 0
    };
    progress.weeklyProgress.push(todayProgress);
  }

  // Update today's progress
  todayProgress.lessonsCompleted += lessonsCompleted || 0;
  todayProgress.timeSpent += timeSpent || 0;
  todayProgress.xpEarned += xpEarned || 0;
  todayProgress.completed = true;

  // Update totals
  progress.totalLessonsCompleted += lessonsCompleted || 0;
  progress.totalTimeSpent += timeSpent || 0;
  progress.totalXP += xpEarned || 0;

  // Update streak
  progress.currentStreak = calculateStreak(progress.weeklyProgress);
  if (progress.currentStreak > progress.longestStreak) {
    progress.longestStreak = progress.currentStreak;
  }

  // Update level (every 100 XP = 1 level)
  progress.currentLevel = Math.floor(progress.totalXP / 100) + 1;

  // Check for new achievements
  checkAndAddAchievements(progress);

  // Keep only last 30 days of progress
  progress.weeklyProgress = progress.weeklyProgress
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 30);

  progress.lastUpdated = new Date();
  await progress.save();

  res.json({ 
    message: 'Progress updated successfully', 
    progress 
  });
}));

router.get('/weekly', authenticateToken, asyncHandler(async (req: AuthRequest, res: Response) => {
  const { language = 'JavaScript' } = req.query;

  const progress = await Progress.findOne({
    userId: req.user!._id,
    language: language as string,
  });

  if (!progress) {
    res.json({
      completedDays: [false, false, false, false, false, false, false],
      completedCount: 0,
      totalDays: 7,
      progressValue: 0,
    });
    return;
  }

  const weeklyData = getWeeklyOverview(progress.weeklyProgress);
  res.json(weeklyData);
}));

// Helper functions
function calculateStreak(weeklyProgress: any[]): number {
  const sortedProgress = weeklyProgress
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < sortedProgress.length; i++) {
    const progressDate = new Date(sortedProgress[i].date);
    progressDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today.getTime() - progressDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === i && sortedProgress[i].completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

function checkAndAddAchievements(progress: any): void {
  const achievements = [
    {
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      condition: () => progress.totalLessonsCompleted >= 1,
      type: 'lessons'
    },
    {
      id: 'streak_3',
      title: '3-Day Streak',
      description: 'Practice for 3 days in a row',
      condition: () => progress.currentStreak >= 3,
      type: 'streak'
    },
    {
      id: 'streak_7',
      title: 'Week Warrior',
      description: 'Practice for 7 days in a row',
      condition: () => progress.currentStreak >= 7,
      type: 'streak'
    },
    {
      id: 'xp_100',
      title: 'Century Club',
      description: 'Earn 100 XP',
      condition: () => progress.totalXP >= 100,
      type: 'xp'
    },
    {
      id: 'lessons_10',
      title: 'Dedicated Learner',
      description: 'Complete 10 lessons',
      condition: () => progress.totalLessonsCompleted >= 10,
      type: 'lessons'
    }
  ];

  achievements.forEach(achievement => {
    const hasAchievement = progress.achievements.some((a: any) => a.id === achievement.id);
    
    if (!hasAchievement && achievement.condition()) {
      progress.achievements.push({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        unlockedAt: new Date(),
        type: achievement.type
      });
    }
  });
}

function getWeeklyOverview(weeklyProgress: any[]) {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday
  weekStart.setHours(0, 0, 0, 0);

  const completedDays = [];
  let completedCount = 0;

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);
    
    const dayProgress = weeklyProgress.find(
      p => new Date(p.date).toDateString() === currentDay.toDateString()
    );
    
    const completed = dayProgress ? dayProgress.completed : false;
    completedDays.push(completed);
    
    if (completed) completedCount++;
  }

  return {
    completedDays,
    completedCount,
    totalDays: 7,
    progressValue: Math.round((completedCount / 7) * 100)
  };
}

export default router;