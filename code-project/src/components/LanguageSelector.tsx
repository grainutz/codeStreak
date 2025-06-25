
import React from 'react';
import { useUser } from '@/contexts/UserContext';
//import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code } from 'lucide-react';

const languages = [
  { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
  { id: 'python', name: 'Python', color: 'bg-blue-500' },
  { id: 'java', name: 'Java', color: 'bg-red-500' },
  { id: 'cpp', name: 'C++', color: 'bg-purple-500' },
  { id: 'react', name: 'React', color: 'bg-cyan-500' },
  { id: 'swift', name: 'Swift', color: 'bg-orange-500' },
];

const LanguageSelector: React.FC = () => {
  const { setLanguage } = useUser();

  const handleLanguageSelect = (language: string) => {
    setLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Language</h1>
          <p className="text-gray-600">Select a programming language to start your coding journey</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <Card key={lang.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => handleLanguageSelect(lang.id)}>
                <div className="text-center">
                  <div className={`w-12 h-12 ${lang.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;