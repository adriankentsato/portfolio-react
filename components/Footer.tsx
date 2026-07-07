import React from 'react';
import SocialLinks from './SocialLinks';
import personalInfo from '@/data/personal-info.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          © {currentYear} {personalInfo.name}. All rights reserved.
        </div>
        
        <SocialLinks
          links={personalInfo.socialLinks}
          className="flex items-center space-x-2"
          iconSize="w-4 h-4"
          containerSize="w-8 h-8"
        />
      </div>
    </footer>
  );
}
