import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Home, FolderOpen, FileText, CheckSquare, Mail, Moon, Sun } from 'lucide-react';

const Navigation = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`col-span-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-4 mb-4 transition-colors duration-300`}>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link href="/" className={`px-2 py-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition flex items-center`}>
            <Home className="h-4 w-4 mr-1 text-blue-400" />
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Home</span>
          </Link>
          <Link href="/projects" className={`px-2 py-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition flex items-center`}>
            <FolderOpen className="h-4 w-4 mr-1 text-green-400" />
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Projects</span>
          </Link>
          <Link href="/blog" className={`px-2 py-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition flex items-center`}>
            <FileText className="h-4 w-4 mr-1 text-purple-400" />
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Blog</span>
          </Link>
          <Link href="/todoapp" className={`px-2 py-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition flex items-center`}>
            <CheckSquare className="h-4 w-4 mr-1 text-yellow-400" />
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Todo</span>
          </Link>
          <Link href="/contact" className={`px-2 py-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition flex items-center`}>
            <Mail className="h-4 w-4 mr-1 text-pink-400" />
            <span className={`${darkMode ? 'text-white' : 'text-gray-800'} text-sm`}>Contact</span>
          </Link>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition`}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-blue-400" />}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
