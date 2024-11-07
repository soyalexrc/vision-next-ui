import { PropertyCardWithCarousel } from '@/components/PropertyCard';
import React from 'react';

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

  const urlParams = new URLSearchParams(filteredQuery.toString());
  const properties = await fetch(`${process.env.HOST_URL}/api/inmuebles?${urlParams}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  if (!properties) {
    return <div>no se encontraron propiedades...</div>;
  } else {
    return (
      <>
        {properties.map((property: any) => (
          <PropertyCardWithCarousel
            images={property.images}
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
      </>
    );
  }
}
