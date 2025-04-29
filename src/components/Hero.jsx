'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { getPersonalInfo } from '@/data/personal';

export default function Hero() {
  const { darkMode } = useTheme();
  const personalInfo = getPersonalInfo();

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-16 animate-fadeIn">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-center">
          <div className="md:w-2/3 md:pr-8">
            <div className={`inline-block px-3 py-1 rounded-md text-sm font-medium mb-4 ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
              {personalInfo.title}
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Hi, I'm {personalInfo.name.split(' ')[0]}.<br className="hidden sm:block" /> Learning to Code & Build
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 opacity-80">{personalInfo.bio}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/projects" className="btn btn-primary">My Projects</Link>
              <Link href="/blog" className="btn btn-secondary">My Blog</Link>
            </div>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
            <div className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center overflow-hidden shadow-lg`}>
              {/* You can place your profile picture here */}
              <span className="text-4xl sm:text-5xl md:text-6xl">👨‍💻</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
