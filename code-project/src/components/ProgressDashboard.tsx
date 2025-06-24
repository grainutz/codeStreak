import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, Target, Brain, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProgress } from '@/services/api';
import { useUser } from '@/contexts/UserContext';

const ProgressDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useUser();
  const [progressData, setProgressData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, [language]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (language) {
        const data = await getProgress(language);
        setProgressData(data.progress || data);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
      setError('Failed to load progress data');
      // Set default empty progress data
      setProgressData({
        currentStreak: 0,
        longestStreak: 0,
        totalLessonsCompleted: 0,
        totalXP: 0,
        currentLevel: 1,
        achievements: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <p>Loading progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadProgress}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Safely access progressData properties with fallbacks
  const safeProgressData = {
    currentStreak: progressData?.currentStreak || 0,
    longestStreak: progressData?.longestStreak || 0,
    totalLessonsCompleted: progressData?.totalLessonsCompleted || 0,
    totalXP: progressData?.totalXP || 0,
    currentLevel: progressData?.currentLevel || 1,
    achievements: Array.isArray(progressData?.achievements) ? progressData.achievements : []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/select-language')} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Progress</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{safeProgressData.currentStreak}</p>
              <p className="text-sm text-gray-600">Current Streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{safeProgressData.longestStreak}</p>
              <p className="text-sm text-gray-600">Longest Streak</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Brain className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{safeProgressData.totalLessonsCompleted}</p>
              <p className="text-sm text-gray-600">Lessons</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">{safeProgressData.totalXP}</p>
              <p className="text-sm text-gray-600">Total XP</p>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Level {safeProgressData.currentLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next level</span>
                <span>{safeProgressData.totalXP % 100}%</span>
              </div>
              <Progress value={safeProgressData.totalXP % 100} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            {safeProgressData.achievements.length > 0 ? (
              <div className="space-y-2">
                {safeProgressData.achievements.map((achievement: any, index: number) => (
                  <div key={achievement.id || index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title || 'Achievement'}</p>
                      <p className="text-xs text-gray-600">{achievement.description || 'No description'}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.type || 'misc'}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">No achievements yet. Keep coding!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressDashboard;
