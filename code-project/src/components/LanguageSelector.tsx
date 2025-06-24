import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { login } from '@/services/api';

interface Language {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  popularity: number;
  color: string;
  bgGradient: string;
  learners: string;
}

const languages: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Web development & modern apps',
    difficulty: 'Beginner',
    popularity: 95,
    color: 'text-yellow-700',
    bgGradient: 'from-yellow-400 to-orange-400',
    learners: '12M+'
  },
  {
    id: 'python',
    name: 'Python',
    description: 'AI, data science & automation',
    difficulty: 'Beginner',
    popularity: 90,
    color: 'text-green-700',
    bgGradient: 'from-green-400 to-blue-400',
    learners: '15M+'
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Enterprise & Android apps',
    difficulty: 'Intermediate',
    popularity: 80,
    color: 'text-red-700',
    bgGradient: 'from-red-400 to-pink-400',
    learners: '9M+'
  },
  {
    id: 'cpp',
    name: 'C++',
    description: 'System programming & games',
    difficulty: 'Advanced',
    popularity: 70,
    color: 'text-blue-700',
    bgGradient: 'from-blue-400 to-purple-400',
    learners: '6M+'
  },
  {
    id: 'react',
    name: 'React',
    description: 'Modern web interfaces',
    difficulty: 'Intermediate',
    popularity: 85,
    color: 'text-cyan-700',
    bgGradient: 'from-cyan-400 to-blue-400',
    learners: '8M+'
  },
  {
    id: 'swift',
    name: 'Swift',
    description: 'iOS app development',
    difficulty: 'Intermediate',
    popularity: 65,
    color: 'text-orange-700',
    bgGradient: 'from-orange-400 to-red-400',
    learners: '3M+'
  }
];

const LanguageSelector: React.FC = () => {

  const navigate = useNavigate();
  const { setUserId, setLanguage } = useUser();

  const handleSelect = (lang: string) => {
  setLanguage(lang);
  localStorage.setItem('language', lang);
  navigate('/'); // Go to main dashboard (Index)
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to codeStreak</h1>
            <p className="text-gray-600">Choose your programming language to start your daily coding journey</p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* pop languages header */}
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Popular Languages</h2>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>

        {/* language cards */}
        <div className="space-y-4">
          {languages.map((language) => (
            <Card 
              key={language.id}
              className="border-0 shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl"
              onClick={() => handleSelect(language.id)}
            >
              <CardContent className="p-0">
                <div className="flex">
                  {/* Language Icon */}
                  <div className={`w-20 bg-gradient-to-br ${language.bgGradient} flex items-center justify-center`}>
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Language Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{language.name}</h3>
                        <p className="text-sm text-gray-600">{language.description}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${language.color} bg-opacity-10 border-0`}
                      >
                        {language.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{language.learners}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">{language.popularity}% popular</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Start Your Coding Journey</h3>
            <p className="text-sm text-gray-600">
              • One lesson per day, perfectly sized for busy schedules
              <br />
              • Interactive coding challenges with instant feedback
              <br />
              • Build streaks and earn achievements as you progress
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default LanguageSelector;
