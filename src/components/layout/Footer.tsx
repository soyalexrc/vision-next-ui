'use client';
import Image from 'next/image';
import Link from 'next/link';
import { SelectIcon } from '@/components/icons';
import { useSocialMediaLinks } from '@/lib/api/general/footer';

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
  const { data, isPending } = useSocialMediaLinks();

  return (
    <footer className="border-t-8 border-red-opacity mt-10 pt-5">
      <div className="lg:grid gap-4 grid-cols-12 px-5">
        <div className="col-span-6 lg:px-20 ">
          <Image alt="Logo de Visión Vnmobiliaria" width={130} height={100} src="/vision-logo.png" />
          <p className="text-sm mt-4">
            Somos una empresa de intermediación inmobiliaria con un concepto integral, que nos define y nos diferencia del mercado porque no
            solo le brindamos a nuestros clientes la asesoría de compra, venta y alquiler de sus propiedades comerciales, residenciales e
            industriales, sino que también, les ofrecemos distintos servicios complementarios y necesarios para llevar a cabo cualquier
            acción que requieran con su propiedad desde propietarios e inquilinos, garantizando así, el servicio más completo del mercado en
            un solo lugar y de manera confiable y segura, ya que es llevado a cabo a través de profesionales en cada área.
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
          {!isPending &&
            data &&
            data.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                target="_blank"
                className="mb-3 flex gap-2 items-center cursor-pointer"
                color="foreground"
              >
                <SelectIcon icon={link.iconName} />
                <small className="font-bold text-inherit">{link.title}</small>
              </Link>
            ))}
        </div>
      </div>

      {/*TODO pendiente*/}

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
        <Link color="secondary" className="hover:underline" target="_blank]" href="https://admin.visioninmobiliaria.com.ve">
          Administracion
        </Link>
      </div>
    </footer>
  );
}
