import React from 'react';
import { Code, Server, PenTool, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCardStyles, getRandomLightBgColor } from './ThemeStyles';

const TechStack = ({ title, icon, skills, gradientFrom, gradientTo }) => {
  const { darkMode } = useTheme();
  const componentId = `TechStack-${title}`; // 使用标题作为唯一标识符
  const styles = getCardStyles(darkMode, componentId);

  const getIcon = (iconName) => {
    const iconColor = darkMode ? "text-white" : "text-gray-800";
    switch (iconName) {
      case 'Code':
        return <Code className={`h-5 w-5 ${iconColor} mr-2`} />;
      case 'Server':
        return <Server className={`h-5 w-5 ${iconColor} mr-2`} />;
      case 'PenTool':
        return <PenTool className={`h-5 w-5 ${iconColor} mr-2`} />;
      case 'Globe':
        return <Globe className={`h-5 w-5 ${iconColor} mr-2`} />;
      default:
        return <Code className={`h-5 w-5 ${iconColor} mr-2`} />;
    }
  };

  // 根据传入的gradientFrom和gradientTo参数返回相应的类名
  const getGradientClasses = () => {
    if (darkMode) {
      // 深色模式下的渐变
      if (gradientFrom === 'purple-900' && gradientTo === 'blue-900') {
        return 'bg-gradient-to-br from-purple-900 to-blue-900';
      } else if (gradientFrom === 'blue-900' && gradientTo === 'cyan-900') {
        return 'bg-gradient-to-br from-blue-900 to-cyan-900';
      } else if (gradientFrom === 'green-900' && gradientTo === 'teal-900') {
        return 'bg-gradient-to-br from-green-900 to-teal-900';
      } else if (gradientFrom === 'yellow-900' && gradientTo === 'orange-900') {
        return 'bg-gradient-to-br from-yellow-900 to-orange-900';
      } else {
        return 'bg-gradient-to-br from-purple-900 to-blue-900'; // 默认渐变
      }
    } else {
      // 浅色模式下使用随机背景色
      return styles.container;
    }
  };

  return (
    <div className={`col-span-3 ${getGradientClasses()} rounded-3xl p-5`}>
      <div className="flex items-center mb-3">
        {getIcon(icon)}
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {skills.map((skill, index) => (
          <div key={index} className={`${darkMode ? 'bg-white/10' : 'bg-gray-800/10'} p-1 rounded-lg flex items-center justify-center`}>
            <span className={`text-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
