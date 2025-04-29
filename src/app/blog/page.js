'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/BlogPostCard';

// Sample blog post data
const posts = [
  {
    title: 'My Programming Journey',
    slug: 'my-programming-journey',
    date: '2023-12-01',
    excerpt: 'Sharing my experience and insights from learning programming from scratch.',
    tags: ['Learning', 'Programming', 'Personal Experience']
  },
  {
    title: 'React Basics',
    slug: 'react-basics',
    date: '2024-01-15',
    excerpt: 'Introduction to basic concepts and usage of React.',
    tags: ['React', 'Frontend', 'Tutorial']
  },
  {
    title: 'Next.js and Static Site Generation',
    slug: 'nextjs-and-ssg',
    date: '2024-02-20',
    excerpt: 'Exploring Next.js static site generation features and its advantages.',
    tags: ['Next.js', 'SSG', 'Performance Optimization']
  },
  {
    title: 'Tailwind CSS Quick Start',
    slug: 'tailwind-css-quickstart',
    date: '2024-03-10',
    excerpt: 'How to quickly build beautiful user interfaces with Tailwind CSS.',
    tags: ['CSS', 'Tailwind', 'Design']
  }
];

export default function Blog() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">My Blog</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
