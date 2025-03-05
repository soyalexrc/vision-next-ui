import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function AboutUs() {
  return (
    <>
      <section className="relative w-full h-[300px] md:h-[550px]">
        <Image
          src="/banners/acerca-de-nosotros.png"
          className="hidden md:block"
          objectFit="cover"
          fill
          alt="Banner publicitario de inmuebles"
        />
        <Image
          src="/banners/mobile/acerca-de-nosotros.png"
          className="w-full h-full block md:hidden"
          width={250}
          height={250}
          alt="Banner publicitario de inmuebles"
        />
        {/*<img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />*/}
        {/*<div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">*/}
        {/*  <h2 className="text-white lg:text-4xl tracking-widest">Comienza una nueva ilusion</h2>*/}
        {/*</div>*/}
      </section>
      <section className="lg:px-52">
        <div className="my-10 border-b-1">
          <h3 className="tracking-widest text-xl uppercase text-center mb-5">Visión Inmobiliaria</h3>
          <h1 className="text-center text-4xl mb-5">
            {/*Profesionales con más de <span className="font-bold text-red-500">14 años</span> de <br />*/}
            Profesionales con <span className="font-bold text-red-500">14 años</span> de <br />
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
          <div className="p-4">
            <p className="text-justify mb-5">
              Corporación Visión Inmobiliaria CA, constituida en el año 2016 y representada desde sus inicios por nuestra CEO, quien tiene
              una trayectoria comercial desde mediados del año 2011 y quien sigue dirigiendo esta empresa con la visión y liderazgo que hoy
              nos caracteriza.
            </p>
            <p className="text-justify">
              Nuestra Misión como organización, es brindar a nuestros clientes desde un concepto único, integral y confortable, el mejor,
              más profesional y más completo servicio inmobiliario en el mercado nacional e incluso medirnos a nivel internacional. Nuestros
              objetivos principales son garantizar la satisfacción del cliente, por medio de la realización a cabalidad de cada servicio y
              gestión ofrecida en la organización.
            </p>
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
            Te invitamos a vivir nuestra experiencia inmobiliaria <br />
            “El confort de tener todo en un solo lugar“
            {/*Te asesoramos para conseguir el propiedad <br />*/}
            {/*que estas buscando, de forma transparente y segura.*/}
          </h2>
          <div className="flex justify-center mt-7">
            <Link href="/contacto">
              <Button className="bg-red-900  text-white">Contáctanos</Button>
            </Link>
          </div>
        </div>
      </section>

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
      </div>

      {/*<section className="px-4 lg:px-24 grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-4">*/}
      {/*  {images.map((image) => (*/}
      {/*    <img key={image.src} src={image.src} alt={image.alt} />*/}
      {/*  ))}*/}
      {/*</section>*/}
    </>
  );
}
