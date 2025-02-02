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
            Corporación Visión Inmobiliaria CA, constituida en el año 2016 y representada desde sus inicios por nuestra CEO, quien tiene una
            trayectoria comercial desde mediados del año 2011 y quien sigue dirigiendo esta empresa con la visión y liderazgo que hoy nos
            caracteriza.
            <br />
            Nuestra Misión como organización, es brindar a nuestros clientes desde un concepto único, integral y confortable, el mejor, más
            profesional y más completo servicio inmobiliario en el mercado nacional e incluso medirnos a nivel internacional. Nuestros
            objetivos principales son garantizar la satisfacción del cliente, por medio de la realización a cabalidad de cada servicio y
            gestión ofrecida en la organización.
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

      {/*TODO pendiente*/}

      {/*<div className="bg-red-opacity w-full flex gap-4 justify-center flex-wrap px-20 py-2 mt-10">*/}
      {/*  <Link className="hover:underline pr-5 lg:border-r-1 border-gray-500" color="secondary" href="/aviso-legal">*/}
      {/*    Aviso legal*/}
      {/*  </Link>*/}
      {/*  <Link className="hover:underline pr-5 lg:border-r-1 border-gray-500" color="secondary" href="proteccion-de-datos">*/}
      {/*    Proteccion de datos*/}
      {/*  </Link>*/}
      {/*  <Link className="hover:underline pr-5 lg:border-r-1 border-gray-500" color="secondary" href="politica-de-cookies">*/}
      {/*    Cookies*/}
      {/*  </Link>*/}
      {/*  <Link color="secondary" className="hover:underline" href="https://lsmsinergy.com" target="_blank">*/}
      {/*    Creado por LSM Sinergy*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </footer>
  );
}
