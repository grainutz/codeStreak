import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain, Code, Trophy, Calendar,
  Zap, ChevronRight, Star, Clock, Target
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import DailyLesson from '@/components/DailyLesson';
import ProgressDashboard from '@/components/ProgressDashboard';
import { useUser } from '@/contexts/UserContext';
import { updateProgress, getProgress } from '@/services/api';

const Index = () => {
  const { userId, language, setLanguage } = useUser();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'home' | 'lesson' | 'progress'>('home');
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  localStorage.removeItem('token'); 


  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    if (!token || !storedUserId) {
      navigate('/authform');
      return;
    }

    // // If userId from context is not set, redirect to login
    // if (!userId) {
    //   navigate('/authform');
    //   return;
    // }

    //checkDailyProgress();
  }, [userId, navigate]);

  // Load user progress and check if today's lesson is completed
  const checkDailyProgress = async () => {
    try {
      setIsLoading(true);
      
      // Check local storage for today's completion
      const lastCompletedDate = localStorage.getItem('lastCompletedDate');
      const today = new Date().toDateString();
      const completedToday = lastCompletedDate === today;
      
      setHasCompletedToday(completedToday);

      // Fetch progress from API to get current streak
      if (language) {
        const progressData = await getProgress(language);
        setCurrentStreak(progressData.currentStreak || 0);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleLessonComplete = async () => {
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem('lastCompletedDate');
    const token = localStorage.getItem('token');

    if (token && lastCompleted !== today) {
      try {
        // Update progress on server
        await updateProgress(token, { 
          completedToday: true,
          language: language 
        });
        
        // Update local storage
        localStorage.setItem('lastCompletedDate', today);
        setHasCompletedToday(true);
        
        // Refresh progress data
        await checkDailyProgress();
      } catch (error) {
        console.error('Failed to update progress:', error);
      }
    }

    setCurrentView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('language');
    localStorage.removeItem('lastCompletedDate');
    navigate('/authform');
  };

  // // Show loading spinner while checking authentication
  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
  //           <Code className="w-6 h-6 text-white animate-pulse" />
  //         </div>
  //         <p className="text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!language) {
    return <LanguageSelector />;
  }

  if (currentView === 'lesson') {
    return (
      <DailyLesson
        language={language}
        onComplete={handleLessonComplete}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'progress') {
    return (
      <ProgressDashboard />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">codeStreak</h1>
                <p className="text-sm text-gray-600 capitalize">{language}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                <Zap className="w-3 h-3 mr-1" />
                {currentStreak} day streak
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Daily Challenge Card */}
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Daily Challenge</span>
              </div>
              <Clock className="w-5 h-5 opacity-75" />
            </div>

            <h2 className="text-xl font-bold mb-2">
              {hasCompletedToday ? 'Challenge Complete!' : 'Ready to Code?'}
            </h2>

            <p className="text-purple-100 mb-4">
              {hasCompletedToday
                ? 'Great job! Come back tomorrow for your next challenge.'
                : `Master ${language} with today's interactive coding lesson.`}
            </p>

            <Button
              onClick={() => setCurrentView('lesson')}
              disabled={hasCompletedToday}
              className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hasCompletedToday ? 'Completed Today' : 'Start Today\'s Lesson'}
              {!hasCompletedToday && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('progress')}
                className="text-purple-600 hover:text-purple-700"
              >
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-semibold text-purple-600">{currentStreak} days</span>
              </div>
              <p className="text-sm text-gray-600">Keep it up! Complete today's lesson to extend your streak.</p>
            </div>
          </CardContent>
        </Card>

        {/* Language Switcher */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-left"
              onClick={() => {
                localStorage.removeItem('language');
                setLanguage('');
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">Switch Language</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;