import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const FooterInfo = ({ personalInfo }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'FooterInfo');

  return (
    <div className={`col-span-12 ${styles.container} rounded-3xl p-6 mt-4`}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className={`font-bold text-xl ${styles.title}`}>{personalInfo.name.toUpperCase()}.TECH</span>
          <p className={`mt-2 ${styles.subtext}`}>From coding novice to full-stack developer.</p>
        </div>

        <div className="flex space-x-4">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
            <Github size={20} className={styles.title} />
          </a>
          <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
            <Twitter size={20} className={styles.title} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
            <Linkedin size={20} className={styles.title} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
            <Mail size={20} className={styles.title} />
          </a>
        </div>
      </div>

      <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
        <p className={styles.subtext}>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterInfo;
