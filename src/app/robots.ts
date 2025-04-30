import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/transcript/', '/api/'],
    },
    sitemap: 'https://youtranscripts.com/sitemap.xml',
  };
}
