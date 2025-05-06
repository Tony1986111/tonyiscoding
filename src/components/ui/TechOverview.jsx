import React from 'react';
import { Cpu } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const TechOverview = ({ skills }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'TechOverview');

  return (
    <div className={`col-span-4 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center mb-3">
        <Cpu className="h-5 w-5 text-blue-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>Tech Overview</h2>
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className={`${styles.item} rounded-lg p-2`}>
            <div className="flex justify-between">
              <span className={styles.text}>{skill.name}</span>
              <span className="text-blue-400">{skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechOverview;
