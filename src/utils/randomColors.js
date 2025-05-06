// 随机背景色工具函数
// 这些颜色基于您提供的截图中的颜色

// 浅色模式下的背景色选项
export const lightModeColors = [
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

// 为组件ID存储随机颜色的映射
const colorMap = new Map();

// 获取或创建组件的随机背景色
export const getOrCreateRandomColor = (componentId) => {
  if (!colorMap.has(componentId)) {
    colorMap.set(componentId, getRandomLightBgColor());
  }
  return colorMap.get(componentId);
};

// 清除所有存储的颜色（用于刷新页面时重置）
export const clearColorMap = () => {
  colorMap.clear();
};
