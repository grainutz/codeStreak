
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, TrendingUp, Clock } from 'lucide-react';

interface StatsGridProps {
  streak: number;
  lessonsCompleted: number;
  totalXP: number;
  timeSpent: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  streak,
  lessonsCompleted,
  totalXP,
  timeSpent
}) => {
  const stats = [
    {
      icon: Zap,
      value: streak,
      label: 'Day Streak',
      gradient: 'from-orange-400 to-red-400'
    },
    {
      icon: Target,
      value: lessonsCompleted,
      label: 'Lessons Done',
      gradient: 'from-blue-400 to-purple-400'
    },
    {
      icon: TrendingUp,
      value: totalXP,
      label: 'Total XP',
      gradient: 'from-green-400 to-blue-400'
    },
    {
      icon: Clock,
      value: timeSpent,
      label: 'Time Spent',
      gradient: 'from-purple-400 to-pink-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;