import React, { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';
import { initJourneyAnimation, initJourneyHoverEffects } from '@/utils/journeyAnimations';

const LearningJourney = ({ journey }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'LearningJourney');
  const containerRef = useRef(null);

  // Initialize scroll animations when component mounts
  useEffect(() => {
    // Initialize journey animations with scroll trigger
    initJourneyAnimation({
      containerSelector: '.learning-journey-container',
      itemSelector: '.journey-item',
      dotSelector: '.journey-dot',
      lineSelector: '.journey-line'
    });

    // Initialize hover effects
    initJourneyHoverEffects({
      containerSelector: '.learning-journey-container',
      itemSelector: '.journey-item',
      dotSelector: '.journey-dot'
    });
  }, []);

  return (
    <div ref={containerRef} className={`col-span-12 ${styles.container} rounded-3xl p-6 learning-journey-container`}>
      <div className="flex items-center mb-8">
        <BookOpen className="h-5 w-5 text-indigo-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>My Learning Journey</h2>
      </div>

      <div className={`relative pl-6 ml-4 space-y-8`}>
        {/* Timeline line - will be animated to grow */}
        <div className={`journey-line absolute left-0 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        {journey.map((item, index) => (
          <div key={index} className="journey-item relative">
            {/* Timeline dot - will be animated to appear */}
            <div className={`journey-dot absolute -left-4 w-7 h-7 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center shadow-md -top-2`}>
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
