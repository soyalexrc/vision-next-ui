import { Button, Checkbox, Input, Link, Textarea } from '@nextui-org/react';
import NextLink from 'next/link';

const services = [
  {
    title: 'Servicio inmobiliario',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    title: 'Administración de inmuebles alquilados',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    title: 'Trámites legales',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    title: 'Gestión contable',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    title: 'Ama de llaves (limpieza)',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    title: 'Remodelación',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    title: 'Mantenimiento de inmuebles',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
        the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release 
        of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum.`,
  },
];

export default function Services() {
  return (
    <>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center flex-col">
          <h2 className="text-white text-xl lg:text-4xl tracking-widest mb-2">Conoce nuestro servicios</h2>
          <p className="text-white text-sm lg:text-xl text-center">
            Es nuestro trabajo el proporcionarte el tipo de inmueble que más se ajuste a sus intereses
          </p>
        </div>
      </section>
      <section className=" my-5 px-4 lg:px-24 grid gap-4 grid-cols-1 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-3">
          <h3 className="text-3xl text-center mb-2 lg:mb-4">Mas informacion</h3>
          <p className="text-sm text-center">Si deseas más información sobre esta propiedad, por favor, rellena el formulario.</p>

          <div className="my-5">
            <Input size="sm" variant="bordered" className="mb-4" type="text" label="Nombres y apellidos" />
            <Input size="sm" variant="bordered" className="mb-4" type="email" label="Email" />
            <Input size="sm" variant="bordered" className="mb-4" type="tel" label="Telefono" />
            <Textarea minRows={8} variant="bordered" label="Mensaje" className="w-full" />
            <div className="my-5">
              <Checkbox defaultSelected />
              <span className="text-xs">
                He leido y acepto los{' '}
                <Link className="text-xs" underline="always" as={NextLink} href="/">
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
        <div className="order-1 lg:order-2 lg:col-span-9">
          <h3 className="text-4xl text-center lg:text-left mb-2 lg:mb-4">Nuestros servicios</h3>

          {services.map((service) => (
            <div key={service.title} className="flex flex-wrap gap-4 mb-8  lg:flex-nowrap lg:mb-4 ">
              <img src="/about/office-6.jpg" className="w-[350px] rounded" alt="" />
              <div>
                <h4 className="text-2xl">{service.title}</h4>
                <p className="text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
