/**
 * API routes for activities
 * Handles CRUD operations for activities
 */

import { NextResponse } from 'next/server';
import pool from '@/components/TodoApp/lib/db';

/**
 * Get activities for a specific week
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with activities
 */
export async function GET(request) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const weekId = url.searchParams.get('weekId');
    
    if (!weekId) {
      return NextResponse.json(
        { success: false, error: 'Week ID is required' },
        { status: 400 }
      );
    }
    
    // Query database
    const [rows] = await pool.query(
      'SELECT * FROM todoapp_activities WHERE week_id = ?',
      [weekId]
    );
    
    // If no activities found, return empty array
    if (!rows.length) {
      return NextResponse.json({ success: true, data: [] });
    }
    
    // Parse activities JSON from database
    const activities = JSON.parse(rows[0].activities);
    
    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error('Error getting activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get activities', data: [] },
      { status: 500 }
    );
  }
}

/**
 * Save activities for a specific week
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with result
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { weekId, activities } = data;
    
    if (!weekId || !activities) {
      return NextResponse.json(
        { success: false, error: 'Week ID and activities are required' },
        { status: 400 }
      );
    }
    
    // Convert activities to JSON string
    const activitiesJson = JSON.stringify(activities);
    
    // Check if week exists
    const [existingRows] = await pool.query(
      'SELECT * FROM todoapp_activities WHERE week_id = ?',
      [weekId]
    );
    
    if (existingRows.length > 0) {
      // Update existing week
      await pool.query(
        'UPDATE todoapp_activities SET activities = ?, updated_at = NOW() WHERE week_id = ?',
        [activitiesJson, weekId]
      );
    } else {
      // Insert new week
      await pool.query(
        'INSERT INTO todoapp_activities (week_id, activities, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [weekId, activitiesJson]
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Activities saved successfully'
    });
  } catch (error) {
    console.error('Error saving activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save activities' },
      { status: 500 }
    );
  }
}
