import Banner from '@/components/Banner';
import Searcher from '@/components/Searcher';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ContactUsBanner from '@/components/ContactUsBanner';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesBanner from '@/components/ServicesBanner';

export default async function HomePage() {
  const categories = await fetch(`${process.env.HOST_URL}/api/categories?isFeatured=true`, {
    cache: 'force-cache',
    next: { tags: ['categories_home'] },
    method: 'GET',
  }).then((res) => res.json());

  return (
    <div className={`flex  min-h-screen flex-col items-center justify-between`}>
      <Banner />
      <Searcher />
      <CategoriesCarousel categories={categories} />
      <ContactUsBanner />
      <FeaturedProperties />
      <ServicesBanner />
      {/*<AdvisersBanner />*/}
    </div>
  );
}
