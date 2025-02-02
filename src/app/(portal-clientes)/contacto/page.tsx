import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactUs() {
  return (
    <>
      <section className="relative w-full h-[300px] md:h-[550px]">
        <Image src="/banners/contacto.png" className="object-bottom" objectFit="cover" fill alt="Banner publicitario de inmuebles" />
        {/*<img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />*/}
        {/*<div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">*/}
        {/*  <h2 className="text-white lg:text-4xl tracking-widest">Contactanos y te ayudaremos.</h2>*/}
        {/*</div>*/}
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
            <ContactForm from="GENERAL" showLabels={true} />
          </div>
        </div>
      </section>
    </>
  );
}
