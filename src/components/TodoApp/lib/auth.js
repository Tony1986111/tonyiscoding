/**
 * Authentication utilities for TodoApp
 * Handles user login, logout, and session management
 */

// Mock user database (in a real app, this would be stored in a database)
const USERS = {
  'dad': { password: 'dad123', role: 'dad' },
  'mom': { password: 'mom123', role: 'mom' },
};

/**
 * Authenticate a user with username and password
 * @param {string} username - The username to authenticate
 * @param {string} password - The password to authenticate
 * @param {string} role - The role selected by the user (dad/mom)
 * @returns {Promise<Object>} - Authentication result with user info or error
 */
export const authenticateUser = async (username, password, role) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user exists and password matches
  const user = USERS[username];
  
  if (user && user.password === password && user.role === role) {
    // Create session data
    const session = {
      username,
      role,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };
    
    // Store session in localStorage (in a real app, this would be a secure HTTP-only cookie)
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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Remove session from localStorage
  localStorage.removeItem('todoAppSession');
  
  return true;
};

/**
 * Change a user's password
 * @param {string} username - The username of the user
 * @param {string} currentPassword - The current password
 * @param {string} newPassword - The new password
 * @returns {Promise<Object>} - Result of password change operation
 */
export const changePassword = async (username, currentPassword, newPassword) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user exists and current password matches
  const user = USERS[username];
  
  if (user && user.password === currentPassword) {
    // Update password (in a real app, this would update the database)
    USERS[username].password = newPassword;
    
    return {
      success: true,
      message: 'Password changed successfully'
    };
  }
  
  return {
    success: false,
    error: 'Current password is incorrect'
  };
};

/**
 * Check if the current user has a specific role
 * @param {string} role - The role to check for
 * @returns {boolean} - True if the user has the specified role
 */
export const hasRole = (role) => {
  const session = getSession();
  return session && session.role === role;
};
