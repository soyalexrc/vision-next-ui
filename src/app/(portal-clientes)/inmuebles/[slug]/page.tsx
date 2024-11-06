// 'use client';
import Image from 'next/image';
import Link from 'next/link';
// import Lightbox from 'yet-another-react-lightbox';
// import NextJsImage from '@/components/lightbox/NextJsImage';
// import { useState } from 'react';
// import Zoom from 'yet-another-react-lightbox/plugins/zoom';
// import formatSlides from '@/utils/getSlides';
import { CheckIcon } from '@/components/icons';
import formatCurrency from '@/utils/format-currency';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db/prisma';
import { Metadata } from 'next';
import ContactForm from "@/components/contact/ContactForm";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return prisma.property.findMany({ select: { slug: true } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: {
      generalInformation: { select: { publicationTitle: true, description: true, propertyType: true } },
      locationInformation: { select: { country: true } },
      negotiationInformation: { select: { operationType: true } },
    },
  });
  return {
    title: property?.generalInformation?.publicationTitle ?? 'Pagina de inmueble',
    description: property?.generalInformation?.description.slice(0, 155).concat('...') ?? 'Descripcion de el inmueble',
    alternates: {
      canonical: process.env.HOST_URL + '/inmuebles/' + params.slug,
    },
    category: property?.negotiationInformation?.operationType + ' de inmuebles',
    keywords: [
      property?.negotiationInformation?.operationType ?? 'Venta',
      property?.generalInformation?.propertyType ?? 'Casa',
      `${property?.negotiationInformation?.operationType ?? 'Venta'} de ${property?.generalInformation?.propertyType ?? 'Casa'}`,
      `${property?.negotiationInformation?.operationType ?? 'Venta'} de ${
        property?.generalInformation?.propertyType ?? 'Casa'
      } en venezuela`,
      'Inmuebles',
      'Inmuebles en venezuela',
    ],
    openGraph: {
      title: property?.generalInformation?.publicationTitle ?? 'Pagina de inmueble',
      description: property?.generalInformation?.description.slice(0, 155).concat('...') ?? 'Descripcion de el inmueble',
      images: property?.images ? property.images.map((image) => ({ url: image, alt: 'Imagen de inmueble' })) : [],
      type: 'website',
      url: process.env.HOST_URL + '/inmuebles/' + params.slug,
      countryName: property?.locationInformation?.country ?? 'Venezuela',
      siteName: process.env.HOST_URL,
      locale: 'es_VE',
    },
  };
}

export default async function Page({ params }: Props) {
  // const [openGallery, setOpenGallery] = useState(false);
  // const [imgIndex, setImgIndex] = useState(0);
  //
  // console.log(openGallery, imgIndex);
  //
  // function handleOpenGallery(index: number) {
  //   setImgIndex(index);
  //   setOpenGallery(true);
  // }

  const property = await fetch(`${process.env.HOST_URL}/api/inmuebles/getBySlug/${params.slug}`, {
    cache: 'force-cache',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  // if (error.error) {
  //   return (
  //     <div className="min-h-screen flex justify-center items-center">
  //       <h3 className="text-xl">{error.message}</h3>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen">
      <div className="w-full h-[300px] lg:h-[500px] relative">
        <Image fill priority alt="Property image" className="top-0 left-0 w-full h-full object-cover" src={property.images[0]} />
      </div>
      <div className="border-b-8 pb-5 mt-5 mb-5 border-red-opacity">
        <div className="px-4 lg:px-24">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <Badge className="lg:hidden mb-5 border-red-900 select-none hover:bg-transparent bg-transparent text-red-900">
                {property.negotiationInformation.operationType}
              </Badge>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <h1 className="text-2xl lg:text-4xl">{property.generalInformation.publicationTitle}</h1>
              <h2 className="text-lg lg:text-2xl mt-3">
                {property.locationInformation.municipality}, {property.locationInformation.state}, {property.locationInformation.country}{' '}
              </h2>
              <h3 className="text-lg mt-3">REF - {property.generalInformation.code}</h3>
            </div>
            <div className="col-span-12 mt-3 lg:hidden">
              <h3 className="text-4xl text-center mt-3 text-red-900">{formatCurrency(property.negotiationInformation.price)}</h3>
            </div>
            <div className="col-span-4 hidden lg:flex flex-col items-end">
              <Badge className="hidden lg:block border-red-900 select-none hover:bg-transparent bg-transparent text-red-900">
                {property.negotiationInformation.operationType}
              </Badge>
              <h3 className="text-4xl mt-3 text-red-900">{formatCurrency(property.negotiationInformation.price)}</h3>
            </div>
          </div>
          {/*<div className="lg:hidden px-4">*/}
          {/*  <Badge className="border-red-900 select-none hover:bg-transparent text-red-900 bg-transparent mb-5">*/}
          {/*    {property.negotiationInformation.operationType}*/}
          {/*  </Badge>*/}

          {/*  <h2 className="text-2xl">{property.generalInformation.publicationTitle}</h2>*/}
          {/*  <span>-</span>*/}
          {/*  <h2 className="text-lg mt-3">*/}
          {/*    {property.locationInformation.city}, {property.locationInformation.state}, {property.locationInformation.country}*/}
          {/*  </h2>*/}
          {/*  <h3 className="text-md mt-3">REF - {property.generalInformation.code}</h3>*/}

          {/*  <h2 className="text-3xl text-center mt-3 text-red-900">$ {property.negotiationInformation.price}</h2>*/}
          {/*</div>*/}
          <div className="mt-5">
            <div className="flex gap-5 justify-center ">
              <Badge variant="outline" className="text-red-900 border-red-900">
                {property.generalInformation.footageGround} m2
              </Badge>
              <Badge variant="outline" className="text-red-900 border-red-900 px-4">
                {property.generalInformation.propertyType}
              </Badge>
              <Badge variant="outline" className="text-red-900 border-red-900">
                {property.negotiationInformation.operationType}
              </Badge>
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

          {/*<div className="px-4">*/}
          {/*  <h3 className="text-3xl my-10">Comentarios de distribucion</h3>*/}
          {/*  <p>- - -</p>*/}
          {/*</div>*/}

          <div className="px-4">
            <h3 className="text-3xl my-10">Caracteristicas</h3>
            <div className="grid gap-x-8 grid-cols-2">
              {property.AttributesOnProperties.map((relation: any) => (
                <div
                  key={relation.attributeId}
                  className="col-span-2 md:col-span-1 flex justify-between  border-b-2 border-gray-100 items-center pb-2 mb-2"
                >
                  <p className="text-sm">{relation.attribute.label}</p>
                  {relation.attribute.formType === 'check' ? (
                    <CheckIcon width={25} height={25} fill="green" />
                  ) : (
                    <span className="font-bold">{relation.attribute.value.toString()}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*{utilities.some((item) => {*/}
          {/*  const { value } = item as UtilityForm;*/}
          {/*  return value;*/}
          {/*}) ? (*/}
          {/*    <div>*/}
          {/*      {utilities.map((item) => {*/}
          {/*        const { title, id, value, additionalInformation } = item as UtilityForm;*/}
          {/*        if (value) {*/}
          {/*          return (*/}
          {/*              <div key={id} className="flex justify-between border-b-2 border-gray-100 pb-2 mb-2">*/}
          {/*                <p className="text-sm">*/}
          {/*                  {title}*/}
          {/*                  {additionalInformation && <span className="text-gray-400 font-bold">: ({additionalInformation})</span>}*/}
          {/*                </p>*/}
          {/*                <CheckIcon width={25} height={25} fill="green" />*/}
          {/*              </div>*/}
          {/*          );*/}
          {/*        }*/}
          {/*      })}*/}
          {/*    </div>*/}
          {/*) : (*/}
          {/*    <div*/}
          {/*        onClick={() => goToSection('Distribucion, Equipos y Servicios')}*/}
          {/*        className="border-2 border-dashed border-gray-300 h-[150px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer"*/}
          {/*    >*/}
          {/*      Agregar servicios / utilidades*/}
          {/*    </div>*/}
          {/*)}*/}

          <div className="px-4">
            <h3 className="text-3xl my-10">Servicios</h3>
            {property.UtilitiesOnProperties.map((relation: any) => (
              <div key={relation.utilityId} className="flex justify-between  border-b-2 border-gray-100 items-center pb-2 mb-2">
                <p className="text-sm">
                  {relation.utility.title}
                  {relation.additionalInformation && <span className="text-gray-400 font-bold">: ({relation.additionalInformation})</span>}
                </p>
                <CheckIcon width={25} height={25} fill="green" />
              </div>
            ))}
          </div>

          <div className="px-4">
            <h3 className="text-3xl my-10">Equipos</h3>
            {property.EquipmentsOnProperties.map((relation: any) => (
              <div key={relation.equipmentId} className="flex justify-between  border-b-2 border-gray-100 items-center pb-2 mb-2">
                <p className="text-sm">
                  {relation.equipment.title}
                  {relation.additionalInformation && <span className="text-gray-400 font-bold">: ({relation.additionalInformation})</span>}
                </p>
                <CheckIcon width={25} height={25} fill="green" />
              </div>
            ))}
          </div>

          <div>
            <h3 className="px-4 text-3xl my-10">Galeria</h3>
            <div className="grid grid-cols-4 gap-2">
              {property &&
                property.images &&
                property.images.length > 0 &&
                property.images.map((image: string) => (
                  <Image
                    width={200}
                    height={200}
                    className="w-full h-[150px] lg:h-[200px] object-cover rounded cursor-zoom-in"
                    key={image}
                    src={image}
                    alt="Imagen de propiedad"
                  />
                ))}
            </div>
          </div>
          <div className="px-4 my-10">
            <h3 className="text-3xl my-10">Ubicacion y Adyacencias</h3>
            <p>
              {property.locationInformation.municipality}, {property.locationInformation.state}, {property.locationInformation.country}
            </p>
            <p>
              <b>Av:</b> {property.locationInformation.avenue}
            </p>
            <p>
              <b>Calle:</b> {property.locationInformation.street}
            </p>
            <p>
              <b>¿Se encuentra en calle cerrada?:</b> {property.locationInformation.isClosedStreet}
            </p>
            {/*<p>*/}
            {/*  <b>Punto de referencia: </b>*/}
            {/*  {property.locationInformation.referencePoint}*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*  <b>Como llegar: </b>*/}
            {/*  {property.locationInformation.howToGet}*/}
            {/*</p>*/}
          </div>
          <div className="px-4 mt-2">
            <p className="font-bold mb-4 ">Adyacencias:</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {property.AdjacenciesOnProperties.map((item: any) => (
                <Badge key={item.adjacencyId} className="text-sm" variant="secondary">
                  {item.adjacency.title}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <h3 className="text-2xl text-center mb-3">Contactanos</h3>
          <p className="text-sm text-center lg:text-left">
            Si deseas más información sobre esta propiedad, por favor, rellena el formulario.
          </p>
          <div className="my-5">
            <ContactForm from={property.generalInformation.code} showLabels={false} />
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
    </div>
  );
}
