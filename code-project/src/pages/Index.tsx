import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Trophy, Calendar, Zap, ChevronRight, Star, Clock, Target } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import DailyLesson from '@/components/DailyLesson';
import ProgressDashboard from '@/components/ProgressDashboard';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    localStorage.getItem('selectedLanguage')
  );
  const [currentView, setCurrentView] = useState<'home' | 'lesson' | 'progress'>('home');
  const [dailyStreak, setDailyStreak] = useState(
    parseInt(localStorage.getItem('dailyStreak') || '0')
  );
  const [hasCompletedToday, setHasCompletedToday] = useState(false);

  useEffect(() => {
    const lastCompletedDate = localStorage.getItem('lastCompletedDate');
    const today = new Date().toDateString();
    setHasCompletedToday(lastCompletedDate === today);
  }, []);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const handleLessonComplete = () => {
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem('lastCompletedDate');
    
    if (lastCompleted !== today) {
      const newStreak = dailyStreak + 1;
      setDailyStreak(newStreak);
      localStorage.setItem('dailyStreak', newStreak.toString());
      localStorage.setItem('lastCompletedDate', today);
      setHasCompletedToday(true);
    }
    
    setCurrentView('home');
  };

  if (!selectedLanguage) {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  if (currentView === 'lesson') {
    return (
      <DailyLesson 
        language={selectedLanguage} 
        onComplete={handleLessonComplete}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'progress') {
    return (
      <ProgressDashboard 
        language={selectedLanguage}
        streak={dailyStreak}
        onBack={() => setCurrentView('home')}
      />
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
                <p className="text-sm text-gray-600 capitalize">{selectedLanguage}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                <Zap className="w-3 h-3 mr-1" />
                {dailyStreak}
              </Badge>
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
                : `Master ${selectedLanguage} with today's interactive coding lesson.`
              }
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

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
                  <span className="text-sm text-gray-500">5/7 days</span>
                </div>
                <Progress value={71} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{dailyStreak}</p>
                  <p className="text-xs text-gray-600">Day Streak</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-600">Lessons</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">850</p>
                  <p className="text-xs text-gray-600">XP</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Practice</h4>
              <p className="text-xs text-gray-600">Review concepts</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Schedule</h4>
              <p className="text-xs text-gray-600">Set reminders</p>
            </CardContent>
          </Card>
        </div>

        {/* Language Switcher */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-between text-left"
              onClick={() => {
                localStorage.removeItem('selectedLanguage');
                setSelectedLanguage(null);
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