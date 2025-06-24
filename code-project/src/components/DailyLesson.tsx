import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, CheckCircle, XCircle, Lightbulb, Trophy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { getLessonByLanguage } from '../services/lessonsService';
import type { Lesson } from '../services/lessonsService';

interface DailyLessonProps {
  language: string;
  onComplete: () => void;
  onBack: () => void;
}

const DailyLesson: React.FC<DailyLessonProps> = ({ language, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState<'learn' | 'challenge' | 'complete'>('learn');
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        const lessonData = await getLessonByLanguage(language);
        setLesson(lessonData);
        if (lessonData) {
          setUserCode(lessonData.challenge.starterCode);
        }
      } catch (error) {
        console.error('Error loading lesson:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [language]);

  const checkAnswer = () => {
    if (!lesson) return;
    
    // Simple check - in a real app, you'd want more sophisticated code validation
    const normalizedUser = userCode.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedSolution = lesson.challenge.solution.toLowerCase().replace(/\s+/g, ' ');
    
    const isMatch = normalizedUser.includes(normalizedSolution.split('\n')[0].toLowerCase()) ||
                   normalizedUser.length > 10; // Basic attempt check
    
    setIsCorrect(isMatch);
    
    if (isMatch) {
      setTimeout(() => setCurrentStep('complete'), 1500);
    }
  };

  const resetChallenge = () => {
    if (!lesson) return;
    setUserCode(lesson.challenge.starterCode);
    setIsCorrect(null);
    setShowHint(false);
  };

  if (loading || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Lesson Complete!</h2>
              <p className="text-green-100 mb-6">
                Great job! You've completed today's {language} lesson. 
                Your coding skills are growing stronger every day!
              </p>

              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">Today You Learned:</h3>
                <p className="text-sm text-green-100">{lesson.description}</p>
              </div>

              <Button 
                onClick={onComplete}
                className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3"
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="text-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex-1 mx-4">
              <Progress value={currentStep === 'learn' ? 25 : 75} className="h-2" />
            </div>
            
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {currentStep === 'learn' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{lesson.title}</h2>
                    <p className="text-sm text-gray-600">Today's Lesson</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{lesson.description}</p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What you'll learn:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Basic syntax and structure</li>
                    <li>• Practical coding examples</li>
                    <li>• Best practices and tips</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => setCurrentStep('challenge')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3"
                >
                  Start Coding Challenge
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 'challenge' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Coding Challenge</h2>
                    <p className="text-sm text-gray-600">Complete the task below</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-400">
                  <p className="text-gray-800 font-medium">{lesson.challenge.question}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Code:
                    </label>
                    <Textarea 
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your code here..."
                      className="font-mono text-sm min-h-[120px] border-2"
                    />
                  </div>

                  {isCorrect !== null && (
                    <div className={`p-4 rounded-lg flex items-center gap-3 ${
                      isCorrect 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        {isCorrect ? 'Correct! Well done!' : 'Not quite right. Try again!'}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={checkAnswer}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold"
                    >
                      Check Answer
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setShowHint(!showHint)}
                      className="px-4"
                    >
                      <Lightbulb className="w-4 h-4" />
                    </Button>
                  </div>

                  {showHint && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Hint:</span>
                      </div>
                      <p className="text-yellow-700 text-sm">{lesson.challenge.hint}</p>
                    </div>
                  )}

                  <Button 
                    variant="ghost" 
                    onClick={resetChallenge}
                    className="w-full text-gray-600"
                  >
                    Reset Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyLesson;