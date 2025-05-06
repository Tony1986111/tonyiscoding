import React from 'react';
import { ArrowRight, Globe, Code, Layers } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles } from './ThemeStyles';

const ProjectShowcase = ({ projects }) => {
  const { darkMode } = useTheme();
  const styles = getCardStyles(darkMode, 'ProjectShowcase');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="h-4 w-4 text-blue-400" />;
      case 'Code':
        return <Code className="h-4 w-4 text-purple-400" />;
      case 'Layers':
        return <Layers className="h-4 w-4 text-green-400" />;
      default:
        return <Code className="h-4 w-4 text-blue-400" />;
    }
  };

  const getIconBgColor = (iconName) => {
    switch (iconName) {
      case 'Globe':
        return 'bg-blue-400/20';
      case 'Code':
        return 'bg-purple-400/20';
      case 'Layers':
        return 'bg-green-400/20';
      default:
        return 'bg-blue-400/20';
    }
  };

  const getTagBgColor = (tag) => {
    if (darkMode) {
      if (tag.includes('React')) return 'bg-blue-900/50 text-blue-400';
      if (tag.includes('Vue')) return 'bg-purple-900/50 text-purple-400';
      if (tag.includes('MERN')) return 'bg-green-900/50 text-green-400';
      return 'bg-blue-900/50 text-blue-400';
    } else {
      if (tag.includes('React')) return 'bg-blue-100 text-blue-600';
      if (tag.includes('Vue')) return 'bg-purple-100 text-purple-600';
      if (tag.includes('MERN')) return 'bg-green-100 text-green-600';
      return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className={`col-span-8 ${styles.container} rounded-3xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${styles.title}`}>Project Showcase</h2>
        <Link href="/projects" className="text-purple-400 flex items-center text-sm">
          View All Projects
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {projects.map((project, index) => (
          <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-4`}>
            <div className={`h-8 w-8 ${getIconBgColor(project.icon || 'Code')} rounded-lg flex items-center justify-center mb-3`}>
              {getIcon(project.icon || 'Code')}
            </div>
            <h3 className={`${styles.title} font-medium`}>{project.title}</h3>
            <p className={`${styles.subtext} text-xs mt-1`}>{project.description}</p>
            <div className="flex mt-2 flex-wrap">
              {project.tags && project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className={`px-2 py-1 ${getTagBgColor(tag)} text-xs rounded-full mr-1 mb-1`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
