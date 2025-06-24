
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Brain, Trophy } from 'lucide-react';
import { getLessonByLanguage } from '@/services/lessonsService';
import type { Lesson } from '@/types';

interface DailyLessonProps {
  language: string;
  onComplete: () => void;
  onBack: () => void;
}

const DailyLesson: React.FC<DailyLessonProps> = ({ language, onComplete, onBack }) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [language]);

  const loadLesson = async () => {
    try {
      const lessonData = await getLessonByLanguage(language);
      if (lessonData) {
        setLesson(lessonData);
        setUserCode(lessonData.challenge.starterCode);
      }
    } catch (error) {
      console.error('Failed to load lesson:', error);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Badge variant="secondary">{lesson.difficulty}</Badge>
        </div>

        {/* Lesson Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              {lesson.title}
            </CardTitle>
            <p className="text-gray-600">{lesson.description}</p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Challenge:</h4>
              <p>{lesson.challenge.question}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Code:</label>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
                placeholder="Write your code here..."
              />
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                size="sm"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSolution(!showSolution)}
                size="sm"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </Button>
            </div>

            {showHint && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
                <p className="text-sm"><strong>Hint:</strong> {lesson.challenge.hint}</p>
              </div>
            )}

            {showSolution && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                  <code>{lesson.challenge.solution}</code>
                </pre>
              </div>
            )}

            <Button 
              onClick={handleComplete} 
              className="w-full"
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Completed!
                </>
              ) : (
                'Mark as Complete'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyLesson;