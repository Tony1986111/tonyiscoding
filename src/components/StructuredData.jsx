'use client';

import { getPersonalInfo } from '@/data/personal';

export default function StructuredData() {
  const personalInfo = getPersonalInfo();
  
  // Person schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    url: personalInfo.website,
    sameAs: [
      personalInfo.github,
      personalInfo.twitter,
      personalInfo.linkedin
    ],
    jobTitle: personalInfo.title,
    description: personalInfo.bio
  };
  
  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalInfo.name} | Personal Website`,
    url: personalInfo.website,
    description: 'Personal website showcasing projects and blog posts',
    author: {
      '@type': 'Person',
      name: personalInfo.name
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
