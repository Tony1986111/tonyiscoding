'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function ProjectCard({ project }) {
  const { darkMode } = useTheme();

  return (
    <div className="card group">
      <div className={`h-40 sm:h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center overflow-hidden`}>
        <span className="text-4xl sm:text-5xl transform transition-transform group-hover:scale-110">{project.emoji}</span>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
          <h3 className="font-heading text-lg sm:text-xl font-bold">{project.title}</h3>
          <div className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
            {project.status}
          </div>
        </div>
        <p className={`mb-4 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {tag}
            </span>
          ))}
        </div>
        {project.link && (
          <div className="mt-4">
            <Link href={project.link} className="btn btn-primary text-sm">
              View Project
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
