import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initialize timeline animation for learning journey section
 * This animation will trigger when the section comes into view
 * and animate each journey item sequentially
 * 
 * @param {Object} options - Animation options
 * @param {string} options.containerSelector - Selector for the journey container
 * @param {string} options.itemSelector - Selector for journey items
 * @param {string} options.dotSelector - Selector for timeline dots
 * @param {string} options.lineSelector - Selector for timeline line
 * @param {number} options.staggerDelay - Delay between each item animation
 * @param {string} options.ease - Easing function for animations
 */
export const initJourneyAnimation = (options = {}) => {
  // Only run on client-side
  if (typeof window === 'undefined') return;

  const defaults = {
    containerSelector: '.learning-journey-container',
    itemSelector: '.journey-item',
    dotSelector: '.journey-dot',
    lineSelector: '.journey-line',
    staggerDelay: 0.3,
    ease: 'power2.out',
    start: 'top 80%',
    end: 'bottom 20%'
  };

  const config = { ...defaults, ...options };
  
  // Get elements
  const container = document.querySelector(config.containerSelector);
  if (!container) return;
  
  const items = container.querySelectorAll(config.itemSelector);
  const dots = container.querySelectorAll(config.dotSelector);
  const line = container.querySelector(config.lineSelector);
  
  if (!items.length) return;

  // Create timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: config.start,
      end: config.end,
      toggleActions: 'play none none reverse',
    }
  });

  // Animate timeline line growing
  if (line) {
    tl.fromTo(line, 
      { 
        scaleY: 0,
        transformOrigin: 'top center'
      }, 
      { 
        scaleY: 1, 
        duration: items.length * config.staggerDelay,
        ease: config.ease
      }, 
      0
    );
  }

  // Animate dots and items
  if (dots.length) {
    tl.fromTo(dots, 
      { 
        scale: 0,
        opacity: 0
      }, 
      { 
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: config.staggerDelay,
        ease: config.ease
      }, 
      0
    );
  }

  // Animate content
  tl.fromTo(items, 
    { 
      opacity: 0,
      y: 20
    }, 
    { 
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: config.staggerDelay,
      ease: config.ease
    }, 
    0.1
  );

  return tl;
};

/**
 * Initialize hover animations for journey items
 * 
 * @param {Object} options - Animation options
 * @param {string} options.containerSelector - Selector for the journey container
 * @param {string} options.itemSelector - Selector for journey items
 * @param {string} options.dotSelector - Selector for timeline dots
 */
export const initJourneyHoverEffects = (options = {}) => {
  // Only run on client-side
  if (typeof window === 'undefined') return;

  const defaults = {
    containerSelector: '.learning-journey-container',
    itemSelector: '.journey-item',
    dotSelector: '.journey-dot',
    duration: 0.3,
    ease: 'power2.out'
  };

  const config = { ...defaults, ...options };
  
  // Get elements
  const container = document.querySelector(config.containerSelector);
  if (!container) return;
  
  const items = container.querySelectorAll(config.itemSelector);
  
  if (!items.length) return;

  // Add hover effects to each item
  items.forEach((item, index) => {
    const dot = item.querySelector(config.dotSelector) || 
               container.querySelectorAll(config.dotSelector)[index];
    
    if (!dot) return;
    
    // Create hover animations
    item.addEventListener('mouseenter', () => {
      gsap.to(dot, {
        scale: 1.3,
        duration: config.duration,
        ease: config.ease
      });
      
      gsap.to(item, {
        x: 5,
        duration: config.duration,
        ease: config.ease
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(dot, {
        scale: 1,
        duration: config.duration,
        ease: config.ease
      });
      
      gsap.to(item, {
        x: 0,
        duration: config.duration,
        ease: config.ease
      });
    });
  });
};
