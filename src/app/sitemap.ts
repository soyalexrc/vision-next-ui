import prisma from '@/lib/db/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await prisma.property.findMany();
  const baseSitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://visioninmobiliaria.com.ve',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/inmuebles',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/acerca-de-nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/aviso-legal',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/proteccion-de-datos',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/comentarios',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/contacto',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/equipo-de-trabajo',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/servicios',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://visioninmobiliaria.com.ve/trabaja-con-nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
  properties.forEach((property) => {
    baseSitemap.push({
      url: `${process.env.HOST_URL}/inmuebles/${property.slug}`,
      lastModified: property.updatedAt,
    });
  });
  return baseSitemap;
}
