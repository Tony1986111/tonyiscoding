import React from 'react';
import { Mail, Github } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const Contact = ({ email, github }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'Contact');

  return (
    <div className={`col-span-6 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center mb-4">
        <Mail className="h-5 w-5 text-pink-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>Contact</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4 flex items-center`}>
          <div className="h-10 w-10 bg-pink-400/20 rounded-full flex items-center justify-center mr-3">
            <Mail className="h-5 w-5 text-pink-400" />
          </div>
          <div>
            <h3 className={`${styles.title} font-medium`}>Email</h3>
            <p className={`${styles.subtext} text-sm`}>{email}</p>
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4 flex items-center`}>
          <div className="h-10 w-10 bg-gray-500/20 rounded-full flex items-center justify-center mr-3">
            <Github className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <h3 className={`${styles.title} font-medium`}>GitHub</h3>
            <p className={`${styles.subtext} text-sm`}>{github.replace('https://github.com/', '')}</p>
          </div>
        </div>
        <div className="col-span-2 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-xl p-4">
          <h3 className="text-white font-medium text-center">Need a project?</h3>
          <p className="text-white/80 text-sm text-center mt-1">I'm ready to collaborate with you to create outstanding digital products</p>
          <div className="mt-2 flex justify-center">
            <Link href="/contact" className={`${darkMode ? 'bg-white text-purple-900' : 'bg-purple-600 text-white'} px-4 py-2 rounded-lg text-sm font-medium inline-block`}>
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
