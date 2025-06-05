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
  <div
    onClick={toggleTheme}
    className={`w-14 h-8 flex items-center rounded-full cursor-pointer p-1 transition-all duration-300 relative ${
      isDarkMode ? 'bg-blue-200' : 'bg-gray-300'
    }`}
  >
    {/* Icon container that slides */}
    <div
      className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-transform duration-300 ${
        isDarkMode ? 'translate-x-6' : ''
      }`}
    >
      {isDarkMode ? (
        <Moon size={14} className="text-gray-700" />
      ) : (
        <Sun size={14} className="text-yellow-500" />
      )}
    </div>
  </div>
</div>

  );
}

export default DarkModeToggle;
