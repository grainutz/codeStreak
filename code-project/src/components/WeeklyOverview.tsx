import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from 'lucide-react';

interface WeeklyOverviewProps {
  completedDays: boolean[];
  completedCount: number;
  totalDays: number;
  progressValue: number;
}

const WeeklyOverview: React.FC<WeeklyOverviewProps> = ({
  completedDays,
  completedCount,
  totalDays,
  progressValue
}) => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">This Week</h2>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {completedCount}/{totalDays} days
          </Badge>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div key={day} className="text-center">
              <p className="text-xs text-gray-500 mb-2">{day}</p>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                completedDays[index] 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {completedDays[index] ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Progress value={progressValue} className="h-2" />
        <p className="text-sm text-gray-600 mt-2">2 more days to complete your weekly goal!</p>
      </CardContent>
    </Card>
  );
};

export default WeeklyOverview;