import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const LearningJourney = ({ journey }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'LearningJourney');

  return (
    <div className={`col-span-12 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center mb-4">
        <BookOpen className="h-5 w-5 text-indigo-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>My Learning Journey</h2>
      </div>

      <div className={`relative border-l-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} pl-6 ml-4 space-y-8`}>
        {journey.map((item, index) => (
          <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className={`absolute -left-4 w-7 h-7 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center shadow-md -top-2`}>
              <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
            </div>
            <div className={`text-sm font-medium ${styles.subtext} pl-8 -mt-3`}>{item.period}</div>
            <h3 className={`text-lg font-bold ${styles.title} mt-1 mb-2`}>{item.title}</h3>
            <p className={styles.text}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningJourney;
