import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

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
              <a
                href="https://www.google.com/maps/place/Visi%C3%B3n+Inmobiliaria/@10.2444275,-68.0105401,17z/data=!3m1!4b1!4m5!3m4!1s0x8e805d6ea2ff11a9:0x454dae0b7a50bc4b!8m2!3d10.244425!4d-68.0083623"
                target="_blank"
              >
                <Image
                  alt="Imagen de mapa google maps ubicacion de Vision Inmobiliaria"
                  fill
                  className="w-full h-full top-0 left-0 object-cover"
                  src="/map.png"
                />
              </a>
            </div>
          </div>
          <div className="px-4">
            <h2 className="text-3xl mb-4">Mis datos</h2>
            <Input type="text" placeholder="Nombre" />

            <div className="grid gap-4 grid-cols-2 my-5">
              <Input type="email" placeholder="Email" />
              <Input type="tel" placeholder="Telefono" />
            </div>

            <h2 className="text-2xl mt-10 mb-3">Estoy interesado en </h2>

            <Textarea placeholder="Escribir mensaje aqui" className="w-full" />

            <div className="flex items-center my-5 gap-2">
              <Checkbox defaultChecked />
              <span className="text-sm">
                He leido y acepto los
                <Link href="/">terminos y condiciones</Link>
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
