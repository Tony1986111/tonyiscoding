export default function sitemap() {
  const baseUrl = 'https://tonyiscoding.xyz';
  
  // Define all routes
  const routes = [
    '',
    '/projects',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));
  
  return routes;
}
