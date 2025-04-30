/**
 * Database connection module for TodoApp
 * Handles MySQL database connection
 */

import mysql from 'mysql2/promise';

let pool;

try {
  // Create connection pool
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tonyblog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  console.log('MySQL connection pool created');
} catch (error) {
  console.error('Error creating MySQL connection pool:', error);

  // Create a mock pool for development
  pool = {
    query: async () => {
      console.warn('Using mock database pool');
      return [[], []];
    }
  };
}

export default pool;
