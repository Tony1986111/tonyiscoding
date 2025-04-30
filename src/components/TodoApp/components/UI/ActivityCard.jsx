import React from 'react';
import { Clock, MapPin, Edit, Trash } from 'lucide-react';
import GoogleCalendarButton from '../Calendar/GoogleCalendarButton';

/**
 * Activity card component
 * Displays a single activity with its details
 */
const ActivityCard = ({ activity, date, onEdit, onDelete }) => {
  // Parent colors for background
  const parentColors = {
    "dad": "bg-blue-100",
    "mom": "bg-pink-100",
    "none": "bg-gray-100"
  };
  
  // Get icon component based on icon name
  const getIconComponent = (iconName) => {
    // This is a simplified version - in a real app, we would import all icons
    // For now, we'll just return a placeholder
    return (props) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    );
  };
  
  // Get background color based on parent
  const backgroundColor = parentColors[activity.parent] || parentColors.none;
  
  return (
    <div className={`rounded-lg p-3 shadow-sm relative group ${backgroundColor}`}>
      {/* Action buttons (visible on hover) */}
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
        <GoogleCalendarButton activity={activity} date={date} />
        
        <button 
          onClick={onEdit}
          className="p-1 bg-white rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
          title="Edit activity"
        >
          <Edit className="w-4 h-4" />
        </button>
        
        <button 
          onClick={onDelete}
          className="p-1 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
          title="Delete activity"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
      
      {/* Activity title and icon */}
      <div className="flex items-center mb-1">
        {React.createElement(getIconComponent(activity.icon), { 
          className: `${activity.iconColor || 'text-blue-500'} w-5 h-5 mr-2` 
        })}
        <span className="font-medium">{activity.description}</span>
      </div>
      
      {/* Activity time */}
      <div className="text-sm text-gray-600 flex items-center mb-1">
        <Clock className="w-4 h-4 mr-1" />
        {activity.time}
      </div>
      
      {/* Activity location */}
      <div className="text-sm text-gray-600 flex items-center mb-1">
        <MapPin className="w-4 h-4 mr-1" />
        {activity.location}
      </div>
      
      {/* Responsible parent */}
      <div className="text-sm font-medium">
        {activity.parent === 'dad' ? 'Dad' : activity.parent === 'mom' ? 'Mom' : 'Unassigned'}
      </div>
    </div>
  );
};

export default ActivityCard;
