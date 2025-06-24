import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import WeeklyOverview from './WeeklyOverview';
import StatsGrid from './StatsGrid';
import AchievementsList from './AchievementsList';
import UpcomingLessons from './UpcomingLessons';
import { useUser } from '@/contexts/UserContext';
import { getProgress } from '@/services/api';
import { useNavigate } from 'react-router-dom';


const ProgressDashboard: React.FC = () => {
  const { userId, language } = useUser(); // Get language from context
  const [progress, setProgress] = useState<any>(null);
  

  useEffect(() => {
  if (!userId) return;

  getProgress(userId).then((data) => {
    console.log("Fetched progress:", data); //  
    setProgress(data);
  }).catch((err) => {
    console.error("Failed to fetch progress:", err);
  });
}, [userId]);

  if (!progress) return <p className="text-center mt-12 text-gray-600">Loading progress...</p>;

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Your Progress in {language}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <WeeklyOverview
          completedDays={progress.completedDays}
          completedCount={progress.completedDays.filter(Boolean).length}
          totalDays={7}
          progressValue={Math.round((progress.completedDays.filter(Boolean).length / 7) * 100)}
        />

        <StatsGrid
          streak={progress.streak}
          lessonsCompleted={progress.lessonsCompleted}
          totalXP={progress.totalXP}
          timeSpent={progress.timeSpent}
        />

        <AchievementsList streak={progress.streak} />

        <UpcomingLessons />
      </div>
    </div>
  );
};

export default ProgressDashboard;
