import React from 'react';
import { Plus } from 'lucide-react';
import ActivityCard from './ActivityCard';

/**
 * Day column component
 * Displays a single day with its activities and date
 */
const DayColumn = ({ 
  day, 
  dayIndex, 
  date, 
  activities, 
  colorScheme, 
  onAddActivity, 
  onEditActivity, 
  onDeleteActivity 
}) => {
  // Format date as Month DD
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Sort activities by time
  const sortedActivities = [...activities].sort((a, b) => {
    const timeA = a.time.replace(':', '');
    const timeB = b.time.replace(':', '');
    return timeA - timeB;
  });
  
  return (
    <div className={`rounded-lg p-4 ${colorScheme} min-h-[300px]`}>
      {/* Day name and date */}
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold">{day.name}</h2>
        <div className="text-sm text-gray-600">{formatDate(date)}</div>
      </div>
      
      {/* Activities */}
      <div className="space-y-3">
        {sortedActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            date={date}
            onEdit={() => onEditActivity(dayIndex, activity)}
            onDelete={() => onDeleteActivity(dayIndex, activity.id)}
          />
        ))}
        
        {/* Add activity button */}
        <button 
          onClick={() => onAddActivity(dayIndex)}
          className="w-full py-2 bg-white bg-opacity-70 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 text-gray-500 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Activity
        </button>
      </div>
    </div>
  );
};

export default DayColumn;
