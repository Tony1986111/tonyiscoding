'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Code, Cpu, Globe, Zap, Layers, Server, User, FileText, Github, Mail, PenTool, ArrowRight, Calendar } from 'lucide-react';

const DarkTechLayout = ({ children, personalInfo, skills, projects, posts }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen p-4 font-sans transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
        {children}
      </div>
    </div>
  );
};

export default DarkTechLayout;
