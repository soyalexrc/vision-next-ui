import Image from 'next/image';
import Link from 'next/link';
import { SocialMediaLink } from '@prisma/client';
import { SelectIcon } from '@/components/icons';

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

export default function Footer({ socialMediaLinks }: { socialMediaLinks: SocialMediaLink[] }) {
  return (
    <footer className="border-t-8 border-red-opacity mt-10 pt-5">
      <div className="lg:grid gap-4 grid-cols-12 px-5">
        <div className="col-span-6 lg:px-20 ">
          <Image alt="Logo de Visión Vnmobiliaria" width={130} height={100} src="/vision-logo.png" />
          <p className="text-sm mt-4">
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
                <Link href={link.path} className="hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <h3 className="text-xl my-10">Contáctanos</h3>
          {socialMediaLinks.map((link) => (
            <Link key={link.id} href={link.href} target="_blank" className="mb-3 flex gap-2 items-center cursor-pointer" color="foreground">
              <SelectIcon icon={link.iconName} />
              <small className="font-bold text-inherit">{link.title}</small>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-red-opacity w-full flex gap-4 justify-center flex-wrap px-20 py-2 mt-10">
        <Link className="hover:underline pr-5 lg:border-r-1 border-gray-500" color="secondary" href="/aviso-legal">
          Aviso legal
        </Link>
        <Link className="hover:underline pr-5 lg:border-r-1 border-gray-500" color="secondary" href="proteccion-de-datos">
          Proteccion de datos
        </Link>
        <Link className="hover:underline pr-5 lg:border-r-1 border-gray-500" color="secondary" href="politica-de-cookies">
          Cookies
        </Link>
        <Link color="secondary" className="hover:underline" href="https://lsmsinergy.com" target="_blank">
          Creado por LSM Sinergy
        </Link>
      </div>
    </footer>
  );
}
