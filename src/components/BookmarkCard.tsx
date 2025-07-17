'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  summary: string;
  url: string;
  favicon: string;
  onDelete: () => void;
}

const WORD_LIMIT = 100; // Define a constant for the word limit

export default function BookmarkCard({ title, summary, url, favicon, onDelete }: Props) {
  const [isDark, setIsDark] = useState(false);

  // Determine if the summary needs truncation and prepare the display text
  const needsTruncation = summary.split(/\s+/).length > WORD_LIMIT;
  const displaySummary = needsTruncation
    ? summary.split(/\s+/).slice(0, WORD_LIMIT).join(' ') + '...'
    : summary;

  // Effect to detect system preference for dark mode and apply/remove 'dark' class
  // This remains to respect system preference.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setDarkMode = (matches: boolean) => {
      setIsDark(matches);
      if (matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial mode
    setDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handler);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <motion.div
      className="group relative p-4 sm:p-6 rounded-xl shadow-xl transition-all duration-300 ease-in-out
                 bg-white/80 backdrop-blur-md border border-gray-200
                 dark:bg-gray-800/80 dark:border-gray-700
                 hover:shadow-2xl hover:border-blue-400 dark:hover:border-purple-500 overflow-hidden"
      whileHover={{ scale: 1.03 }} // Subtle lift on hover
      whileTap={{ scale: 0.98 }} // Gentle press on click
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4">
        {/* Favicon and Title/URL */}
        <div className="flex items-center gap-3 overflow-hidden flex-grow min-w-0 mb-3 sm:mb-0">
          <img src={favicon} width={24} height={24} alt="favicon" className="rounded-md flex-shrink-0" />
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-lg text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-full sm:max-w-[calc(100%-60px)]"
          >
            {title}
          </a>
        </div>

        {/* Action Buttons Container */}
        <div className="flex-shrink-0 flex gap-2 items-center self-end sm:self-auto">
          {/* Delete Button */}
          <motion.button
            onClick={onDelete}
            className="flex items-center justify-center w-8 h-8 rounded-full text-red-500 border border-red-300 bg-red-50 hover:bg-red-100
                       dark:bg-red-900/40 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900 transition-colors duration-200"
            aria-label="Delete bookmark"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 0 00-1 1v3M4 7h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-2 break-words">
        {displaySummary}
      </p>

      {/* Optional: URL at the bottom */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 truncate break-all"
      >
        {url}
      </a>
    </motion.div>
  );
}