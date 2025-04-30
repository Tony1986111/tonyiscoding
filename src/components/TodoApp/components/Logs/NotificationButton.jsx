import React, { useState } from 'react';
import { Mail, X, Check } from 'lucide-react';

/**
 * Email notification button component
 * Allows users to send email notifications about schedule changes
 */
const NotificationButton = ({ onSendNotification }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Open notification modal
  const openModal = () => {
    setIsModalOpen(true);
    setSuccess(false);
    setError('');
  };
  
  // Close notification modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!recipients) {
      setError('Please enter at least one recipient email');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would send an actual email
      // For now, we'll just simulate it
      await mockSendNotification(recipients, message);
      
      // Notify parent component
      if (onSendNotification) {
        onSendNotification({
          recipients,
          message,
          timestamp: new Date().toISOString()
        });
      }
      
      setSuccess(true);
      
      // Reset form
      setRecipients('');
      setMessage('');
      
      // Close modal after a delay
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('Failed to send notification. Please try again.');
      console.error('Notification error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock send notification function
  const mockSendNotification = async (recipients, message) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, always succeed
    return true;
  };
  
  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        title="Send email notification"
      >
        <Mail className="w-5 h-5 mr-2" />
        Notify
      </button>
      
      {/* Notification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-700">
                Send Email Notification
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Notification sent successfully!
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="recipients">
                  Recipients (comma separated)
                </label>
                <input
                  id="recipients"
                  type="text"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., dad@example.com, mom@example.com"
                  disabled={isLoading || success}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Add a custom message to the notification"
                  rows="4"
                  disabled={isLoading || success}
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-medium text-white ${
                    isLoading 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : success
                        ? 'bg-green-500'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                  } transition-colors shadow-md flex items-center`}
                  disabled={isLoading || success}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : success ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Notification
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationButton;
