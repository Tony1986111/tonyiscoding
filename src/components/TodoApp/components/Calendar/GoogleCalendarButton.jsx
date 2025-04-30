import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

/**
 * Google Calendar integration button
 * Allows users to add an activity to their Google Calendar
 */
const GoogleCalendarButton = ({ activity, date }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Handle adding to Google Calendar
  const handleAddToCalendar = () => {
    setIsLoading(true);
    setSuccess(false);
    
    // Create calendar event details
    const eventTitle = activity.description;
    const eventLocation = activity.location;
    const eventDate = new Date(date);
    
    // Parse time from activity
    const [hours, minutes] = activity.time.split(':').map(Number);
    eventDate.setHours(hours, minutes, 0, 0);
    
    // Set end time (1 hour after start time)
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 1);
    
    // Format dates for Google Calendar URL
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const startTime = formatDate(eventDate);
    const endTime = formatDate(endDate);
    
    // Create Google Calendar URL
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(`Responsible: ${activity.parent}`)}`;
    
    // Open Google Calendar in a new tab
    window.open(googleCalendarUrl, '_blank');
    
    // Simulate success after a delay
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <button
      onClick={handleAddToCalendar}
      disabled={isLoading}
      className={`p-1 rounded-full transition-colors ${
        success 
          ? 'bg-green-100 text-green-600' 
          : 'bg-white text-blue-500 hover:bg-blue-50'
      }`}
      title="Add to Google Calendar"
    >
      <Calendar className="w-4 h-4" />
    </button>
  );
};

export default GoogleCalendarButton;
