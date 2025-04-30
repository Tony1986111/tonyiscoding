/**
 * Google Calendar integration utilities
 * Handles creating and adding events to Google Calendar
 */

/**
 * Create a Google Calendar event URL
 * @param {Object} activity - The activity to create an event for
 * @param {Date} date - The date of the activity
 * @returns {string} - Google Calendar event URL
 */
export const createGoogleCalendarEventUrl = (activity, date) => {
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
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTime}/${endTime}&location=${encodeURIComponent(eventLocation)}&details=${encodeURIComponent(`Responsible: ${activity.parent}`)}`;
};

/**
 * Add an event to Google Calendar
 * @param {Object} activity - The activity to add
 * @param {Date} date - The date of the activity
 * @returns {Promise<Object>} - Result of the operation
 */
export const addToGoogleCalendar = async (activity, date) => {
  try {
    // Create Google Calendar URL
    const url = createGoogleCalendarEventUrl(activity, date);
    
    // Open Google Calendar in a new tab
    window.open(url, '_blank');
    
    return {
      success: true,
      message: 'Event added to Google Calendar'
    };
  } catch (error) {
    console.error('Error adding to Google Calendar:', error);
    return {
      success: false,
      error: 'Failed to add event to Google Calendar'
    };
  }
};
