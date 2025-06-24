
export interface LessonChallenge {
  question: string;
  starterCode: string;
  solution: string;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  challenge: LessonChallenge;
}

export interface LessonData {
  lessons: Lesson[];
}

export const loadLessonsData = async (): Promise<LessonData> => {
  try {
    const response = await fetch('/lessons/lessons.json');
const text = await response.text(); // debug
console.log("Raw lessons.json text:", text);

if (!response.ok || !text) {
  throw new Error('Failed to load lessons data');
}
return JSON.parse(text);
  } catch (error) {
    console.error('Error loading lessons:', error);
    // Return fallback data if JSON file is not available
    return getFallbackLessonsData();
  }
};

export const getLessonByLanguage = async (language: string): Promise<Lesson | null> => {
  const lessonsData = await loadLessonsData();
  const lesson = lessonsData.lessons.find(l => l.language.toLowerCase() === language.toLowerCase());
  return lesson || null;
};

// Fallback data in case JSON file is not available
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
    },
    {
      id: "java-classes",
      title: "Classes & Objects",
      description: "Introduction to object-oriented programming in Java",
      difficulty: "Intermediate",
      language: "java",
      challenge: {
        question: "Create a simple Car class with a 'brand' property and a 'start()' method that prints 'Engine started!'",
        starterCode: "// Create your Car class here\npublic class Car {\n    \n}",
        solution: "public class Car {\n    String brand;\n    \n    public void start() {\n        System.out.println(\"Engine started!\");\n    }\n}",
        hint: "Remember to use 'public' for the method and 'String' for the brand property."
      }
    },
    {
      id: "cpp-pointers",
      title: "Pointers & Memory",
      description: "Understanding memory management and pointers in C++",
      difficulty: "Advanced",
      language: "cpp",
      challenge: {
        question: "Create a pointer to an integer, assign it the value 42, and print both the value and the memory address.",
        starterCode: "// Create a pointer and assign value\n\n// Print value and address",
        solution: "int value = 42;\nint* ptr = &value;\nstd::cout << \"Value: \" << *ptr << std::endl;\nstd::cout << \"Address: \" << ptr << std::endl;",
        hint: "Use & to get the address and * to dereference the pointer."
      }
    },
    {
      id: "react-hooks",
      title: "useState Hook",
      description: "Learn to manage component state with React hooks",
      difficulty: "Intermediate",
      language: "react",
      challenge: {
        question: "Create a counter component that increments when a button is clicked.",
        starterCode: "import React from 'react';\n\nfunction Counter() {\n  // Add state here\n  \n  return (\n    <div>\n      {/* Add your JSX here */}\n    </div>\n  );\n}",
        solution: "import React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}",
        hint: "Import useState from React and use it to manage the counter state."
      }
    },
    {
      id: "swift-optionals",
      title: "Optionals & Safety",
      description: "Understanding optional values and nil safety in Swift",
      difficulty: "Intermediate",
      language: "swift",
      challenge: {
        question: "Create an optional string variable and safely unwrap it using if-let.",
        starterCode: "// Create an optional string\n\n// Safely unwrap and print",
        solution: "let optionalName: String? = \"Swift\"\n\nif let name = optionalName {\n    print(\"Hello, \\(name)!\")\n} else {\n    print(\"No name provided\")\n}",
        hint: "Use String? for optional and if-let for safe unwrapping."
      }
    }
  ]
});