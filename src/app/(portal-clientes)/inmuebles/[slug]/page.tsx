'use client';
import Image from 'next/image';
import Link from 'next/link';
// import Lightbox from 'yet-another-react-lightbox';
// import NextJsImage from '@/components/lightbox/NextJsImage';
import { useState } from 'react';
// import Zoom from 'yet-another-react-lightbox/plugins/zoom';
// import formatSlides from '@/utils/getSlides';
import formatPropertyTitle from '@/utils/format-property-title';
import { CheckIcon } from '@/components/icons';
import formatCurrency from '@/utils/format-currency';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export default function Property() {
  const [openGallery, setOpenGallery] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  console.log(openGallery, imgIndex);

  function handleOpenGallery(index: number) {
    setImgIndex(index);
    setOpenGallery(true);
  }

  const property = {
    images: ['/home/latestElements/latest-1.jpg', '/home/latestElements/latest-2.jpg', '/home/latestElements/latest-3.jpg'],
    publicationTitle: 'Casa en el parral, cercanias XYZ',

    price: '50000',

    locationInformation: {
      city: 'Valencia',
      state: 'Carabobo',
      country: 'Venezuela',
      location: 'Av 123, paseo la castellana 456',
      municipality: '',
      avenue: '',
      street: '',
      isClosedStreet: 'Si',
      referencePoint: '',
      howToGet: '',
    },
    generalInformation: {
      code: 'VINM_001',
      footageGround: '45',
      footageBuilding: '500',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type 
    specimen book. It has survived not only five centuries, but also the leap into 
    electronic typesetting, remaining essentially unchanged. It was popularised in 
    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
    and more recently with desktop publishing software like Aldus PageMaker including 
    versions of Lorem Ipsum.`,
      operationType: 'Venta',
      propertyType: 'Apartamentp',
      distributionComments: '',
    },
    negotiationInformation: {
      price: '50000',
    },
    attributes: [
      {
        id: 1,
        formType: 'check',
        label: 'Tiene estacionamiento?',
        value: 'si',
      },
      {
        id: 2,
        formType: 'text',
        label: 'Numero de muebles',
        value: '4',
      },
    ],
  };

  console.log(property);

  // if (error.error) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <h3 className="text-xl">{error.message}</h3>
  //     </div>
  //   );
  // }

  return (
    <main className="min-h-screen">
      <div className="w-full h-[300px] lg:h-[500px] relative">
        <Image
          fill
          priority
          alt="Property image"
          className="top-0 left-0 w-full h-full object-cover"
          src="/home/latestElements/latest-1.jpg"
        />
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
              <Badge className="border-red-900 select-none hover:bg-transparent bg-transparent text-red-900">
                {property.generalInformation.operationType}
              </Badge>
              {/*<h2 className='text-xl'>{property.generalInformation.operationType}</h2>*/}
              <h3 className="text-4xl mt-3 text-red-900">{formatCurrency(property.negotiationInformation.price)}</h3>
            </div>
          </div>
          <div className="lg:hidden px-4">
            <Badge className="border-red-900 select-none hover:bg-transparent text-red-900 bg-transparent mb-5">
              {property.generalInformation.operationType}
            </Badge>

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

      <div className="lg:px-24 grid gap-10 grid-cols-12">
        <div className="col-span-12 lg:col-span-9 border-b-1 pb-5 lg:border-none lg:pb-0">
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
            <div className="grid gap-x-8 gap-y-6 grid-cols-2">
              {property.attributes
                .filter((attr: any) => attr.value !== null)
                .map((attr: any) => (
                  <div key={attr.id} className="col-span-2 md:col-span-1 flex justify-between border-b-1 pb-2">
                    <p className="text-sm">{attr.label}</p>
                    {attr.formType === 'check' ? (
                      <CheckIcon width={25} height={25} fill="green" />
                    ) : (
                      <span className="font-bold">{attr.value.toString()}</span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="px-4 text-3xl my-10">Galeria</h3>
            <div className="grid grid-cols-4 gap-2">
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
        <div className="col-span-12 lg:col-span-3">
          <h3 className="text-2xl text-center mb-3">Contactanos</h3>
          <p className="text-sm text-center lg:text-left">
            Si deseas más información sobre esta propiedad, por favor, rellena el formulario.
          </p>
          <div className="my-5">
            <Input className="mb-4" type="text" placeholder="Nombres y apellidos" />
            <Input className="mb-4" type="email" placeholder="Email" />
            <Input className="mb-4" type="tel" placeholder="Telefono" />
            <Textarea placeholder="Mensaje" className="w-full" />
            <div className="my-5 flex gap-2 items-center">
              <Checkbox defaultChecked />
              <span className="text-xs">
                He leido y acepto los{' '}
                <Link className="text-xs" href="/public">
                  terminos y condiciones
                </Link>
              </span>
            </div>

            <div className="flex justify-center">
              <Button className="bg-red-900 text-white">Enviar informacion</Button>
            </div>
          </div>
        </div>
      </div>

      {/*<Lightbox*/}
      {/*  open={openGallery}*/}
      {/*  index={imgIndex}*/}
      {/*  close={() => setOpenGallery(false)}*/}
      {/*  slides={formatSlides(property.images)}*/}
      {/*  render={{ slide: NextJsImage }}*/}
      {/*  plugins={[Zoom]}*/}
      {/*/>*/}
    </main>
  );
}
