'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, Edit, Trash2 } from 'lucide-react';

export default function BlogPostCard({ post, onEdit, onDelete }) {
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
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Link
            href={`/blog/${post.slug || post.id}`}
            className={`p-2 rounded-full ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white flex items-center justify-center`}
            title="Read More"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>

          {onEdit && (
            <button
              onClick={() => onEdit(post.id || post.slug)}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } flex items-center justify-center`}
              title="Edit post"
            >
              <Edit className="w-4 h-4 text-blue-500" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(post)}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } flex items-center justify-center`}
              title="Delete post"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
