import Image from 'next/image';
import { Button, Checkbox, Input, Link, Select, SelectItem, Textarea } from '@nextui-org/react';
import NextLink from 'next/link';

const animals = [{ label: 'sample', value: 2 }];

export default function ContactUs() {
  return (
    <>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">
          <h2 className="text-white lg:text-4xl tracking-widest">Contactanos y te ayudaremos.</h2>
        </div>
      </section>
      <section className="lg:px-24 my-10">
        <h1 className="text-4xl text-center mb-10">Contactanos</h1>
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4">
          <div className=" border-r-1 px-4">
            <h2 className="text-3xl mb-4">Visión Inmobiliaria</h2>
            <p>
              Av Feo La Cruz, Local Mezz-6, Nivel Mezzanina, CC Paseo La Granja Urbanización Las Quintas, Naguanagua 2005, Carabobo,
              Venezuela
            </p>
            <div className="relative h-[400px] mt-5">
              <Image
                alt="Imagen de mapa google maps ubicacion de Vision Inmobiliaria"
                fill
                className="w-full h-full top-0 left-0 object-cover"
                src="/map.png"
              />
            </div>
          </div>
          <div className="px-4">
            <h2 className="text-3xl mb-4">Mis datos</h2>
            <Input size="sm" variant="bordered" type="text" label="Nombre" />

            <div className="grid gap-4 grid-cols-2 my-5">
              <Input size="sm" variant="bordered" type="email" label="Email" />
              <Input size="sm" variant="bordered" type="tel" label="Telefono" />
            </div>

            <h2 className="text-2xl mt-10 mb-3">Estoy interesado en </h2>

            <Textarea
              minRows={5}
              variant="bordered"
              labelPlacement="outside"
              placeholder="Escribir mensaje aqui"
              className="w-full"
            />

            <div className="my-5">
              <Checkbox defaultSelected />
              <span className="text-sm">
                He leido y acepto los{' '}
                <Link underline="always" as={NextLink} href="/">
                  terminos y condiciones
                </Link>
              </span>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="bg-red-900 text-white">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
