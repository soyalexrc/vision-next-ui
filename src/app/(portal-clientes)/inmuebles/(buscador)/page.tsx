// import { http } from '@/utils/axios';
import { PropertiesContent } from '@/inmuebles/components';
import { PropertyCardWithCarousel } from '@/components/PropertyCard';
import formatPropertyTitle from '@/utils/format-property-title';
import React from 'react';

// async function getProperties(searchParams: any): Promise<any> {
//   try {
//     const pageSize = searchParams?.limite || 10;
//     const pageIndex = searchParams?.pagina || 1;
//     const operationType = searchParams?.tipo_de_operacion || '';
//     const propertyType = searchParams?.tipo_de_inmueble || '';
//     const state = searchParams?.estado || '';
//     const city = searchParams?.municipalidad || '';
//     const municipality = searchParams?.sector || '';
//     const res = await http.get(
//       `/property/previews/paginated?pageIndex=${pageIndex}&pageSize=${pageSize}&state=${state}&city=${city}&municipality=${municipality}&propertyType=${propertyType}&operationType=${operationType}`,
//     );
//     const resObj = await res.data;
//     const totalElements = resObj.count;
//     const totalPages = totalElements / 10;
//     const properties = resObj.rows;
//     return { total: totalPages, properties, page: pageIndex, limit: pageSize };
//   } catch (err) {}
// }

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const staticProperties = [
    {
      images: ['/home/latestElements/latest-1.jpg', '/home/latestElements/latest-2.jpg', '/home/latestElements/latest-3.jpg'],
      publicationTitle: 'Casa en el parral, cercanias XYZ',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. It was popularised in 
    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
    and more recently with desktop publishing software like Aldus PageMaker including 
    versions of Lorem Ipsum.`,
      price: '50000',
      footageGround: '45',
      operationType: 'Venta',
      propertyType: 'Apartamentp',
    },
  ];
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
            viewStyle="list"
            images={property.images}
            key={property.id}
            path={property.slug}
            title={property.publicationTitle}
            description={property.description}
            price={property.price}
            featured={[property.footageBuilding, property.operationType, property.propertyType]}
          />
        ))}
      </>
    );
  }
}
