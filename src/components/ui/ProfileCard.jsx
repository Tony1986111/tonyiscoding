import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const ProfileCard = ({ name, title, description }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode);

  return (
    <div className={`col-span-4 ${styles.container} rounded-3xl p-6 flex flex-col justify-center`}>
      <h1 className={`text-4xl font-bold ${styles.title}`}>{name}</h1>
      <h2 className="text-2xl font-bold text-purple-400 mt-1">{title}</h2>
      <p className={`${styles.subtext} mt-3`}>{description}</p>
    </div>
  );
};

export default ProfileCard;
