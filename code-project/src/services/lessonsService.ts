
import type { LessonData, Lesson } from '@/types';

export const loadLessonsData = async (): Promise<LessonData> => {
  try {
    const response = await fetch('/lessons/lessons.json');
    if (!response.ok) {
      throw new Error('Failed to load lessons data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading lessons:', error);
    return getFallbackLessonsData();
  }
};

export const getLessonByLanguage = async (language: string): Promise<Lesson | null> => {
  const lessonsData = await loadLessonsData();
  const lesson = lessonsData.lessons.find(l => l.language.toLowerCase() === language.toLowerCase());
  return lesson || null;
};

const getFallbackLessonsData = (): LessonData => ({
  lessons: [
    {
      id: "js-variables",
      title: "Variables & Data Types",
      description: "Learn how to store and work with different types of data in JavaScript",
      difficulty: "Beginner",
      language: "javascript",
      challenge: {
        question: "Create a variable called 'greeting' that stores the text 'Hello, World!' and then log it to the console.",
        starterCode: "// Create your variable here\n\n// Log the greeting to console",
        solution: "const greeting = 'Hello, World!';\nconsole.log(greeting);",
        hint: "Use 'const' to declare a variable, and console.log() to display it."
      }
    },
    {
      id: "py-lists",
      title: "Lists & Loops",
      description: "Master Python lists and learn how to iterate through data",
      difficulty: "Beginner",
      language: "python",
      challenge: {
        question: "Create a list of numbers [1, 2, 3, 4, 5] and print each number multiplied by 2.",
        starterCode: "# Create your list here\nnumbers = \n\n# Write a loop to print each number * 2",
        solution: "numbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    print(num * 2)",
        hint: "Use a for loop to iterate through the list and print each value."
      }
    }
  ]
});