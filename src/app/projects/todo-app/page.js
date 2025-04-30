'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TodoApp from '@/components/TodoApp';

export default function TodoAppPage() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Todo App</h1>
        <p className="mb-8">
          A simple yet functional todo application built with React that uses localStorage for data persistence.
          Add, edit, and delete tasks, mark them as complete, and filter by status.
        </p>
        
        <TodoApp />
      </main>

      <Footer />
    </div>
  );
}
