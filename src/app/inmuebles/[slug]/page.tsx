'use client';
import { Inter } from 'next/font/google';
import { Button, Checkbox, Chip, Input, Link, Textarea } from '@nextui-org/react';
import { http } from '@/utils/axios';
import Image from 'next/image';
import NextLink from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import NextJsImage from '@/components/lightbox/NextJsImage';
import { useState } from 'react';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import formatSlides from '@/utils/getSlides';
import formatPropertyTitle from '@/utils/format-property-title';
import { CheckIcon } from '@/components/icons';
import formatCurrency from '@/utils/format-currency';

const inter = Inter({ subsets: ['latin'] });

export default function Property({ property, error }: any) {
  const [openGallery, setOpenGallery] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  console.log(error);

  function handleOpenGallery(index: number) {
    setImgIndex(index);
    setOpenGallery(true);
  }

  if (error.error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h3 className="text-xl">{error.message}</h3>
      </div>
    );
  }

  return (
    <main className={`min-h-screen ${inter.className}`}>
      <div className="w-full h-[300px] lg:h-[500px] relative">
        <Image fill priority alt="Property image" className="top-0 left-0 w-full h-full object-cover" src={property.images[0]} />
      </div>
      <div className="border-b-8 pb-5 mt-5 mb-5 border-red-opacity">
        <div className="lg:px-24">
          <div className="hidden lg:grid grid-cols-12">
            <div className="col-span-8">
              <h1 className="text-4xl">{formatPropertyTitle(property.publicationTitle)}</h1>
              <h2 className="text-2xl mt-3">
                {property.locationInformation.city}, {property.locationInformation.state}, {property.locationInformation.country}{' '}
              </h2>
              <h3 className="text-lg mt-3">REF - {property.generalInformation.code}</h3>
            </div>
            <div className="col-span-4 flex flex-col items-end">
              <Chip variant="bordered" className="border-red-900 text-red-900">
                {property.generalInformation.operationType}
              </Chip>
              {/*<h2 className='text-xl'>{property.generalInformation.operationType}</h2>*/}
              <h3 className="text-4xl mt-3 text-red-900">{formatCurrency(property.negotiationInformation.price)}</h3>
            </div>
          </div>
          <div className="lg:hidden px-4">
            <Chip variant="bordered" className="border-red-900 text-red-900 mb-5">
              {property.generalInformation.operationType}
            </Chip>

            <h1 className="text-2xl">{formatPropertyTitle(property.publicationTitle)}</h1>
            <span>-</span>
            <h2 className="text-lg mt-3">
              {property.locationInformation.city}, {property.locationInformation.state}, {property.locationInformation.country}
            </h2>
            <h3 className="text-md mt-3">REF - {property.generalInformation.code}</h3>

            <h2 className="text-3xl text-center mt-3 text-red-900">$ {property.negotiationInformation.price}</h2>
          </div>
          <div className="mt-5">
            <div className="flex gap-5 justify-center ">
              <small>{property.generalInformation.footageGround} m2</small>
              <small className="border-x-1 border-gray-400 px-4">{property.generalInformation.footageBuilding} m2</small>
              <small>{property.locationInformation.location}</small>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:px-24 grid gap-10 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-9 border-b-1 pb-5 lg:border-none lg:pb-0">
          <div className="px-4">
            <h3 className="text-3xl my-10">Descripcion</h3>
            <p>{property.generalInformation.description}</p>
          </div>

          <div className="px-4">
            <h3 className="text-3xl my-10">Comentarios de distribucion</h3>
            <p>{property.generalInformation.distributionComments}</p>
          </div>

          <div className="px-4">
            <h3 className="text-3xl my-10">Caracteristicas</h3>
            <div className="grid lg:gap-x-20 gap-y-6 grid-cols-1 lg:grid-cols-12">
              {property.attributes
                .filter((attr: any) => attr.value !== null)
                .map((attr: any) => (
                  <div key={attr.id} className="col-span-6 flex justify-between border-b-1 pb-2">
                    <p className="text-sm">{attr.label}</p>
                    {attr.formType === 'check' ? (
                      <CheckIcon width={25} height={25} fill="green" />
                    ) : (
                      <span className=" font-bold">{attr.value.toString()}</span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="px-4 text-3xl my-10">Galeria</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {property &&
                property.images &&
                property.images.length > 0 &&
                property.images.map((image: string, index: number) => (
                  <img
                    onClick={() => handleOpenGallery(index)}
                    className="w-full h-[150px] lg:h-[200px] object-cover rounded cursor-zoom-in"
                    key={image}
                    src={image}
                    alt=""
                  />
                ))}
            </div>
          </div>
          <div className="px-4">
            <h3 className="text-3xl my-10">Ubicacion</h3>
            <p>
              {property.locationInformation.municipality}, {property.locationInformation.city}, {property.locationInformation.state},{' '}
              {property.locationInformation.country}{' '}
            </p>
            <p>
              <b>Av:</b> {property.locationInformation.avenue}
            </p>
            <p>
              <b>Calle:</b> {property.locationInformation.street}
            </p>
            <p>
              {' '}
              <b>Es calle cerrada ?:</b> {property.locationInformation.isClosedStreet}
            </p>
            <p>
              <b>Punto de referencia: </b>
              {property.locationInformation.referencePoint}
            </p>
            <p>
              <b>Como llegar: </b>
              {property.locationInformation.howToGet}
            </p>
          </div>
        </div>
        <div className="px-4 lg:col-span-3">
          <h3 className="text-2xl text-center mb-3">Contactanos</h3>
          <p className="text-sm text-center lg:text-left">
            Si deseas más información sobre esta propiedad, por favor, rellena el formulario.
          </p>
          <div className="my-5">
            <Input size="sm" variant="bordered" className="mb-4" type="text" label="Nombres y apellidos" />
            <Input size="sm" variant="bordered" className="mb-4" type="email" label="Email" />
            <Input size="sm" variant="bordered" className="mb-4" type="tel" label="Telefono" />
            <Textarea minRows={8} variant="bordered" label="Mensaje" className="w-full" />
            <div className="my-5">
              <Checkbox defaultSelected />
              <span className="text-xs">
                He leido y acepto los{' '}
                <Link className="text-xs" underline="always" as={NextLink} href="/public">
                  terminos y condiciones
                </Link>
              </span>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="bg-red-900 text-white">
                Enviar informacion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={openGallery}
        index={imgIndex}
        close={() => setOpenGallery(false)}
        slides={formatSlides(property.images)}
        render={{ slide: NextJsImage }}
        plugins={[Zoom]}
      />
    </main>
  );
}

export async function getStaticPaths() {
  const res = await http.get('/property/previews');
  const properties = await res.data.rows;

  const paths = properties.map((property: any) => ({
    params: { slug: property.publicationTitle },
  }));

  console.log(paths);

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: any) {
  try {
    const res = await http.get(`/property/getBySlug/${params.slug}`);
    const finalProperty = await res.data;
    return { props: { property: finalProperty, revalidate: 60 } };
  } catch (err: any) {
    console.log('here', err.response.data);
    return {
      props: {
        property: {},
        error: err.response.data,
      },
    };
  }
}
