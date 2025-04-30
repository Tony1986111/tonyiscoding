/**
 * Database utilities for TodoApp
 * Handles data storage and retrieval for activities and logs
 * 
 * Note: This is a mock implementation using localStorage.
 * In a production app, this would connect to a real database.
 */

// Database collection names
const COLLECTIONS = {
  ACTIVITIES: 'todoapp_activities',
  LOGS: 'todoapp_logs',
  USERS: 'todoapp_users',
};

/**
 * Initialize the database
 * @returns {Promise<boolean>} - True if initialization was successful
 */
export const initDatabase = async () => {
  try {
    // Check if collections exist, if not create them
    if (!localStorage.getItem(COLLECTIONS.ACTIVITIES)) {
      localStorage.setItem(COLLECTIONS.ACTIVITIES, JSON.stringify({}));
    }
    
    if (!localStorage.getItem(COLLECTIONS.LOGS)) {
      localStorage.setItem(COLLECTIONS.LOGS, JSON.stringify([]));
    }
    
    if (!localStorage.getItem(COLLECTIONS.USERS)) {
      const defaultUsers = {
        'dad': { password: 'dad123', role: 'dad' },
        'mom': { password: 'mom123', role: 'mom' },
      };
      localStorage.setItem(COLLECTIONS.USERS, JSON.stringify(defaultUsers));
    }
    
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
};

/**
 * Save activities for a specific week
 * @param {string} weekId - The week identifier (e.g., '2023-W01')
 * @param {Array} activities - The activities to save
 * @returns {Promise<Object>} - Result of the save operation
 */
export const saveActivities = async (weekId, activities) => {
  try {
    // Get current activities
    const activitiesJson = localStorage.getItem(COLLECTIONS.ACTIVITIES);
    const allActivities = JSON.parse(activitiesJson) || {};
    
    // Update activities for the specified week
    allActivities[weekId] = activities;
    
    // Save back to localStorage
    localStorage.setItem(COLLECTIONS.ACTIVITIES, JSON.stringify(allActivities));
    
    return {
      success: true,
      message: 'Activities saved successfully'
    };
  } catch (error) {
    console.error('Error saving activities:', error);
    return {
      success: false,
      error: 'Failed to save activities'
    };
  }
};

/**
 * Get activities for a specific week
 * @param {string} weekId - The week identifier (e.g., '2023-W01')
 * @returns {Promise<Object>} - The activities for the specified week
 */
export const getActivities = async (weekId) => {
  try {
    // Get current activities
    const activitiesJson = localStorage.getItem(COLLECTIONS.ACTIVITIES);
    const allActivities = JSON.parse(activitiesJson) || {};
    
    // Return activities for the specified week, or empty array if none exist
    return {
      success: true,
      data: allActivities[weekId] || []
    };
  } catch (error) {
    console.error('Error getting activities:', error);
    return {
      success: false,
      error: 'Failed to get activities',
      data: []
    };
  }
};

/**
 * Get all available weeks with activities
 * @returns {Promise<Array>} - Array of week identifiers
 */
export const getAvailableWeeks = async () => {
  try {
    // Get current activities
    const activitiesJson = localStorage.getItem(COLLECTIONS.ACTIVITIES);
    const allActivities = JSON.parse(activitiesJson) || {};
    
    // Return array of week identifiers
    return {
      success: true,
      data: Object.keys(allActivities)
    };
  } catch (error) {
    console.error('Error getting available weeks:', error);
    return {
      success: false,
      error: 'Failed to get available weeks',
      data: []
    };
  }
};

/**
 * Log an activity modification
 * @param {Object} logEntry - The log entry to save
 * @returns {Promise<Object>} - Result of the log operation
 */
export const logModification = async (logEntry) => {
  try {
    // Get current logs
    const logsJson = localStorage.getItem(COLLECTIONS.LOGS);
    const logs = JSON.parse(logsJson) || [];
    
    // Add new log entry with timestamp
    const newLog = {
      ...logEntry,
      timestamp: logEntry.timestamp || new Date().toISOString(),
      id: Date.now().toString()
    };
    
    logs.push(newLog);
    
    // Save back to localStorage
    localStorage.setItem(COLLECTIONS.LOGS, JSON.stringify(logs));
    
    return {
      success: true,
      message: 'Modification logged successfully'
    };
  } catch (error) {
    console.error('Error logging modification:', error);
    return {
      success: false,
      error: 'Failed to log modification'
    };
  }
};

/**
 * Get all modification logs
 * @param {number} limit - Maximum number of logs to return (0 for all)
 * @returns {Promise<Array>} - Array of log entries
 */
export const getModificationLogs = async (limit = 0) => {
  try {
    // Get current logs
    const logsJson = localStorage.getItem(COLLECTIONS.LOGS);
    const logs = JSON.parse(logsJson) || [];
    
    // Sort logs by timestamp (newest first)
    const sortedLogs = logs.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // Return logs (limited if specified)
    return {
      success: true,
      data: limit > 0 ? sortedLogs.slice(0, limit) : sortedLogs
    };
  } catch (error) {
    console.error('Error getting logs:', error);
    return {
      success: false,
      error: 'Failed to get logs',
      data: []
    };
  }
};

/**
 * Generate a week identifier for the current week
 * @returns {string} - Week identifier (e.g., '2023-W01')
 */
export const getCurrentWeekId = () => {
  const now = new Date();
  const year = now.getFullYear();
  
  // Get ISO week number
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };
  
  const weekNumber = getWeekNumber(now);
  
  // Format as YYYY-WXX
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
};

/**
 * Get dates for a specific week
 * @param {string} weekId - The week identifier (e.g., '2023-W01')
 * @returns {Array} - Array of date objects for each day of the week
 */
export const getWeekDates = (weekId) => {
  // Parse week identifier
  const [year, week] = weekId.split('-W');
  
  // Get the first day of the year
  const firstDayOfYear = new Date(parseInt(year), 0, 1);
  
  // Get the first day of the week (Monday)
  const firstDayOfWeek = new Date(firstDayOfYear);
  firstDayOfWeek.setDate(firstDayOfYear.getDate() + (parseInt(week) - 1) * 7);
  
  // Adjust to Monday (ISO week starts on Monday)
  const dayOfWeek = firstDayOfWeek.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days, otherwise go to Monday
  
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diff);
  
  // Generate array of dates for the week
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    weekDates.push(date);
  }
  
  return weekDates;
};

/**
 * Get the week identifier for a specific date
 * @param {Date} date - The date to get the week identifier for
 * @returns {string} - Week identifier (e.g., '2023-W01')
 */
export const getWeekIdForDate = (date) => {
  const year = date.getFullYear();
  
  // Get ISO week number
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  };
  
  const weekNumber = getWeekNumber(date);
  
  // Format as YYYY-WXX
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
};

/**
 * Get the previous week identifier
 * @param {string} weekId - The current week identifier
 * @returns {string} - Previous week identifier
 */
export const getPreviousWeekId = (weekId) => {
  // Parse week identifier
  const [year, week] = weekId.split('-W');
  
  // Get the first day of the current week
  const weekDates = getWeekDates(weekId);
  const firstDayOfWeek = weekDates[0];
  
  // Get the first day of the previous week
  const firstDayOfPreviousWeek = new Date(firstDayOfWeek);
  firstDayOfPreviousWeek.setDate(firstDayOfWeek.getDate() - 7);
  
  // Get week identifier for the previous week
  return getWeekIdForDate(firstDayOfPreviousWeek);
};

/**
 * Get the next week identifier
 * @param {string} weekId - The current week identifier
 * @returns {string} - Next week identifier
 */
export const getNextWeekId = (weekId) => {
  // Parse week identifier
  const [year, week] = weekId.split('-W');
  
  // Get the first day of the current week
  const weekDates = getWeekDates(weekId);
  const firstDayOfWeek = weekDates[0];
  
  // Get the first day of the next week
  const firstDayOfNextWeek = new Date(firstDayOfWeek);
  firstDayOfNextWeek.setDate(firstDayOfWeek.getDate() + 7);
  
  // Get week identifier for the next week
  return getWeekIdForDate(firstDayOfNextWeek);
};
