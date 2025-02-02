'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="w-full pt-[41px] fixed top-0 z-40 bg-white shadow-sm">
      <nav className="p-2 flex justify-between items-center">
        <div>
          {/*<Link href="/" className="md:hidden">*/}
          {/*  <Image title="Vision inmobiliaria logo" alt="Vision inmobiliaria logo" src="/vision-icon.png" width={50} height={50} />*/}
          {/*</Link>*/}

          <Link href="/" className="">
            <Image title="Visión inmobiliaria logo" alt="Vision inmobiliaria logo" src="/vision-logo.png" width={120} height={60} />
          </Link>
        </div>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Inmuebles</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/inmuebles?tipo-de-operacion=venta&pagina=1&cantidad=10"
                      >
                        <Image
                          alt="propiedades menu imagen"
                          src="/home/latestElements/latest-1.jpg"
                          className="rounded-md"
                          width={160}
                          height={160}
                        />
                        <div className="mb-2 mt-4 text-lg font-medium">En venta</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Descubre tu inmueble ideal entre nuestra amplia selección de propiedades en venta.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <Link href="/inmuebles?tipo-de-operacion=alquiler&pagina=1&cantidad=10" legacyBehavior passHref>
                    <ListItem title="En alquiler">Alquila con nosotros el inmueble que andas buscando para lograr tus objetivos</ListItem>
                  </Link>
                  <Link href="/inmuebles?tipo-de-inmueble=Local Comercial&pagina=1&cantidad=10" legacyBehavior passHref>
                    <ListItem title="Comercial">Alquila el local comercial idóneo para tu emprendimiento</ListItem>
                  </Link>
                  <Link href="/inmuebles?tipo-de-operacion=estadias vacacionales&pagina=1&cantidad=10" legacyBehavior passHref>
                    <ListItem title="Hospedaje">Hospédate en la propiedad que se adapte mejor a tu comodidad</ListItem>
                  </Link>
                  <Link href="/inmuebles?tipo-de-operacion=estadias residenciales&pagina=1&cantidad=10" legacyBehavior passHref>
                    <ListItem title="Residencial">
                      Descubre nuestra sección de inmuebles de temporadas largas para la estabilidad de tu hogar
                    </ListItem>
                  </Link>
                  <Link href="/inmuebles?pagina=1&cantidad=10" legacyBehavior passHref>
                    <ListItem title="Industrial">Descubre el establecimiento industrial que requieres para tu empresa</ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[475px] gap-3 p-4  md:grid-cols-2  ">
                  <Link href="/servicios#servicio-inmobiliario" legacyBehavior passHref>
                    <ListItem title="Servicio inmobiliario">
                      Intermediacion y asesoría en la compra, venta y alquiler de propiedades, comerciales, residenciales e industriales.
                    </ListItem>
                  </Link>
                  <Link href="/servicios#admin-contratos-alquiler" legacyBehavior passHref>
                    <ListItem title="Servicio de administracion de contratos de alquiler">
                      Para aquellos propietarios que no tienen el tiempo, la disposición o el conocimiento de cómo llevar a cabo un
                      seguimiento adecuado de su alquiler, cumpliendo con la formalidad en términos legales.
                    </ListItem>
                  </Link>
                  <Link href="/servicios#tramites-legales" legacyBehavior passHref>
                    <ListItem title="Servicio Legal">
                      Asesoramos y gestionamos a través de Abogados en el área, los trámites legales que requieran y necesiten nuestros
                      clientes
                    </ListItem>
                  </Link>
                  <Link href="/servicios#gestion-contable" legacyBehavior passHref>
                    <ListItem title="Servicio Contable">
                      Enfocado principalmente para nuestros clientes comerciales, pequeñas y medianas empresas que requieran llevar su
                      contabilidad al dia y evitar ser multados por no llevar una gestión contable oportuna.
                    </ListItem>
                  </Link>
                  <Link href="/servicios#servicio-limpieza" legacyBehavior passHref>
                    <ListItem title="Servicio de limpieza - Ama de llaves">
                      Ofrecemos el servicio de mantenimiento enfocado para inmuebles residenciales y comerciales.
                    </ListItem>
                  </Link>
                  <Link href="/servicios#remodelacion" legacyBehavior passHref>
                    <ListItem title="Servicio de Remodelación de espacios ">
                      A través de nosotros puedes llevar a cabo cualquier obra de remodelación de tu propiedad comercial, residencial e
                      industrial.{' '}
                    </ListItem>
                  </Link>
                  <Link href="/servicios#mantenimiento" legacyBehavior passHref>
                    <ListItem title="Servicio Técnico de equipos">
                      Para tus electrodomésticos, aires acondicionados, lavadoras, artefactos de cocina y entretenimiento, estamos a tu
                      orden para brindarte solución ante cualquier instalación o reparación de tus equipos.{' '}
                    </ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Nosotros</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className=" w-[475px] gap-3 p-4  ">
                  <Link href="/acerca-de-nosotros" legacyBehavior passHref>
                    <ListItem title="Acerca de nosotros">
                      Conoce nuestra empresa, nuestra filosofía y nuestro compromiso con la excelencia.
                    </ListItem>
                  </Link>
                  <Link href="/acerca-de-nosotros#equipo-de-trabajo" legacyBehavior passHref>
                    <ListItem title="Equipo de trabajo" href="">
                      Descubre a nuestro equipo de profesionales apasionados por el sector inmobiliario.
                    </ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="h-[26px]">
              <Link href="/comentarios" legacyBehavior passHref>
                <NavigationMenuLink className="text-sm font-medium">Comentarios</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Contáctanos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[475px] gap-3 p-4 ">
                  <Link href="/contacto" legacyBehavior passHref>
                    <ListItem title="Contactanos">Envíanos un mensaje o llámanos para cualquier consulta o solicitud.</ListItem>
                  </Link>
                  <Link href="/trabaja-con-nosotros" legacyBehavior passHref>
                    <ListItem title="Trabaja con nosotros">
                      Únete a nuestro equipo de profesionales y forma parte de nuestra historia.
                    </ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex flex-col items-center">
                <Link href="/">
                  <Image title="Vision inmobiliaria logo" alt="Vision inmobiliaria logo" src="/vision-icon.png" width={50} height={50} />
                </Link>
                Vision Inmobiliaria
              </SheetTitle>
              <SheetDescription>
                Tu aliado inmobiliario, compra, venta, alquiler, administración y remodelación. Expertos y comprometidos con tu
                satisfacción.
              </SheetDescription>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl">Inmuebles</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=venta&pagina=1&cantidad=10">En venta</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=alquiler&pagina=1&cantidad=10">En Alquiler</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-inmueble=Local Comercial&pagina=1&cantidad=10">Comercial</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=estadias-residenciales&pagina=1&cantidad=10">Residencial</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=estadias-vacacionales&pagina=1&cantidad=10">Hospedaje</Link>
                      </li>

                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?pagina=1&cantidad=10">Industrial</Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl">Servicios</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/servicios#servicio-inmobiliario">Servicio Inmobiliario</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios#tramites-legales">Servicio Legal</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios#servicio-limpieza">Servicio de limpieza - Ama de llaves</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios#mantenimento">Servicio Técnico de equipos</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios#admin-contratos-alquiler">Servicio de administracion de contratos de alquiler</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios#gestion-contable">Servicio Contable</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios#remodelacion">Servicio de Remodelación de espacios </Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl">Nosotros</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/acerca-de-nosotros">Acerca de nosotros</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/acerca-de-nosotros#equipo-de-trabajo">Equipo de trabajo</Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <Link href="/comentarios">
                  <p className=" py-4 border-b-[1px] text-xl text-start hover:underline">Comentarios</p>
                </Link>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-xl">Contáctanos</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/contacto">Contáctanos</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/Trabaja con nosotros">Trabaja con nosotros</Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';
