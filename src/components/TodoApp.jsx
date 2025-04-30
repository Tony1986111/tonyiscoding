import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Heart, Book, Gamepad, Music, Award, Coffee, Sun, Moon, Droplet, Utensils, Download, Edit, Trash, Plus, User, Save, RefreshCw, History, LogOut, Key, Mail, X, Check } from 'lucide-react';

// Import components from TodoApp folder
import LoginForm from './TodoApp/components/Auth/LoginForm';
import PasswordChangeForm from './TodoApp/components/Auth/PasswordChangeForm';
import WeekSelector from './TodoApp/components/Calendar/WeekSelector';
import GoogleCalendarButton from './TodoApp/components/Calendar/GoogleCalendarButton';
import ActivityLog from './TodoApp/components/Logs/ActivityLog';
import NotificationButton from './TodoApp/components/Logs/NotificationButton';

// Import utility functions
import {
  authenticateUser,
  getSession,
  logoutUser,
  changePassword,
  initDatabase,
  getCurrentWeekId,
  getActivities,
  saveActivities,
  logModification,
  getWeekDates
} from './TodoApp/lib/mysql-database';
import {
  sendEmailNotification,
  createChangeNotification
} from './TodoApp/lib/emailNotification';
import {
  addToGoogleCalendar
} from './TodoApp/lib/googleCalendar';

// Import styles
import './TodoApp/styles/todoapp.css';

// 图标选项
const iconOptions = [
  { name: "日历", component: Calendar },
  { name: "时钟", component: Clock },
  { name: "地点", component: MapPin },
  { name: "爱心", component: Heart },
  { name: "书本", component: Book },
  { name: "游戏", component: Gamepad },
  { name: "音乐", component: Music },
  { name: "奖杯", component: Award },
  { name: "咖啡", component: Coffee },
  { name: "太阳", component: Sun },
  { name: "月亮", component: Moon },
  { name: "水滴", component: Droplet },
  { name: "餐具", component: Utensils },
  { name: "足球", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="m12 16-4-4 4-4 4 4-4 4"/></svg> },
  { name: "篮球", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.5 3 6.57 7.25 6.57 12.07M19.07 4.93c-4.5 3-6.57 7.25-6.57 12.07"/><path d="M2 12h20"/><path d="M12 2v20"/></svg> },
  { name: "游泳", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 8V4a2 2 0 1 1 4 0v4"/><path d="M19 11c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0"/><path d="M19 15c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0"/><path d="M19 19c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0l-1 1-1-1c-.8-.8-2.2-.8-3 0"/></svg> },
  { name: "画笔", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18 3-3 7H9l-3-7"/><path d="M13 10v9"/><path d="M18 10v9"/><path d="M8 10v9"/><path d="M3 19h18"/></svg> },
  { name: "电影", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"/><line x1="7" x2="7" y1="2" y2="22"/><line x1="17" x2="17" y1="2" y2="22"/><line x1="2" x2="22" y1="12" y2="12"/><line x1="2" x2="7" y1="7" y2="7"/><line x1="2" x2="7" y1="17" y2="17"/><line x1="17" x2="22" y1="17" y2="17"/><line x1="17" x2="22" y1="7" y2="7"/></svg> },
  { name: "自行车", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg> },
  { name: "医疗", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.8 2.3A1 1 0 0 0 3 3v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V3a1 1 0 0 0-1.8-.7l-2 2a1 1 0 0 1-1.5 0Z"/><path d="M21 16.4V17a4 4 0 0 1-4 4h-5"/><path d="m10 20 3-3-3-3"/></svg> },
  { name: "公园", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 14h.01"/><path d="M7 14h.01"/><path d="M10 18h.01"/><path d="M14 18h.01"/><path d="M10 10h.01"/><path d="M14 10h.01"/><circle cx="12" cy="12" r="10"/></svg> },
  { name: "科学", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M5 7h14"/><path d="M5 21h14"/><path d="M5 7v14"/><path d="M19 7v14"/><path d="M9 13h6"/><path d="M9 17h6"/></svg> },
  { name: "teamkids", component: props => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> }
];

// 配色方案
const colorSchemes = [
  { name: "彩虹色", colors: ["bg-red-100", "bg-orange-100", "bg-yellow-100", "bg-green-100", "bg-blue-100", "bg-indigo-100", "bg-purple-100"] },
  { name: "森林色", colors: ["bg-green-50", "bg-green-100", "bg-green-200", "bg-teal-100", "bg-teal-50", "bg-emerald-100", "bg-lime-100"] },
  { name: "海洋色", colors: ["bg-blue-50", "bg-blue-100", "bg-cyan-100", "bg-sky-100", "bg-indigo-100", "bg-teal-100", "bg-blue-200"] },
  { name: "糖果色", colors: ["bg-pink-100", "bg-purple-100", "bg-indigo-100", "bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-red-100"] },
  { name: "夕阳色", colors: ["bg-amber-50", "bg-orange-100", "bg-amber-100", "bg-yellow-100", "bg-red-100", "bg-rose-100", "bg-pink-100"] }
];

/**
 * Enhanced TodoApp Component
 * Main entry point for the TodoApp with authentication, data persistence,
 * Google Calendar integration, and activity logging
 */
const TodoApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is already authenticated
  useEffect(() => {
    const initialize = async () => {
      // Initialize database
      await initDatabase();

      // Check authentication status
      const session = getSession();
      setIsAuthenticated(!!session);
      setUser(session);
      setIsLoading(false);
    };

    initialize();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render login page or dashboard based on authentication state
  return isAuthenticated ? (
    <FamilySchedule user={user} onLogout={handleLogout} />
  ) : (
    <LoginPage onLoginSuccess={handleLoginSuccess} />
  );
};

/**
 * Login Page Component
 * Handles user authentication
 */
const LoginPage = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');

  // Handle login form submission
  const handleLogin = async ({ username, password, role }) => {
    try {
      // Make sure we have all required parameters
      if (!username || !password || !role) {
        setError('Please provide username, password and role');
        return;
      }

      // Authenticate user
      const result = await authenticateUser(username, password, role);

      if (result.success) {
        // Login successful
        onLoginSuccess(result.user);
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <LoginForm onLogin={handleLogin} />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>For demo purposes, use:</p>
          <p>Username: dad or mom</p>
          <p>Password: dad123 or mom123</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Family Schedule Component
 * Main dashboard after authentication
 */
const FamilySchedule = ({ user, onLogout }) => {
  const [childName, setChildName] = useState("Child");
  const [selectedColorScheme, setSelectedColorScheme] = useState(0);
  const [saveStatus, setSaveStatus] = useState(""); // Save status message
  const [activeTab, setActiveTab] = useState("All"); // Active tab
  const [selectedWeekId, setSelectedWeekId] = useState(getCurrentWeekId());
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const [changes, setChanges] = useState([]);

  // Define parent activity background colors
  const parentColors = {
    "dad": "bg-blue-100",
    "mom": "bg-pink-100",
    "none": "bg-gray-100"
  };

  // Define tab options
  const tabOptions = ["All", "Dad", "Mom", "None"];

  // Default activities data
  const defaultActivities = [
    // Monday
    {
      name: "Monday",
      activities: [
        { id: 1, time: "07:00", location: "Home", description: "Breakfast", parent: "mom", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 2, time: "07:30", location: "School", description: "Drop off", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 3, time: "15:30", location: "School", description: "Pick up", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 4, time: "16:30", location: "Soccer field", description: "Soccer practice", parent: "dad", icon: "Award", iconColor: "text-green-500" },
        { id: 5, time: "19:00", location: "Home", description: "Bath time", parent: "dad", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 6, time: "20:00", location: "Home", description: "Reading", parent: "mom", icon: "Book", iconColor: "text-purple-500" }
      ]
    },
    // Tuesday
    {
      name: "Tuesday",
      activities: [
        { id: 7, time: "07:00", location: "Home", description: "Breakfast", parent: "dad", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 8, time: "07:30", location: "School", description: "Drop off", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 9, time: "15:30", location: "School", description: "Pick up", parent: "mom", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 10, time: "16:30", location: "Home", description: "Rest time", parent: "mom", icon: "Heart", iconColor: "text-red-500" },
        { id: 11, time: "19:00", location: "Home", description: "Bath time", parent: "mom", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 12, time: "20:00", location: "Home", description: "Game time", parent: "dad", icon: "Gamepad", iconColor: "text-purple-500" }
      ]
    },
    // Wednesday
    {
      name: "Wednesday",
      activities: [
        { id: 13, time: "07:00", location: "Home", description: "Breakfast", parent: "mom", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 14, time: "07:30", location: "School", description: "Drop off", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 15, time: "15:30", location: "School", description: "Pick up", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 16, time: "16:30", location: "Music room", description: "Piano lesson", parent: "mom", icon: "Music", iconColor: "text-yellow-500" },
        { id: 17, time: "19:00", location: "Home", description: "Bath time", parent: "dad", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 18, time: "20:00", location: "Home", description: "Storytelling", parent: "mom", icon: "Book", iconColor: "text-pink-500" }
      ]
    },
    // Thursday
    {
      name: "Thursday",
      activities: [
        { id: 19, time: "07:00", location: "Home", description: "Breakfast", parent: "dad", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 20, time: "07:30", location: "School", description: "Drop off", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 21, time: "15:30", location: "School", description: "Pick up", parent: "mom", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 22, time: "16:30", location: "Gym", description: "Basketball practice", parent: "dad", icon: "Award", iconColor: "text-orange-500" },
        { id: 23, time: "19:00", location: "Home", description: "Bath time", parent: "mom", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 24, time: "20:00", location: "Home", description: "Drawing", parent: "mom", icon: "Heart", iconColor: "text-red-500" }
      ]
    },
    // Friday
    {
      name: "Friday",
      activities: [
        { id: 25, time: "07:00", location: "Home", description: "Breakfast", parent: "mom", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 26, time: "07:30", location: "School", description: "Drop off", parent: "dad", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 27, time: "15:30", location: "School", description: "Pick up", parent: "mom", icon: "Calendar", iconColor: "text-blue-500" },
        { id: 28, time: "16:30", location: "Home", description: "Rest time", parent: "mom", icon: "Coffee", iconColor: "text-amber-700" },
        { id: 29, time: "19:00", location: "Home", description: "Bath time", parent: "dad", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 30, time: "20:00", location: "Home", description: "Movie night", parent: "dad", icon: "Heart", iconColor: "text-red-500" }
      ]
    },
    // Saturday
    {
      name: "Saturday",
      activities: [
        { id: 31, time: "08:00", location: "Home", description: "Breakfast", parent: "dad", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 32, time: "09:30", location: "Park", description: "Morning run", parent: "dad", icon: "Sun", iconColor: "text-yellow-500" },
        { id: 33, time: "14:00", location: "Library", description: "Reading time", parent: "mom", icon: "Book", iconColor: "text-teal-500" },
        { id: 34, time: "19:00", location: "Home", description: "Bath time", parent: "dad", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 35, time: "20:00", location: "Home", description: "Board games", parent: "mom", icon: "Gamepad", iconColor: "text-purple-500" }
      ]
    },
    // Sunday
    {
      name: "Sunday",
      activities: [
        { id: 36, time: "08:00", location: "Home", description: "Breakfast", parent: "mom", icon: "Utensils", iconColor: "text-amber-700" },
        { id: 37, time: "10:00", location: "Playground", description: "Play time", parent: "dad", icon: "Heart", iconColor: "text-pink-500" },
        { id: 38, time: "14:00", location: "Home", description: "Crafts", parent: "mom", icon: "Award", iconColor: "text-indigo-500" },
        { id: 39, time: "19:00", location: "Home", description: "Bath time", parent: "mom", icon: "Droplet", iconColor: "text-blue-500" },
        { id: 40, time: "20:00", location: "Home", description: "Storytelling", parent: "dad", icon: "Book", iconColor: "text-green-500" }
      ]
    }
  ];

  // Load data from database for the current week
  const loadActivitiesData = async () => {
    try {
      // Get activities for the current week
      const result = await getActivities(selectedWeekId);

      if (result.success && result.data.length > 0) {
        return result.data;
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    }

    // If no data found or error, return default activities
    return defaultActivities;
  };

  // Load child name from database
  const loadChildName = async () => {
    try {
      // In a real app, this would load from database
      // For now, we'll use localStorage for compatibility
      const savedData = localStorage.getItem('familySchedule');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData.childName || "Child";
      }
    } catch (error) {
      console.error('Error loading child name:', error);
    }
    return "Child";
  };

  // Load color scheme preference
  const loadColorScheme = async () => {
    try {
      // In a real app, this would load from database
      // For now, we'll use localStorage for compatibility
      const savedData = localStorage.getItem('familySchedule');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return parsedData.colorScheme || 0;
      }
    } catch (error) {
      console.error('Error loading color scheme:', error);
    }
    return 0;
  };

  // Initialize state
  const [days, setDays] = useState(defaultActivities);
  const [editing, setEditing] = useState(null);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [weekDates, setWeekDates] = useState([]);
  const scheduleRef = useRef(null);

  // Load data when component mounts
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load activities for the current week
        const activitiesData = await loadActivitiesData();
        setDays(activitiesData);

        // Load child name and color scheme
        const name = await loadChildName();
        setChildName(name);

        const scheme = await loadColorScheme();
        setSelectedColorScheme(scheme);

        // Get dates for the current week
        const dates = getWeekDates(selectedWeekId);
        setWeekDates(dates);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, [selectedWeekId]);

  // 获取图标组件
  const getIconComponent = (iconName) => {
    const found = iconOptions.find(option => option.name === iconName);
    return found ? found.component : Calendar;
  };

  // 对活动按时间排序
  const sortActivitiesByTime = (activities) => {
    return [...activities].sort((a, b) => {
      // 将时间字符串转换为可比较的数字
      const timeA = a.time.replace(':', '');
      const timeB = b.time.replace(':', '');
      return timeA - timeB;
    });
  };

  // Filter activities based on current tab
  const filterActivitiesByTab = (activities) => {
    if (activeTab === "All") {
      return activities;
    } else if (activeTab === "Dad") {
      return activities.filter(activity => activity.parent === "dad");
    } else if (activeTab === "Mom") {
      return activities.filter(activity => activity.parent === "mom");
    } else if (activeTab === "None") {
      return activities.filter(activity => activity.parent === "none");
    }
    return activities;
  };

  // Handle activity editing
  const handleEdit = (dayIndex, activity) => {
    setEditing({
      isNew: false,
      dayIndex,
      activity: { ...activity }
    });

    // Log the edit action
    if (user) {
      logModification({
        username: user.username,
        role: user.role,
        action: 'edit_start',
        details: `Started editing "${activity.description}" on ${days[dayIndex].name}`,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Save edited activity
  const saveEdit = async () => {
    if (!editing) return;

    const { isNew, dayIndex, activity } = editing;

    // Create a copy of the activities
    const newDays = [...days];

    if (isNew) {
      // Add new activity
      const newId = Math.max(0, ...days.flatMap(day => day.activities.map(a => a.id))) + 1;
      newDays[dayIndex].activities.push({ ...activity, id: newId });

      // Add to changes
      setChanges([
        ...changes,
        `Added "${activity.description}" on ${newDays[dayIndex].name}`
      ]);

      // Log the addition
      if (user) {
        await logModification({
          username: user.username,
          role: user.role,
          action: 'add',
          details: `Added "${activity.description}" on ${newDays[dayIndex].name}`,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      // Find and update existing activity
      const activityIndex = newDays[dayIndex].activities.findIndex(a => a.id === activity.id);
      if (activityIndex !== -1) {
        newDays[dayIndex].activities[activityIndex] = activity;

        // Add to changes
        setChanges([
          ...changes,
          `Edited "${activity.description}" on ${newDays[dayIndex].name}`
        ]);

        // Log the edit
        if (user) {
          await logModification({
            username: user.username,
            role: user.role,
            action: 'edit',
            details: `Edited "${activity.description}" on ${newDays[dayIndex].name}`,
            timestamp: new Date().toISOString()
          });
        }
      }
    }

    // Update activities
    setDays(newDays);

    // Clear editing activity
    setEditing(null);

    // Save to database
    await saveActivities(selectedWeekId, newDays);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing(null);
  };

  // Delete activity
  const deleteActivity = async (dayIndex, activityId) => {
    // Confirm deletion
    const confirmed = window.confirm('Are you sure you want to delete this activity?');
    if (!confirmed) return;

    // Find the activity to delete
    const activity = days[dayIndex].activities.find(a => a.id === activityId);
    if (!activity) return;

    // Create a copy of the activities
    const newDays = [...days];

    // Remove the activity
    newDays[dayIndex].activities = newDays[dayIndex].activities.filter(a => a.id !== activityId);

    // Add to changes
    setChanges([
      ...changes,
      `Deleted "${activity.description}" on ${newDays[dayIndex].name}`
    ]);

    // Log the deletion
    if (user) {
      await logModification({
        username: user.username,
        role: user.role,
        action: 'delete',
        details: `Deleted "${activity.description}" on ${newDays[dayIndex].name}`,
        timestamp: new Date().toISOString()
      });
    }

    // Update activities
    setDays(newDays);

    // Save to database
    await saveActivities(selectedWeekId, newDays);
  };

  // Start adding a new activity
  const startAddActivity = (dayIndex) => {
    setEditing({
      isNew: true,
      dayIndex,
      activity: {
        id: null,
        time: "08:00",
        location: "",
        description: "",
        parent: user?.role || "none",
        icon: "Calendar",
        iconColor: "text-blue-500"
      }
    });
  };

  // Generate image of the schedule
  const generateImage = async () => {
    // In a real app, this would use html2canvas to convert the schedule to an image
    alert("In a real app, this would use html2canvas to convert the schedule to a PNG image. You need to add this library to implement this feature.");
  };

  // Save all changes to database
  const saveAllChanges = async () => {
    if (changes.length === 0) return;

    setSaveStatus("Saving...");

    try {
      // Save activities to database
      const result = await saveActivities(selectedWeekId, days);

      if (result.success) {
        // Log the save
        if (user) {
          await logModification({
            username: user.username,
            role: user.role,
            action: 'save',
            details: `Saved ${changes.length} changes to week ${selectedWeekId}`,
            timestamp: new Date().toISOString()
          });
        }

        // Also save to localStorage for compatibility
        const dataToSave = {
          days: days,
          childName: childName,
          colorScheme: selectedColorScheme
        };
        localStorage.setItem('familySchedule', JSON.stringify(dataToSave));

        // Clear changes
        setChanges([]);

        // Show success message
        setSaveStatus("Saved successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveStatus("");
        }, 3000);
      } else {
        setSaveStatus("Save failed. Please try again.");
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      setSaveStatus("Save failed. Please try again.");
    }
  };

  // Reset to default data
  const resetToDefault = async () => {
    if (confirm("Are you sure you want to reset all data to default? This action cannot be undone.")) {
      try {
        // Reset activities
        setDays(defaultActivities);
        setChildName("Child");
        setSelectedColorScheme(0);

        // Save to database
        await saveActivities(selectedWeekId, defaultActivities);

        // Also remove from localStorage
        localStorage.removeItem('familySchedule');

        // Log the reset
        if (user) {
          await logModification({
            username: user.username,
            role: user.role,
            action: 'reset',
            details: `Reset all data to default for week ${selectedWeekId}`,
            timestamp: new Date().toISOString()
          });
        }

        // Show success message
        setSaveStatus("Reset to default values");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSaveStatus("");
        }, 3000);
      } catch (error) {
        console.error('Error resetting data:', error);
        setSaveStatus("Reset failed. Please try again.");
      }
    }
  };

  // Handle sending email notification
  const handleSendNotification = async ({ recipients, message }) => {
    if (!user || changes.length === 0) return;

    try {
      // Create notification content
      const notification = createChangeNotification({
        changes,
        user,
        weekId: selectedWeekId,
        customMessage: message
      });

      // Send notification
      const result = await sendEmailNotification({
        recipients,
        subject: notification.subject,
        message: notification.message,
        user
      });

      if (result.success) {
        // Log the notification
        await logModification({
          username: user.username,
          role: user.role,
          action: 'notification',
          details: `Sent notification to ${recipients}`,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  // Handle week change
  const handleWeekChange = (weekId) => {
    // If there are unsaved changes, confirm before changing weeks
    if (changes.length > 0) {
      const confirmed = window.confirm('You have unsaved changes. Do you want to discard them?');
      if (!confirmed) return;

      // Clear changes
      setChanges([]);
    }

    setSelectedWeekId(weekId);
  };

  // Handle password change
  const handlePasswordChange = async ({ currentPassword, newPassword }) => {
    if (!user) return;

    try {
      const result = await changePassword(user.username, currentPassword, newPassword);
      if (result.success) {
        // Log the password change
        await logModification({
          username: user.username,
          role: user.role,
          action: 'password_change',
          details: 'Password changed',
          timestamp: new Date().toISOString()
        });

        // Close password change form
        setIsPasswordChangeOpen(false);
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  // Change color scheme
  const changeColorScheme = (index) => {
    setSelectedColorScheme(index);

    // Add to changes
    setChanges([
      ...changes,
      `Changed color scheme to ${colorSchemes[index].name}`
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-screen-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-purple-700">
                {childName}的每周活动安排
              </h1>
              <div className="relative">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  placeholder="输入孩子名字"
                />
                <User className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              {saveStatus && (
                <span className="text-sm text-green-600 animate-pulse">
                  {saveStatus}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={saveAllChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
              >
                <Save className="w-5 h-5 mr-2" />
                Save
              </button>
              <button
                onClick={resetToDefault}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Reset
              </button>
              <button
                onClick={generateImage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md"
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Tab Switching */}
          <div className="mb-4 flex gap-4 border-b border-gray-200">
            {tabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium text-sm relative ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mb-6 flex gap-4 items-center">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${parentColors["dad"]} mr-2`}></div>
              <span className="text-sm">Dad's responsibility</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${parentColors["mom"]} mr-2`}></div>
              <span className="text-sm">Mom's responsibility</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${parentColors["none"]} mr-2`}></div>
              <span className="text-sm">Unassigned</span>
            </div>
            <div className="ml-auto text-xs text-gray-500">
              * All changes on this page are automatically saved to the database
            </div>
          </div>

          {/* Weekly Schedule */}
          <div ref={scheduleRef} className="bg-white p-2 rounded-lg">
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`rounded-lg p-4 ${colorSchemes[selectedColorScheme].colors[dayIndex]} min-h-[300px]`}
                >
                  <h2 className="text-xl font-bold mb-3 text-center">{day.name}</h2>
                  <div className="space-y-3">
                    {sortActivitiesByTime(filterActivitiesByTab(day.activities)).map((activity) => (
                      <div
                        key={activity.id}
                        className={`rounded-lg p-3 shadow-sm relative group ${parentColors[activity.parent]}`}
                      >
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(dayIndex, activity)}
                            className="text-blue-500 hover:text-blue-700 p-1 bg-white rounded-full shadow-sm"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteActivity(dayIndex, activity.id)}
                            className="text-red-500 hover:text-red-700 p-1 bg-white rounded-full shadow-sm"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center mb-1">
                          {React.createElement(getIconComponent(activity.icon), {
                            className: `${activity.iconColor} w-5 h-5 mr-2`
                          })}
                          <span className="font-medium">{activity.description}</span>
                        </div>

                        <div className="text-sm text-gray-600 flex items-center mb-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.time}
                        </div>

                        <div className="text-sm text-gray-600 flex items-center mb-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.location}
                        </div>

                        <div className="text-sm font-medium">
                          {activity.parent === 'dad' ? 'Dad' : activity.parent === 'mom' ? 'Mom' : 'Unassigned'}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => startAddActivity(dayIndex)}
                      className="w-full py-2 bg-white bg-opacity-70 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 text-gray-500 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Scheme Selection */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Select Color Scheme:</h3>
            <div className="flex gap-4 flex-wrap">
              {colorSchemes.map((scheme, index) => (
                <button
                  key={index}
                  onClick={() => changeColorScheme(index)}
                  className={`px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all ${
                    selectedColorScheme === index
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "border border-gray-200"
                  }`}
                >
                  <div className="flex gap-1 mb-1 justify-center">
                    {scheme.colors.map((color, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-full ${color}`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">{scheme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              {editing.activity.id ? "Edit Activity" : "Add Activity"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={editing.activity.description}
                  onChange={(e) => setEditing({
                    ...editing,
                    activity: { ...editing.activity, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Soccer Practice"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={editing.activity.time}
                  onChange={(e) => setEditing({
                    ...editing,
                    activity: { ...editing.activity, time: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editing.activity.location}
                  onChange={(e) => setEditing({
                    ...editing,
                    activity: { ...editing.activity, location: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Soccer Field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsible
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      editing.activity.parent === "dad"
                        ? "bg-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setEditing({
                      ...editing,
                      activity: { ...editing.activity, parent: "dad" }
                    })}
                  >
                    Dad
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      editing.activity.parent === "mom"
                        ? "bg-pink-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setEditing({
                      ...editing,
                      activity: { ...editing.activity, parent: "mom" }
                    })}
                  >
                    Mom
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      editing.activity.parent === "none"
                        ? "bg-gray-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setEditing({
                      ...editing,
                      activity: { ...editing.activity, parent: "none" }
                    })}
                  >
                    None
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  图标
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowIconSelector(!showIconSelector)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400"
                  >
                    <div className="flex items-center">
                      {React.createElement(getIconComponent(editing.activity.icon), {
                        className: `${editing.activity.iconColor} w-5 h-5 mr-2`
                      })}
                      <span>{editing.activity.icon}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showIconSelector && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <div className="p-2 grid grid-cols-4 gap-2">
                        {iconOptions.map((option) => (
                          <button
                            key={option.name}
                            className={`p-2 rounded-lg flex flex-col items-center ${
                              editing.activity.icon === option.name ? "bg-blue-100 shadow-sm" : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              setEditing({
                                ...editing,
                                activity: { ...editing.activity, icon: option.name }
                              });
                              setShowIconSelector(false);
                            }}
                          >
                            {React.createElement(option.component, {
                              className: `${editing.activity.iconColor} w-6 h-6 mb-1`
                            })}
                            <span className="text-xs">{option.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  图标颜色
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[
                    "text-red-500", "text-orange-500", "text-amber-500",
                    "text-yellow-500", "text-lime-500", "text-green-500",
                    "text-emerald-500", "text-teal-500", "text-cyan-500",
                    "text-blue-500", "text-indigo-500", "text-violet-500",
                    "text-purple-500", "text-fuchsia-500", "text-pink-500",
                    "text-rose-500", "text-gray-500", "text-amber-700"
                  ].map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full ${
                        color.replace("text", "bg")
                      } ${
                        editing.activity.iconColor === color ? "ring-2 ring-offset-2 ring-blue-500" : ""
                      } hover:opacity-90 transition-opacity`}
                      onClick={() => setEditing({
                        ...editing,
                        activity: { ...editing.activity, iconColor: color }
                      })}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;