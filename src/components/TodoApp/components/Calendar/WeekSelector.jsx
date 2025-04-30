import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { 
  getCurrentWeekId, 
  getWeekDates, 
  getPreviousWeekId, 
  getNextWeekId,
  getAvailableWeeks
} from '../../lib/database';

/**
 * Week selector component
 * Allows users to navigate between weeks and displays the current week dates
 */
const WeekSelector = ({ selectedWeekId, onWeekChange }) => {
  const [availableWeeks, setAvailableWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Format date as Month DD
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get week dates for display
  const weekDates = getWeekDates(selectedWeekId);
  
  // Format week range for display (e.g., "May 1 - May 7, 2023")
  const weekRangeText = `${formatDate(weekDates[0])} - ${formatDate(weekDates[6])}, ${weekDates[0].getFullYear()}`;
  
  // Load available weeks
  useEffect(() => {
    const loadAvailableWeeks = async () => {
      setIsLoading(true);
      try {
        const result = await getAvailableWeeks();
        if (result.success) {
          setAvailableWeeks(result.data);
        }
      } catch (error) {
        console.error('Error loading available weeks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAvailableWeeks();
  }, [selectedWeekId]);
  
  // Handle navigation to previous week
  const handlePreviousWeek = () => {
    const previousWeekId = getPreviousWeekId(selectedWeekId);
    onWeekChange(previousWeekId);
  };
  
  // Handle navigation to next week
  const handleNextWeek = () => {
    const nextWeekId = getNextWeekId(selectedWeekId);
    onWeekChange(nextWeekId);
  };
  
  // Handle navigation to current week
  const handleCurrentWeek = () => {
    const currentWeekId = getCurrentWeekId();
    onWeekChange(currentWeekId);
  };
  
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="flex items-center">
        <button
          onClick={handlePreviousWeek}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="mx-4 text-lg font-medium">
          {weekRangeText}
        </div>
        
        <button
          onClick={handleNextWeek}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next week"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={handleCurrentWeek}
          className="ml-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors flex items-center"
        >
          <Calendar className="w-4 h-4 mr-1" />
          Current Week
        </button>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-gray-500 mr-2">Week:</span>
        <select
          value={selectedWeekId}
          onChange={(e) => onWeekChange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          disabled={isLoading}
        >
          {/* Always include current week */}
          <option value={selectedWeekId}>
            {selectedWeekId} ({weekRangeText})
          </option>
          
          {/* Include other available weeks */}
          {availableWeeks
            .filter(weekId => weekId !== selectedWeekId)
            .map(weekId => {
              const dates = getWeekDates(weekId);
              const rangeText = `${formatDate(dates[0])} - ${formatDate(dates[6])}, ${dates[0].getFullYear()}`;
              
              return (
                <option key={weekId} value={weekId}>
                  {weekId} ({rangeText})
                </option>
              );
            })
          }
        </select>
      </div>
    </div>
  );
};

export default WeekSelector;
