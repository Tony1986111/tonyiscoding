// Common metadata for the website
export const siteMetadata = {
  title: {
    default: 'Tony Ye | Frontend Developer & IT Enthusiast',
    template: '%s | Tony Ye'
  },
  description: 'Personal website of Tony Ye, showcasing frontend development projects, coding journey, and technical blog posts.',
  keywords: ['frontend developer', 'web development', 'React', 'Next.js', 'portfolio', 'blog'],
  authors: [{ name: 'Tony Ye', url: 'https://tonyiscoding.xyz' }],
  creator: 'Tony Ye',
  publisher: 'Tony Ye',
  url: 'https://tonyiscoding.xyz',
  siteName: 'Tony Ye',
  locale: 'en_US',
  type: 'website',
  twitterHandle: '@alei198634',
};

// Generate metadata for different pages
export function generateMetadata(title, description) {
  return {
    title: title || siteMetadata.title.default,
    description: description || siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: siteMetadata.authors,
    creator: siteMetadata.creator,
    publisher: siteMetadata.publisher,
    openGraph: {
      title: title || siteMetadata.title.default,
      description: description || siteMetadata.description,
      url: siteMetadata.url,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      type: siteMetadata.type,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteMetadata.title.default,
      description: description || siteMetadata.description,
      creator: siteMetadata.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
