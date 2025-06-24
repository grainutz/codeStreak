
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from 'lucide-react';

interface UpcomingTopic {
  title: string;
  difficulty: string;
  eta: string;
}

const UpcomingLessons: React.FC = () => {
  const upcomingTopics: UpcomingTopic[] = [
    { title: 'Functions & Parameters', difficulty: 'Beginner', eta: 'Tomorrow' },
    { title: 'Conditional Logic', difficulty: 'Beginner', eta: 'Day 3' },
    { title: 'Loops & Iteration', difficulty: 'Intermediate', eta: 'Day 4' },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Coming Up</h2>
        <div className="space-y-3">
          {upcomingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-100">
              <div>
                <h3 className="font-medium text-gray-900">{topic.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                    {topic.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500">{topic.eta}</span>
                </div>
              </div>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingLessons;