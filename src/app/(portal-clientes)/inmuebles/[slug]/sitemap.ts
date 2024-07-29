import prisma from '@/lib/db/prisma';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await prisma.property.findMany();
  return properties.map((property) => ({
    url: `${process.env.HOST_URL}/inmuebles/${property.slug}`,
    lastModified: property.updatedAt,
  }));
}
