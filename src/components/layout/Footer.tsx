import Image from 'next/image';
import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { TiktokIcon, FacebookIcon, InstagramIcon, WhatsappIcon, MailIcon, MapPointIcon } from '../icons';

const footerLinks = [
  {
    title: 'Inicio',
    path: '/',
  },
  {
    title: 'Venta de inmuebles',
    path: '/inmuebles?pagina=1&limite=10&tipo_de_operacion=venta',
  },
  {
    title: 'Alquiler de inmuebles',
    path: '/inmuebles?pagina=1&limite=10&tipo_de_operacion=alquiler',
  },
  {
    title: 'Nuestros servicios',
    path: '/servicios',
  },
  {
    title: 'Acerca de nosotros',
    path: '/acerca-de-nosotros',
  },
  {
    title: 'Contacto',
    path: '/contacto',
  },
];

export default function Footer() {
  return (
    <footer className="border-t-8 border-red-opacity mt-10 pt-5">
      <div className="lg:grid gap-4 grid-cols-12 px-5">
        <div className="col-span-6 lg:px-20 ">
          <Image alt="Logo de vision inmobiliaria" width={250} height={100} className="h-[110px] object-cover" src="/vision-logo.png" />
          <p>
            Grupo Induo, es una empresa de intermediación inmobiliaria y gestión de activos, compuesta por profesionales con más de veinte
            años de experiencia en el sector. Actualmente gestionamos el patrimonio inmobiliario de particulares, entidades financieras y
            fondos de inversión, ya sea residencial, comercial y terciario. También realizamos operaciones de Sale & Lease back. <br />
            Disponemos de profesionales altamente cualificados para ofrecer a nuestros clientes seguridad y profesionalidad ante cualquier
            proyecto inmobiliario. Nuestro trabajo consiste en proporcionar a nuestros clientes el tipo de activo que más se ajuste a sus
            intereses. Ofrecemos nuestros servicios tanto a particulares, empresas y fondos de inversión, adecuando cada tipo de operación a
            las preferencias y capacidad de cada uno.
          </p>
        </div>
        <div className="col-span-3">
          <h3 className="text-xl my-10">Menu</h3>

          <ul>
            {footerLinks.map((link) => (
              <li key={link.title} className="mb-5">
                <Link href={link.path} as={NextLink} underline="hover">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <h3 className="text-xl my-10">Contáctanos</h3>
          <Link
            href="https://www.tiktok.com/@somosvisioninmobiliaria"
            target="_blank"
            className="mb-3 flex gap-2 items-center cursor-pointer"
            underline="hover"
            color="foreground"
          >
            <TiktokIcon width={30} height={30} fill="rgb(97, 3, 33)" />
            <small className="font-bold text-inherit">@somosvisioninmobiliaria</small>
          </Link>
          <Link
            href="https://www.instagram.com/somosvisioninmobiliaria/"
            target="_blank"
            className="mb-3 flex gap-2 items-center cursor-pointer"
            underline="hover"
            color="foreground"
          >
            <InstagramIcon width={30} height={30} fill="rgb(97, 3, 33)" />
            <small className="font-bold text-inherit">@somosvisioninmobiliaria</small>
          </Link>
          <Link
            href="https://www.facebook.com/Somosvisioninmobiliaria/"
            target="_blank"
            className="mb-3 flex gap-2 items-center cursor-pointer"
            underline="hover"
            color="foreground"
          >
            <FacebookIcon width={30} height={30} fill="rgb(97, 3, 33)" />
            <small className="font-bold text-inherit">@Somosvisioninmobiliaria</small>
          </Link>
          <Link
            href="https://wa.me/584244095149"
            target="_blank"
            className="mb-3 flex gap-2 items-center cursor-pointer"
            underline="hover"
            color="foreground"
          >
            <WhatsappIcon width={30} height={30} fill="rgb(97, 3, 33)" />
            <small className="font-bold text-inherit">(0424) - 409 51 49</small>
          </Link>
          <Link
            href="mailto:ventas@visioninmobiliaria.com.ve"
            target="_blank"
            className="mb-3 flex gap-2 items-center cursor-pointer"
            underline="hover"
            color="foreground"
          >
            <MailIcon width={30} height={30} fill="rgb(97, 3, 33)" />
            <small className="font-bold text-inherit">ventas@visioninmobiliaria.com.ve</small>
          </Link>
          <Link
            href="https://www.google.com/maps/place/Visi%C3%B3n+Inmobiliaria/@10.2444275,-68.0105401,17z/data=!3m1!4b1!4m5!3m4!1s0x8e805d6ea2ff11a9:0x454dae0b7a50bc4b!8m2!3d10.244425!4d-68.0083623"
            target="_blank"
            className="mb-3 flex gap-2 items-center cursor-pointer"
            underline="hover"
            color="foreground"
          >
            <MapPointIcon width={30} height={30} fill="rgb(97, 3, 33)" />
            <small className="font-bold text-inherit">Direccion</small>
          </Link>
        </div>
      </div>

      <div className="bg-red-opacity w-full flex gap-4 justify-center flex-wrap px-20 py-2 mt-10">
        <Link underline="hover" className=" pr-5 lg:border-r-1 border-gray-500" color="secondary" as={NextLink} href="/aviso-legal">
          Aviso legal
        </Link>
        <Link underline="hover" className=" pr-5 lg:border-r-1 border-gray-500" color="secondary" as={NextLink} href="proteccion-de-datos">
          Proteccion de datos
        </Link>
        <Link underline="hover" className=" pr-5 lg:border-r-1 border-gray-500" color="secondary" as={NextLink} href="politica-de-cookies">
          Cookies
        </Link>
        <Link underline="hover" color="secondary" href="https://lsmsinergy.com" target="_blank">
          Creado por LSM Sinergy
        </Link>
      </div>
    </footer>
  );
}
