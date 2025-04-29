'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { getPersonalInfo } from '@/data/personal';

export default function Navbar() {
  const { darkMode } = useTheme();
  const personalInfo = getPersonalInfo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className={`fixed w-full z-10 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">{personalInfo.name.split(' ')[0].toUpperCase()}.TECH</Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-500 transition">Home</Link>
            <Link href="/projects" className="hover:text-blue-500 transition">Projects</Link>
            <Link href="/blog" className="hover:text-blue-500 transition">Blog</Link>
            <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-gray-800 transition">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Home</Link>
            <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Projects</Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Blog</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
