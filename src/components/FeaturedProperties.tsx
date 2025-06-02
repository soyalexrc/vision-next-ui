'use client';

// import { PropertyCard } from '@/components/PropertyCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { useFeaturedProperties } from '@/lib/api/properties';

export default function FeaturedProperties() {
  // const { data } = useFeaturedProperties();
  return (
    <section className="lg:px-24 py-20">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h2 className="text-2xl font-bold lg:font-medium lg:text-4xl">Próximamente</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Estamos trabajando en nuestro catálogo de propiedades. ¡Vuelve pronto para descubrir las mejores opciones inmobiliarias!
        </p>
        <Link href="/contacto">
          <Button className="bg-red-900 text-white w-[300px]">Contáctanos</Button>
        </Link>
      </div>
    </section>
    // <section className="lg:px-24">
    //   <h2 className="text-2xl font-bold lg:font-medium lg:text-4xl py-10 text-center">Conoce las propiedades que tenemos para ti</h2>
    //   <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">{data?.map((element) => <PropertyCard {...element} key={element.id} />)}</div>
    //
    //   <div className="flex justify-center mt-10">
    //     <Link href="/inmuebles">
    //       <Button className="bg-red-900 text-white w-[300px]">Ver más</Button>
    //     </Link>
    //   </div>
    // </section>
  );
}
