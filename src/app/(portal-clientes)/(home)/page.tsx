import Banner from '@/components/Banner';
import Searcher from '@/components/Searcher';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ContactUsBanner from '@/components/ContactUsBanner';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesBanner from '@/components/ServicesBanner';
import { getFeaturedCategoriesCached } from '@/actions/category';
import { Categories } from '@prisma/client';

export default async function HomePage() {
  const categories = await getFeaturedCategoriesCached();

  return (
    <div className={`flex  min-h-screen flex-col items-center justify-between`}>
      <Banner />
      <Searcher />
      <CategoriesCarousel categories={categories as Categories[]} />
      <ContactUsBanner />
      <FeaturedProperties />
      <ServicesBanner />
      {/*<AdvisersBanner />*/}
    </div>
  );
}
