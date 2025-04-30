/**
 * API routes for authentication
 * Handles user authentication and password management
 */

import { NextResponse } from 'next/server';
import pool from '@/components/TodoApp/lib/db';

/**
 * Authenticate user
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with authentication result
 */
export async function POST(request) {
  try {
    const { username, password, role } = await request.json();
    
    if (!username || !password || !role) {
      return NextResponse.json(
        { success: false, error: 'Username, password, and role are required' },
        { status: 400 }
      );
    }
    
    // Query database for user
    const [rows] = await pool.query(
      'SELECT * FROM todoapp_users WHERE username = ?',
      [username]
    );
    
    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid username, password, or role' },
        { status: 401 }
      );
    }
    
    const user = rows[0];
    
    // Verify password and role
    if (user.password === password && user.role === role) {
      // Return user info (excluding password)
      return NextResponse.json({
        success: true,
        user: {
          username: user.username,
          role: user.role
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid username, password, or role' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * Change user password
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with result
 */
export async function PUT(request) {
  try {
    const { username, currentPassword, newPassword } = await request.json();
    
    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Username, current password, and new password are required' },
        { status: 400 }
      );
    }
    
    // Query database for user
    const [rows] = await pool.query(
      'SELECT * FROM todoapp_users WHERE username = ?',
      [username]
    );
    
    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    const user = rows[0];
    
    // Verify current password
    if (user.password !== currentPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 401 }
      );
    }
    
    // Update password
    await pool.query(
      'UPDATE todoapp_users SET password = ?, updated_at = NOW() WHERE username = ?',
      [newPassword, username]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
