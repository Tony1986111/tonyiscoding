'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

// Sample project data
const projects = [
  {
    title: 'Personal Website',
    description: 'A personal website built with Next.js and React to showcase my projects and blog.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    emoji: '🌐',
    status: 'In Progress',
    link: '/projects/personal-website'
  },
  {
    title: 'Family Schedule App',
    description: 'A family schedule management application with parent role distinction and database storage.',
    tags: ['React', 'MySQL', 'Next.js'],
    emoji: '📝',
    status: 'Completed',
    link: '/projects/todo-app'
  },
  {
    title: 'Weather App',
    description: 'A weather forecast application built with React and Weather API.',
    tags: ['React', 'API', 'CSS'],
    emoji: '🌤️',
    status: 'Planned',
    link: '/projects/weather-app'
  },
  {
    title: 'Blog System',
    description: 'A simple blog system built with Next.js and Markdown.',
    tags: ['Next.js', 'Markdown', 'Tailwind CSS'],
    emoji: '📰',
    status: 'In Progress',
    link: '/projects/blog-system'
  }
];

export default function Projects() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <main className="w-full py-16">
        <div className="full-width-container px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">My Projects</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
