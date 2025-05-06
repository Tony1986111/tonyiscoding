import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const LatestArticles = ({ posts }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'LatestArticles');

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Return YYYY-MM-DD format
  };

  return (
    <div className={`col-span-6 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center mb-3">
        <FileText className="h-5 w-5 text-cyan-400 mr-2" />
        <h2 className={`text-xl font-bold ${styles.title}`}>Latest Articles</h2>
      </div>
      <div className="space-y-3">
        {posts && posts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={index}>
            <div className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-xl p-3 flex transition-colors`}>
              <div className="mr-3">
                <Calendar className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className={`${styles.title} font-medium`}>{post.title}</h3>
                <p className={`${styles.subtext} text-xs mt-1`}>{post.date ? formatDate(post.date) : 'No date'}</p>
              </div>
            </div>
          </Link>
        ))}
        {(!posts || posts.length === 0) && (
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-3 flex`}>
            <div className="mr-3">
              <Calendar className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h3 className={`${styles.title} font-medium`}>No Articles Yet</h3>
              <p className={`${styles.subtext} text-xs mt-1`}>Coming Soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
