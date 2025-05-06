import React from 'react';
import { User, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const AboutMe = ({ about, strengths }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'AboutMe');

  return (
    <div className={`col-span-4 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center mb-3">
        <User className="h-5 w-5 text-purple-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>About Me</h2>
      </div>
      <p className={`${styles.text} text-sm`}>
        {about}
      </p>
      <div className="mt-3 space-y-2">
        {strengths.map((strength, index) => (
          <div key={index} className="flex items-center">
            <Zap className="h-4 w-4 text-yellow-400 mr-2" />
            <span className={`${styles.text} text-sm`}>{strength}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
