'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
       className="fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-blue-600 hover:shadow-xl active:scale-95 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-300 dark:hover:bg-gray-950 dark:hover:text-yellow-400 dark:shadow-black/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label="Toggle theme"
    >
      <div className="relative h-6 w-6">
        {/* Sun Icon */}
        <Sun className={`absolute inset-0 h-6 w-6 transform transition-all duration-500 ${
          theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`} />
        
        {/* Moon Icon */}
        <Moon className={`absolute inset-0 h-6 w-6 transform transition-all duration-500 ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`} />
      </div>
    </button>
  );
}
