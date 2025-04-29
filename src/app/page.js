'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { getAllSkills } from '@/data/skills';
import { getPersonalInfo } from '@/data/personal';

// Get data
const skills = getAllSkills();
const personalInfo = getPersonalInfo();
const journey = personalInfo.journey;

// Sample projects (in a real app, this would come from the data files)
// We're using sample data here because the file-based data requires server components
const projects = [
  {
    title: 'Personal Website',
    description: 'A personal website built with Next.js and React to showcase my projects and blog.',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    emoji: '🌐',
    status: 'In Progress'
  },
  {
    title: 'Todo App',
    description: 'A simple todo application using React and localStorage for data storage.',
    tags: ['React', 'CSS', 'LocalStorage'],
    emoji: '📝',
    status: 'Completed'
  }
];

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <main>
        <Hero />

        {/* Learning Journey Section */}
        <section id="journey" className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-divider">
              <h2 className="section-title font-heading">My Learning Journey</h2>
            </div>

            <div className={`relative border-l-2 ${darkMode ? 'border-gray-800' : 'border-gray-200'} pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-8 sm:space-y-12`}>
              {journey.map((item, index) => (
                <div key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className={`absolute -left-4 w-7 h-7 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center shadow-md -top-2`}>
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} `} ></div>
                  </div>
                  <div className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} pl-8 -mt-3`}>{item.period}</div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base opacity-80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-divider">
              <h2 className="section-title font-heading">Skills I'm Learning</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {skills.map((skill, index) => (
                <div key={index} className={`p-3 sm:p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} transition shadow-sm`}>
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">{skill.icon}</span>
                    <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                  </div>
                  <div className={`inline-block px-2 py-1 text-xs rounded-full ${
                    skill.level === 'Expert'
                      ? (darkMode ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800')
                      : skill.level === 'Intermediate'
                        ? (darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800')
                        : skill.level === 'Beginner'
                          ? (darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-100 text-yellow-800')
                          : (darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-100 text-purple-800')
                  }`}>
                    {skill.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-divider">
              <h2 className="section-title font-heading">My Projects</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>

            <div className="mt-12 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-3">Looking to Learn and Collaborate</h3>
              <p className="mb-4 text-sm sm:text-base">I'm at the beginning of my development journey and eager to learn through real projects. If you're looking for a motivated beginner, I'd love to collaborate!</p>
              <Link href="/contact" className="btn bg-white text-blue-700 hover:bg-gray-100">
                Contact Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
