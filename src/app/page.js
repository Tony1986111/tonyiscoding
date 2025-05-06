'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import DarkTechLayout from '@/components/DarkTechLayout';
import { clearColorMap } from '@/utils/randomColors';
import BusinessCard from '@/components/ui/BusinessCard';
import TechOverview from '@/components/ui/TechOverview';
import ClientProjects from '@/components/ui/ClientProjects';
import TechStack from '@/components/ui/TechStack';
import AboutMe from '@/components/ui/AboutMe';
import LatestArticles from '@/components/ui/LatestArticles';
import Contact from '@/components/ui/Contact';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import Navigation from '@/components/ui/Navigation';
import FooterInfo from '@/components/ui/FooterInfo';
import LearningJourney from '@/components/ui/LearningJourney';

import { getAllSkills } from '@/data/skills';
import { getPersonalInfo } from '@/data/personal';

// Get data
const skills = getAllSkills();
const personalInfo = getPersonalInfo();
const journey = personalInfo.journey;

// Project data (using original project data)
const featuredProjects = [
  {
    title: 'Personal Website',
    description: 'A personal website built with Next.js and React to showcase my projects and blog',
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    icon: 'Globe',
    status: 'In Progress'
  },
  {
    title: 'Todo App',
    description: 'A simple todo application using React and localStorage for data storage',
    tags: ['React', 'CSS', 'LocalStorage'],
    icon: 'Code',
    status: 'Completed'
  },
  {
    title: 'Learning Projects',
    description: 'Collection of small projects from my learning journey',
    tags: ['JavaScript', 'HTML/CSS', 'React'],
    icon: 'Layers',
    status: 'Ongoing'
  }
];

// Sample article data
const featuredPosts = [
  {
    title: 'My Coding Journey',
    date: '2024-04-15',
    slug: 'my-coding-journey'
  },
  {
    title: 'React Basics Summary',
    date: '2024-03-22',
    slug: 'react-basics'
  },
  {
    title: 'How to Build a Personal Website with Next.js',
    date: '2024-02-10',
    slug: 'nextjs-personal-website'
  }
];

export default function Home() {
  const { darkMode } = useTheme();

  // 每次页面加载时清除颜色映射，以便重新随机选择颜色
  useEffect(() => {
    clearColorMap();
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} pt-4 transition-colors duration-300`}>
      <main>
        <DarkTechLayout>
          {/* Navigation */}
          <Navigation />

          {/* Business Card */}
          <BusinessCard
            name={personalInfo.name}
            title={personalInfo.title}
            email={personalInfo.email}
            link={personalInfo.website}
          />

          {/* Tech Overview */}
          <TechOverview skills={skills.filter(s => s.featured)} />

          {/* Client Projects */}
          <ClientProjects
            completed={personalInfo.stats.completedProjects}
            satisfaction={personalInfo.stats.clientSatisfaction}
          />

          {/* Frontend Tech Stack */}
          <TechStack
            title="Frontend"
            icon="Code"
            skills={skills.filter(s => s.category === 'frontend').slice(0, 6)}
            gradientFrom="purple-900"
            gradientTo="blue-900"
          />

          {/* Backend Tech Stack */}
          <TechStack
            title="Backend"
            icon="Server"
            skills={skills.filter(s => s.category === 'backend').slice(0, 6)}
            gradientFrom="blue-900"
            gradientTo="cyan-900"
          />

          {/* Design Tech Stack */}
          <TechStack
            title="Design"
            icon="PenTool"
            skills={skills.filter(s => s.category === 'design').slice(0, 6)}
            gradientFrom="green-900"
            gradientTo="teal-900"
          />

          {/* DevOps Tech Stack */}
          <TechStack
            title="DevOps"
            icon="Globe"
            skills={skills.filter(s => s.category === 'devops').slice(0, 6)}
            gradientFrom="yellow-900"
            gradientTo="orange-900"
          />

          {/* Learning Journey */}
          <LearningJourney journey={journey} />

          {/* Project Showcase */}
          <ProjectShowcase projects={featuredProjects} />

          {/* About Me */}
          <AboutMe about={personalInfo.about} strengths={personalInfo.strengths} />

          {/* Latest Articles */}
          <LatestArticles posts={featuredPosts} />

          {/* Contact */}
          <Contact email={personalInfo.email} github={personalInfo.github} />

          {/* Footer Info */}
          <FooterInfo personalInfo={personalInfo} />
        </DarkTechLayout>
      </main>
    </div>
  );
}
