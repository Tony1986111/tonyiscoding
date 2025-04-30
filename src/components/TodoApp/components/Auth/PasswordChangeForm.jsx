import React, { useState } from 'react';
import { Lock } from 'lucide-react';

/**
 * Password change form component
 * Allows users to update their password
 */
const PasswordChangeForm = ({ onClose, onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, this would be an API call to change the password
      // For now, we'll use a simple mock function
      const success = await mockPasswordChange(currentPassword, newPassword);
      
      if (success) {
        setSuccess('Password changed successfully!');
        
        // Notify parent component
        if (onPasswordChange) {
          onPasswordChange({
            timestamp: new Date().toISOString()
          });
        }
        
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // Close modal after a delay
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        setError('Current password is incorrect');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Password change error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock password change function (to be replaced with real implementation)
  const mockPasswordChange = async (currentPassword, newPassword) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, accept any non-empty current password
    return currentPassword.length > 0;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold text-purple-700 mb-4">
        Change Password
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter current password"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="newPassword">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter new password"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Confirm new password"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg font-medium text-white ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors shadow-md`}
            disabled={isLoading}
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
