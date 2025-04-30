import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';

/**
 * Login form component for TodoApp authentication
 * Supports username/password login with parent role selection
 */
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('dad'); // Default role is 'dad'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Pass credentials to parent component for authentication
      onLogin({
        username,
        password,
        role,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
        Family Schedule Login
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            I am
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="dad"
                checked={role === 'dad'}
                onChange={() => setRole('dad')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                disabled={isLoading}
              />
              <span className="ml-2 text-gray-700">Dad</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="mom"
                checked={role === 'mom'}
                onChange={() => setRole('mom')}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                disabled={isLoading}
              />
              <span className="ml-2 text-gray-700">Mom</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors shadow-md`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
