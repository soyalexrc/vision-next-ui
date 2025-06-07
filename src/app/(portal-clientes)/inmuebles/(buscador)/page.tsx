import { PropertyCardWithCarousel } from '@/components/PropertyCard';
import React from 'react';
import CustomPagination from '@/components/CustomPagination';
import { cn } from '@/lib/utils';
import { className } from 'postcss-selector-parser';
import { Home } from 'lucide-react';

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  // const { total, totalPages, page, limit, properties } = await getProperties(searchParams);
  // const windowSize = useWindowSize();
  // console.log(windowSize);

  // Call this function whenever you want to
  // refresh props!
  // const refreshData = () => {
  //   router.replace(router.asPath);
  // };

  const filteredQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) {
      filteredQuery.set(key, value as string);
    }
  }

  console.log('filteredQuery', filteredQuery);

  const urlParams = new URLSearchParams(filteredQuery.toString());

  console.log('urlParams', urlParams);

  const response = await fetch(`${process.env.HOST_URL}/property/queried?${urlParams}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  const currentPage = Number(searchParams.pagina) || 1;

  if (response?.properties?.length < 1) {
    return (
      <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
        <div className="rounded-full bg-muted p-3 mb-4">
          <Home className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Se Encontraron Inmuebles</h3>
        <p className="text-muted-foreground mb-4 max-w-sm">
          No pudimos encontrar ninguna propiedad que coincida con tus criterios. Intenta ajustar tus filtros o explora nuevas áreas.
        </p>
        {/*<Button variant="outline">Modificar Busqueda</Button>*/}
      </div>
    );
  } else {
    return (
      <section className="mx-4 md:mx-0">
        {response?.properties?.map((property: any) => (
          <PropertyCardWithCarousel
            images={property.images}
            slug={property.slug}
            key={property.id}
            path={property.slug}
            title={property.publicationTitle}
            description={property.description}
            price={property.price}
            municipality={property.municipality}
            street={property.street}
            state={property.state}
            code={property.code}
            avenue={property.avenue}
            urbanization={property.urbanization}
            featured={[property.footageBuilding, property.operationType, property.propertyType]}
          />
        ))}
        <div className=" mt-10">
          <CustomPagination totalPages={response.totalPages} currentPage={currentPage} />
        </div>
      </section>
    );
  }
}
