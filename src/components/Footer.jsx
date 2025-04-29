'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getPersonalInfo } from '@/data/personal';

export default function Footer() {
  const { darkMode } = useTheme();
  const personalInfo = getPersonalInfo();

  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'} py-12`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-xl">{personalInfo.name.toUpperCase()}.TECH</span>
            <p className="mt-2">From coding novice to full-stack developer.</p>
          </div>

          <div className="flex space-x-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-700 transition">
              <Github size={20} />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-700 transition">
              <Twitter size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-700 transition">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="p-2 rounded-full hover:bg-gray-700 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
