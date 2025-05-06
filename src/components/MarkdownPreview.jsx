'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function MarkdownPreview({ markdown }) {
  const { darkMode } = useTheme();
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function renderMarkdown() {
      if (!markdown) {
        setHtml('');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/markdown', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ markdown }),
        });

        if (!response.ok) {
          throw new Error('Failed to render markdown');
        }

        const data = await response.json();
        setHtml(data.html);
      } catch (error) {
        console.error('Error rendering markdown:', error);
      } finally {
        setLoading(false);
      }
    }

    renderMarkdown();
  }, [markdown]);

  if (loading) {
    return <div className="text-center py-4">Loading preview...</div>;
  }

  if (!html) {
    return <div className="text-center py-4">No content to preview</div>;
  }

  return (
    <div 
      className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
