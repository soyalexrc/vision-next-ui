import Banner from '@/components/Banner';
import Searcher from '@/components/Searcher';
import CategoriesCarousel from '@/components/CategoriesCarousel';
import ContactUsBanner from '@/components/ContactUsBanner';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesBanner from '@/components/ServicesBanner';
import TeamSection from '@/components/team-section';

export default async function HomePage() {
  return (
    <div className={`flex  min-h-screen flex-col items-center justify-between`}>
      <Banner />
      <Searcher />
      <CategoriesCarousel />
      <ContactUsBanner />
      <FeaturedProperties />
      <ServicesBanner />
      {/*<AdvisersBanner />*/}
      <div className="lg:px-24 my-10" id="equipo-de-trabajo">
        <h3 className="text-4xl text-center mb-10"> Equipo de trabajo</h3>
        <p>
          Te presentamos nuestro equipo de trabajo en cada área y quienes nos conforman y representan en sus labores diarias, personas
          honradas, de valores y principios, profesionales al servicio de nuestros clientes.
        </p>
        <br />

        <p>
          Nuestros Asesores Inmobiliarios a continuación, son los encargados de atenderte en cada servicio que requieras para brindarte una
          solución oportuna a tus necesidades.
        </p>
        <TeamSection />
      </div>
    </div>
  );
}
