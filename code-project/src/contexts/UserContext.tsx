import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  language: string | null;
  setLanguage: (lang: string | null) => void;
  isHydrated: boolean;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  language: null,
  setLanguage: () => {},
  isHydrated: false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedLanguage = localStorage.getItem('language');

    if (storedUserId) setUserId(storedUserId);
    if (storedLanguage) setLanguage(storedLanguage);

    setIsHydrated(true); // ✅ Indicate hydration is done
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, language, setLanguage, isHydrated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
