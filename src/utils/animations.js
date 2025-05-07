import { gsap } from 'gsap';

/**
 * 入场动画序列 - 为主页元素创建错开的入场动画
 * 这个版本不依赖于特定的类名，而是直接选择组件元素
 * @param {Object} options - 动画配置选项
 * @param {number} options.staggerDelay - 错开动画的延迟时间（秒）
 */
export const playEntranceAnimation = ({ staggerDelay = 0.1 } = {}) => {
  // 创建主时间线
  const mainTimeline = gsap.timeline({
    defaults: {
      ease: 'power2.out',
      duration: 0.8
    }
  });

  // 导航从上方滑入 (第一个元素)
  const navigation = document.querySelector('.col-span-12:first-child');
  if (navigation) {
    mainTimeline.fromTo(
      navigation,
      {
        y: -50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6
      },
      0
    );
  }

  // 技能卡片从左侧滑入 (TechOverview, TechStack 组件)
  const skillElements = document.querySelectorAll('.col-span-4, .col-span-3');
  if (skillElements.length > 0) {
    mainTimeline.fromTo(
      skillElements,
      {
        x: -50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        stagger: staggerDelay
      },
      0.2
    );
  }

  // 项目展示从右侧滑入 (ProjectShowcase 组件)
  const projectElements = document.querySelectorAll('.col-span-8');
  if (projectElements.length > 0) {
    mainTimeline.fromTo(
      projectElements,
      {
        x: 50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        stagger: staggerDelay
      },
      0.3
    );
  }

  // 其他元素淡入 (其他所有组件)
  const otherElements = document.querySelectorAll('.col-span-12:not(:first-child)');
  if (otherElements.length > 0) {
    mainTimeline.fromTo(
      otherElements,
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: staggerDelay
      },
      0.4
    );
  }

  return mainTimeline;
};

/**
 * 为特定元素添加淡入动画
 * @param {string} selector - 元素选择器
 * @param {Object} options - 动画配置选项
 */
export const fadeInElement = (selector, options = {}) => {
  const defaults = {
    y: 20,
    duration: 0.6,
    opacity: 0,
    ease: 'power2.out',
    delay: 0
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    selector,
    {
      y: config.y,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      ease: config.ease,
      delay: config.delay
    }
  );
};

/**
 * 为多个元素创建错开的动画
 * @param {string} selector - 元素选择器
 * @param {Object} options - 动画配置选项
 */
export const staggerElements = (selector, options = {}) => {
  const defaults = {
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    opacity: 0,
    ease: 'power2.out',
    delay: 0
  };

  const config = { ...defaults, ...options };

  return gsap.fromTo(
    selector,
    {
      y: config.y,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      delay: config.delay
    }
  );
};
