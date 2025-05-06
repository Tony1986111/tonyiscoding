import React from 'react';
import { Layers } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const ClientProjects = ({ completed, satisfaction }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'ClientProjects');

  return (
    <div className={`col-span-4 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center mb-3">
        <Layers className="h-5 w-5 text-green-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>Projects</h2>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-green-400">{completed}</h3>
          <p className={`${styles.subtext} text-sm`}>Completed</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-green-400">{satisfaction}</h3>
          <p className={`${styles.subtext} text-sm`}>Satisfaction</p>
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;
