import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function AboutUs() {
  return (
    <>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">
          <h2 className="text-white lg:text-4xl tracking-widest">Comienza una nueva ilusion</h2>
        </div>
      </section>
      <section className="lg:px-52">
        <div className="my-10 border-b-1">
          <h3 className="tracking-widest text-xl uppercase text-center mb-5">Visión Inmobiliaria</h3>
          <h1 className="text-center text-4xl mb-5">
            Profesionales con más de veinte años de <br />
            experiencia
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex justify-center relative h-[300px] lg:h-full">
            <Image
              alt="Imagen de oficina de vision inmobiliaria"
              objectFit="cover"
              fill
              className="w-full h-full top-0 left-0 object-cover"
              src="/about/about-image.jpg"
            />
          </div>
          <div className="px-4">
            Grupo Induo, es una empresa de intermediación inmobiliaria y gestión de activos, compuesta por profesionales con más de veinte
            años de experiencia en el sector. Actualmente gestionamos el patrimonio inmobiliario de particulares, entidades financieras y
            fondos de inversión, ya sea residencial, comercial y terciario. También realizamos operaciones de Sale & Lease back. Disponemos
            de profesionales altamente cualificados para ofrecer a nuestros clientes seguridad y profesionalidad ante cualquier proyecto
            inmobiliario. Nuestro trabajo consiste en proporcionar a nuestros clientes el tipo de activo que más se ajuste a sus intereses.
            Ofrecemos nuestros servicios tanto a particulares, empresas y fondos de inversión, adecuando cada tipo de operación a las
            preferencias y capacidad de cada uno.
          </div>
        </div>
      </section>

      <section className="relative h-[400px] lg:h-[500px] my-10">
        <Image
          alt="Imagen de globos aereos"
          objectFit="cover"
          fill
          className="w-full h-full top-0 left-0 object-cover"
          src="/about/about-image-2.jpg"
        />
        <div className="absolute top-0 left-0 z-10 bg-gray-950 opacity-50 w-full h-full flex justify-center items-center flex-col" />
        <div className="absolute top-0 left-0 z-20 w-full h-full flex justify-center items-center flex-col">
          <h2 className="text-center text-white lg:text-4xl">
            Te asesoramos para conseguir el propiedad <br />
            que estas buscando, de forma transparente y segura.
          </h2>
          <div className="flex justify-center mt-7">
            <Link href="/contacto">
              <Button className="bg-red-900  text-white">Contáctanos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/*<section className="px-4 lg:px-24 grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-4">*/}
      {/*  {images.map((image) => (*/}
      {/*    <img key={image.src} src={image.src} alt={image.alt} />*/}
      {/*  ))}*/}
      {/*</section>*/}
    </>
  );
}
