import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, Zap, Trophy } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface AchievementsListProps {
  streak: number;
}

const AchievementsList: React.FC<AchievementsListProps> = ({ streak }) => {
  const achievements: Achievement[] = [
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', unlocked: true, icon: Star },
    { id: 2, title: 'Streak Master', description: 'Maintain a 7-day streak', unlocked: streak >= 7, icon: Zap },
    { id: 3, title: 'Code Warrior', description: 'Complete 50 lessons', unlocked: false, icon: Trophy },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <achievement.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${achievement.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                  {achievement.description}
                </p>
              </div>
              {achievement.unlocked && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsList;