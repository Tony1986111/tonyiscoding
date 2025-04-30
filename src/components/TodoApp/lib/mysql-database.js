/**
 * MySQL Database utilities for TodoApp
 * Handles data storage and retrieval for activities and logs via API calls
 */

// API endpoints
const API_ENDPOINTS = {
  ACTIVITIES: '/api/todoapp/activities',
  LOGS: '/api/todoapp/logs',
  AUTH: '/api/todoapp/auth',
  WEEKS: '/api/todoapp/weeks'
};

/**
 * Initialize the database connection
 * @returns {Promise<boolean>} - True if initialization was successful
 */
export const initDatabase = async () => {
  try {
    console.log('MySQL database connection initialized via API');
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
    console.log(`Saving activities for week ${weekId} to MySQL database via API`);

    // Make API call to save activities
    const response = await fetch(API_ENDPOINTS.ACTIVITIES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weekId, activities }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to save activities');
    }

    return {
      success: true,
      message: 'Activities saved successfully to MySQL database'
    };
  } catch (error) {
    console.error('Error saving activities to MySQL:', error);

    // Fallback to localStorage for offline support
    try {
      const activitiesJson = localStorage.getItem('todoapp_activities');
      const allActivities = JSON.parse(activitiesJson) || {};
      allActivities[weekId] = activities;
      localStorage.setItem('todoapp_activities', JSON.stringify(allActivities));

      return {
        success: false,
        error: 'Failed to save to database, but saved to local storage as fallback'
      };
    } catch (localError) {
      return {
        success: false,
        error: 'Failed to save activities to database and local storage'
      };
    }
  }
};

/**
 * Get activities for a specific week
 * @param {string} weekId - The week identifier (e.g., '2023-W01')
 * @returns {Promise<Object>} - The activities for the specified week
 */
export const getActivities = async (weekId) => {
  try {
    console.log(`Getting activities for week ${weekId} from MySQL database via API`);

    // Make API call to get activities
    const response = await fetch(`${API_ENDPOINTS.ACTIVITIES}?weekId=${encodeURIComponent(weekId)}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to get activities');
    }

    return {
      success: true,
      data: result.data || []
    };
  } catch (error) {
    console.error('Error getting activities from MySQL:', error);

    // Fallback to localStorage for offline support
    try {
      const activitiesJson = localStorage.getItem('todoapp_activities');
      const allActivities = JSON.parse(activitiesJson) || {};

      return {
        success: true,
        data: allActivities[weekId] || []
      };
    } catch (localError) {
      return {
        success: false,
        error: 'Failed to get activities from database and local storage',
        data: []
      };
    }
  }
};

/**
 * Get all available weeks with activities
 * @returns {Promise<Array>} - Array of week identifiers
 */
export const getAvailableWeeks = async () => {
  try {
    console.log('Getting available weeks from MySQL database via API');

    // Make API call to get available weeks
    const response = await fetch(API_ENDPOINTS.WEEKS);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to get available weeks');
    }

    return {
      success: true,
      data: result.data || []
    };
  } catch (error) {
    console.error('Error getting available weeks from MySQL:', error);

    // Fallback to localStorage for offline support
    try {
      const activitiesJson = localStorage.getItem('todoapp_activities');
      const allActivities = JSON.parse(activitiesJson) || {};

      return {
        success: true,
        data: Object.keys(allActivities)
      };
    } catch (localError) {
      return {
        success: false,
        error: 'Failed to get available weeks from database and local storage',
        data: []
      };
    }
  }
};

/**
 * Log an activity modification
 * @param {Object} logEntry - The log entry to save
 * @returns {Promise<Object>} - Result of the log operation
 */
export const logModification = async (logEntry) => {
  try {
    console.log('Logging modification to MySQL database via API:', logEntry);

    // Make API call to log modification
    const response = await fetch(API_ENDPOINTS.LOGS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logEntry),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to log modification');
    }

    return {
      success: true,
      message: 'Modification logged successfully to MySQL database'
    };
  } catch (error) {
    console.error('Error logging modification to MySQL:', error);

    // Fallback to localStorage for offline support
    try {
      const logsJson = localStorage.getItem('todoapp_logs');
      const logs = JSON.parse(logsJson) || [];

      // Add new log entry with timestamp
      const newLog = {
        ...logEntry,
        timestamp: logEntry.timestamp || new Date().toISOString(),
        id: Date.now().toString()
      };

      logs.push(newLog);

      // Save back to localStorage
      localStorage.setItem('todoapp_logs', JSON.stringify(logs));

      return {
        success: false,
        error: 'Failed to log to database, but logged to local storage as fallback'
      };
    } catch (localError) {
      return {
        success: false,
        error: 'Failed to log modification to database and local storage'
      };
    }
  }
};

/**
 * Get all modification logs
 * @param {number} limit - Maximum number of logs to return (0 for all)
 * @returns {Promise<Array>} - Array of log entries
 */
export const getModificationLogs = async (limit = 0) => {
  try {
    console.log('Getting modification logs from MySQL database via API');

    // Make API call to get logs
    const url = limit > 0
      ? `${API_ENDPOINTS.LOGS}?limit=${limit}`
      : API_ENDPOINTS.LOGS;

    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to get logs');
    }

    return {
      success: true,
      data: result.data || []
    };
  } catch (error) {
    console.error('Error getting logs from MySQL:', error);

    // Fallback to localStorage for offline support
    try {
      const logsJson = localStorage.getItem('todoapp_logs');
      const logs = JSON.parse(logsJson) || [];

      // Sort logs by timestamp (newest first)
      const sortedLogs = logs.sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      return {
        success: true,
        data: limit > 0 ? sortedLogs.slice(0, limit) : sortedLogs
      };
    } catch (localError) {
      return {
        success: false,
        error: 'Failed to get logs from database and local storage',
        data: []
      };
    }
  }
};

/**
 * Authenticate a user with username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to authenticate
 * @param {string} role - The role selected by the user (dad/mom)
 * @returns {Promise<Object>} - Authentication result with user info or error
 */
export const authenticateUser = async (username, password, role) => {
  try {
    console.log(`Authenticating user ${username} with role ${role} from MySQL database via API`);

    // Make API call to authenticate user
    const response = await fetch(API_ENDPOINTS.AUTH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Authentication failed');
    }

    // Create session data
    const session = {
      username: result.user.username,
      role: result.user.role,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };

    // Store session in localStorage
    localStorage.setItem('todoAppSession', JSON.stringify(session));

    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    console.error('Error authenticating user from MySQL:', error);

    // Fallback to hardcoded values for offline support
    try {
      const validUsers = {
        'dad': { password: 'dad123', role: 'dad' },
        'mom': { password: 'mom123', role: 'mom' },
      };

      const user = validUsers[username];

      if (user && user.password === password && user.role === role) {
        // Create session data
        const session = {
          username,
          role,
          isAuthenticated: true,
          loginTime: new Date().toISOString(),
        };

        // Store session in localStorage
        localStorage.setItem('todoAppSession', JSON.stringify(session));

        return {
          success: true,
          user: {
            username,
            role,
          }
        };
      }

      return {
        success: false,
        error: 'Invalid username, password, or role'
      };
    } catch (localError) {
      return {
        success: false,
        error: 'Failed to authenticate user'
      };
    }
  }
};

/**
 * Check if a user is currently authenticated
 * @returns {Object} - Session data if authenticated, null otherwise
 */
export const getSession = () => {
  try {
    const sessionData = localStorage.getItem('todoAppSession');
    if (!sessionData) return null;

    const session = JSON.parse(sessionData);
    return session.isAuthenticated ? session : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

/**
 * Log out the current user
 * @returns {Promise<boolean>} - True if logout was successful
 */
export const logoutUser = async () => {
  try {
    // Remove session from localStorage
    localStorage.removeItem('todoAppSession');

    return true;
  } catch (error) {
    console.error('Error logging out user:', error);
    return false;
  }
};

/**
 * Change a user's password
 * @param {string} username - The username of the user
 * @param {string} currentPassword - The current password
 * @param {string} newPassword - The new password
 * @returns {Promise<Object>} - Result of password change operation
 */
export const changePassword = async (username, currentPassword, newPassword) => {
  try {
    console.log(`Changing password for user ${username} in MySQL database via API`);

    // Make API call to change password
    const response = await fetch(API_ENDPOINTS.AUTH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, currentPassword, newPassword }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to change password');
    }

    return {
      success: true,
      message: 'Password changed successfully in MySQL database'
    };
  } catch (error) {
    console.error('Error changing password in MySQL:', error);
    return {
      success: false,
      error: 'Failed to change password in MySQL database'
    };
  }
};

// Date utility functions (these don't need to change)

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
  // Get the first day of the current week
  const weekDates = getWeekDates(weekId);
  const firstDayOfWeek = weekDates[0];

  // Get the first day of the next week
  const firstDayOfNextWeek = new Date(firstDayOfWeek);
  firstDayOfNextWeek.setDate(firstDayOfWeek.getDate() + 7);

  // Get week identifier for the next week
  return getWeekIdForDate(firstDayOfNextWeek);
};
