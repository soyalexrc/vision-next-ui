import { Inter } from 'next/font/google';
import Banner from '@/components/Banner';
import Searcher from '@/components/Searcher';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ContactUsBanner from '@/components/ContactUsBanner';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesBanner from '@/components/ServicesBanner';
import AdvisersBanner from '@/components/AdvisersBanner';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex  min-h-screen flex-col items-center justify-between  ${inter.className}`}>
      <Banner />
      <Searcher />
      <CategoriesCarousel />

      <ContactUsBanner />
      <FeaturedProperties />
      <ServicesBanner />
      <AdvisersBanner />
    </main>
  );
}
