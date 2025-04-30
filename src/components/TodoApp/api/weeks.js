/**
 * API routes for weeks
 * Handles operations related to available weeks
 */

import { NextResponse } from 'next/server';
import pool from '../lib/db';

/**
 * Get all available weeks with activities
 * @param {Request} request - The request object
 * @returns {Promise<Response>} - JSON response with weeks
 */
export async function GET() {
  try {
    // Query database for all weeks
    const [rows] = await pool.query(
      'SELECT week_id FROM todoapp_activities ORDER BY week_id DESC'
    );
    
    // Extract week IDs
    const weekIds = rows.map(row => row.week_id);
    
    return NextResponse.json({
      success: true,
      data: weekIds
    });
  } catch (error) {
    console.error('Error getting available weeks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get available weeks', data: [] },
      { status: 500 }
    );
  }
}
