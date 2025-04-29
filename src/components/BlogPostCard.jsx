'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function BlogPostCard({ post }) {
  const { darkMode } = useTheme();

  return (
    <div className="card group">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
          <h3 className="font-heading text-lg sm:text-xl font-bold">{post.title}</h3>
          <div className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
            {post.date}
          </div>
        </div>
        <p className={`mb-4 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.slug}`} className="btn btn-primary text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
}
