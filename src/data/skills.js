export const skills = [
  { name: 'JavaScript', level: 'Intermediate', icon: '🚀', category: 'frontend', featured: true },
  { name: 'React', level: 'Beginner', icon: '⚛️', category: 'frontend', featured: true },
  { name: 'Next.js', level: 'Learning', icon: '📱', category: 'frontend', featured: true },
  { name: 'Node.js', level: 'Beginner', icon: '🔧', category: 'backend', featured: true },
  { name: 'HTML/CSS', level: 'Intermediate', icon: '🎨', category: 'frontend', featured: false },
  { name: 'Git', level: 'Beginner', icon: '📂', category: 'devops', featured: false },
  { name: 'Tailwind CSS', level: 'Beginner', icon: '💨', category: 'frontend', featured: false },
  { name: 'Databases', level: 'Learning', icon: '🗄️', category: 'backend', featured: false },
  { name: 'TypeScript', level: 'Learning', icon: '📘', category: 'frontend', featured: false },
  { name: 'Vue', level: 'Learning', icon: '🟢', category: 'frontend', featured: false },
  { name: 'Express', level: 'Beginner', icon: '🚂', category: 'backend', featured: false },
  { name: 'MongoDB', level: 'Learning', icon: '🍃', category: 'backend', featured: false },
  { name: 'UI/UX', level: 'Learning', icon: '🎭', category: 'design', featured: false },
  { name: 'Figma', level: 'Learning', icon: '🖌️', category: 'design', featured: false },
  { name: 'Docker', level: 'Learning', icon: '🐳', category: 'devops', featured: false },
  { name: 'AWS', level: 'Learning', icon: '☁️', category: 'devops', featured: false },
  { name: 'CI/CD', level: 'Learning', icon: '🔄', category: 'devops', featured: false }
];

export function getAllSkills() {
  return skills;
}
