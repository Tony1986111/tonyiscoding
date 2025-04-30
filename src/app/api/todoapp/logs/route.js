/**
 * API routes for activity logs
 * Handles CRUD operations for activity logs
 */

import { NextResponse } from 'next/server';
import pool from '@/components/TodoApp/lib/db';

/**
 * Get activity logs
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with logs
 */
export async function GET(request) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '0');
    
    // Query database
    let query = 'SELECT * FROM todoapp_logs ORDER BY timestamp DESC';
    
    if (limit > 0) {
      query += ' LIMIT ?';
      const [rows] = await pool.query(query, [limit]);
      return NextResponse.json({ success: true, data: rows });
    } else {
      const [rows] = await pool.query(query);
      return NextResponse.json({ success: true, data: rows });
    }
  } catch (error) {
    console.error('Error getting logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get logs', data: [] },
      { status: 500 }
    );
  }
}

/**
 * Save activity log
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with result
 */
export async function POST(request) {
  try {
    const logEntry = await request.json();
    
    if (!logEntry.username || !logEntry.action) {
      return NextResponse.json(
        { success: false, error: 'Username and action are required' },
        { status: 400 }
      );
    }
    
    // Ensure timestamp exists
    const timestamp = logEntry.timestamp || new Date().toISOString();
    
    // Insert log entry
    await pool.query(
      'INSERT INTO todoapp_logs (username, role, action, details, timestamp) VALUES (?, ?, ?, ?, ?)',
      [
        logEntry.username,
        logEntry.role || '',
        logEntry.action,
        logEntry.details || '',
        timestamp
      ]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Log entry saved successfully'
    });
  } catch (error) {
    console.error('Error saving log entry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save log entry' },
      { status: 500 }
    );
  }
}
