'use server';
import prisma from '@/lib/db/prisma';
import { unstable_cache } from 'next/cache';

export const getFeaturedCategories = async () => {
  try {
    return await prisma.categories.findMany({ where: { isFeatured: true } });
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedCategoriesCached = unstable_cache(async () => getFeaturedCategories(), ['featured-categories']);
