// Common theme styles for UI components
import { getOrCreateRandomColor } from '@/utils/randomColors';

// 浅色模式下的背景色选项
const lightModeColors = [
  'bg-purple-100', // 浅紫色
  'bg-blue-100',   // 浅蓝色
  'bg-green-100',  // 浅绿色
  'bg-yellow-100', // 浅黄色
  'bg-pink-100',   // 浅粉色
  'bg-indigo-100', // 浅靛蓝色
  'bg-teal-100',   // 浅蓝绿色
  'bg-orange-100', // 浅橙色
];

// 获取随机背景色
export const getRandomLightBgColor = () => {
  const randomIndex = Math.floor(Math.random() * lightModeColors.length);
  return lightModeColors[randomIndex];
};

export const getCardStyles = (darkMode, componentId = null) => {
  // 如果是深色模式，使用默认深色样式
  if (darkMode) {
    return {
      container: 'bg-gray-800 transition-colors duration-300',
      title: 'text-white',
      text: 'text-gray-300',
      subtext: 'text-gray-400',
      hover: 'hover:bg-gray-700',
      border: 'border-gray-700',
      item: 'bg-gray-700',
    };
  }

  // 浅色模式下使用随机背景色
  const randomBgColor = componentId ? getOrCreateRandomColor(componentId) : 'bg-white';

  return {
    container: `${randomBgColor} transition-colors duration-300`,
    title: 'text-gray-800',
    text: 'text-gray-600',
    subtext: 'text-gray-500',
    hover: 'hover:bg-gray-100',
    border: 'border-gray-200',
    item: 'bg-white/60',
  };
};
