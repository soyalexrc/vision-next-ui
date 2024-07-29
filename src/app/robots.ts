import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/administracion/*', '/ingreso', '/registro'],
    },
    sitemap: 'https://visioninmobiliaria.com.ve/sitemap.xml',
  };
}
