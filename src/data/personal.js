export const personalInfo = {
  name: 'Tony Ye',
  title: 'Full-Stack',
  email: 'alei198634@gmail.com',
  github: 'https://github.com/Tony1986111',
  twitter: 'https://x.com/alei198634',
  linkedin: 'https://www.linkedin.com/in/delai-ye-2551b092/',
  website: 'https://tonyiscoding.xyz',
  shortBio: 'Focused on creating high-performance apps and websites',
  bio: 'I am a learner transitioning to the IT industry, currently focusing on frontend development technologies.',
  about: 'As a full-stack developer, I have rich learning experience, focusing on building responsive, high-performance modern websites and applications.',
  strengths: [
    'Fast delivery, efficient communication',
    'Focus on code quality and user experience'
  ],
  stats: {
    completedProjects: '5+',
    clientSatisfaction: '95%'
  },
  longBio: `
    I have a background in business and finance, and now I'm learning web development and programming.

    I'm passionate about technology and believe that through continuous learning and practice, I can succeed in the IT industry.

    My goal is to become a full-stack developer, capable of independently building and deploying web applications.
  `,
  journey: [
    {
      period: '2020 - 2022',
      title: 'IT Enthusiast',
      description: 'Developed an interest in programming and self-learned the basics, including HTML, CSS, and JavaScript.'
    },
    {
      period: '2023',
      title: 'Programming Fundamentals',
      description: 'Systematically learned web development basics. Completed online courses in HTML, CSS, JavaScript, and React fundamentals.'
    },
    {
      period: '2024 - Present',
      title: 'Full Stack Development',
      description: 'Diving deeper into React and Next.js, building personal projects. Also learning backend technologies like Node.js and databases.'
    }
  ]
};

export function getPersonalInfo() {
  return personalInfo;
}
