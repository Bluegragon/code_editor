import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [isOn, setIsOn] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);
  const storageKey = 'dark-mode-preference';

  // Get initial preference from localStorage or system
  useEffect(() => {
    const getInitialTheme = () => {
      const storedPref = localStorage.getItem(storageKey);
      if (storedPref) return storedPref === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const applyTheme = (isDark) => {
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    };

    const initialDark = getInitialTheme();
    setIsDarkMode(initialDark);
    applyTheme(initialDark);
  }, []);

  // Watch for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches;
      setIsDarkMode(newTheme);
      document.documentElement.classList.toggle('dark', newTheme);
      localStorage.setItem(storageKey, newTheme ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem(storageKey, newTheme ? 'dark' : 'light');
  };

  const toggle = () => setIsOn(!isOn);

  return (
    <div className="flex items-center space-x-4">
      <Sun size={18}/>

      <div 
        onClick={toggleTheme}
        className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isDarkMode ? 'bg-accentcolor' : 'bg-gray-400'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
            isDarkMode ? 'translate-x-4' : ''
          }`}
        />
      </div>
      {/* <span className="text-sm font-medium">{isOn ? 'ON' : 'OFF'}</span> */}
      <Moon size={18}/>

    </div>
  );
}

export default DarkModeToggle;
