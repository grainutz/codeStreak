import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import WeeklyOverview from './WeeklyOverview';
import StatsGrid from './StatsGrid';
import AchievementsList from './AchievementsList';
import UpcomingLessons from './UpcomingLessons';


interface ProgressDashboardProps {
  language: string;
  streak: number;
  onBack: () => void;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ language, streak, onBack }) => {
  const completedDays = [true, true, false, true, true, false, false]; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Your Progress</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <WeeklyOverview
          completedDays={completedDays}
          completedCount={5}
          totalDays={7}
          progressValue={71}
        />

        <StatsGrid
          streak={streak}
          lessonsCompleted={12}
          totalXP={850}
          timeSpent="45m"
        />

        <AchievementsList streak={streak} />

        <UpcomingLessons />
      </div>
    </div>
  );
};

export default ProgressDashboard;

