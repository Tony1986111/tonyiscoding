'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Edit, Trash2 } from 'lucide-react';

export default function BlogPost({ params }) {
  const { slug } = params;
  const { darkMode } = useTheme();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load the post. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  // Function to handle edit button click
  const handleEdit = () => {
    router.push(`/blog/edit/${slug}`);
  };

  // Function to handle delete button click
  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  // Function to confirm delete
  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Redirect to blog list
      router.push('/blog');
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete the post. Please try again.');
    }
  };

  // Function to cancel delete
  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  // Function to render markdown content
  const renderMarkdown = (content) => {
    if (!content) return '';

    // This is a simple implementation - in a real app, you'd use a proper markdown renderer
    const html = content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');

    return html;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <main className="w-full py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-10">
              <p>Loading post...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : post ? (
            <article>
              <header className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-4xl font-bold">{post.title}</h1>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEdit}
                      className={`p-2 rounded-full ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } flex items-center justify-center`}
                      title="Edit post"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className={`p-2 rounded-full ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      } flex items-center justify-center`}
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? 'bg-gray-800' : 'bg-gray-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
              </div>
            </article>
          ) : (
            <div className="text-center py-10">
              <p>Post not found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Delete confirmation modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md mx-4`}>
            <h3 className="text-xl font-bold mb-4">Delete Post</h3>
            <p className="mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
