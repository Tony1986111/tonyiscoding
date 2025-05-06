'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <main className="full-width-container px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Contact Me</h1>

        <div className="md:flex md:gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Other Contact Methods</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <a href="mailto:alei198634@gmail.com" className="text-blue-500 hover:underline">
                    alei198634@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <Github size={20} />
                </div>
                <div>
                  <div className="font-medium">GitHub</div>
                  <a href="https://github.com/Tony1986111" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    github.com/Tony1986111
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="font-medium">LinkedIn</div>
                  <a href="https://www.linkedin.com/in/delai-ye-2551b092/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    linkedin.com/in/delai-ye-2551b092
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
                  <Twitter size={20} />
                </div>
                <div>
                  <div className="font-medium">Twitter</div>
                  <a href="https://twitter.com/alei198634" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    twitter.com/alei198634
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
