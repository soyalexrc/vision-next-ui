import Banner from '@/components/Banner';
import Searcher from '@/components/Searcher';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ContactUsBanner from '@/components/ContactUsBanner';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesBanner from '@/components/ServicesBanner';

export default function HomePage() {
  return (
    <div className={`flex  min-h-screen flex-col items-center justify-between`}>
      <Banner />
      <Searcher />
      <CategoriesCarousel />
      <ContactUsBanner />
      <FeaturedProperties />
      <ServicesBanner />
      {/*<AdvisersBanner />*/}
    </div>
  );
}
