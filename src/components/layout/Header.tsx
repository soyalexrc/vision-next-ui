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
import { Button } from '@/components/ui/button';
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
          <Link href="/" className="md:hidden">
            <Image title="Vision inmobiliaria logo" alt="Vision inmobiliaria logo" src="/vision-icon.png" width={50} height={50} />
          </Link>

          <Link href="/" className="hidden md:block">
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
                        href="/inmuebles?tipo-de-operacion=venta"
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
                          Descubre tu hogar ideal entre nuestra amplia selección de propiedades en venta.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <Link href="/inmuebles?tipo-de-propiedad=alquiler" legacyBehavior passHref>
                    <ListItem title="En alquiler">Alquila la casa o apartamento perfecto para tus necesidades y presupuesto.</ListItem>
                  </Link>
                  <Link href="/inmuebles?tipo-de-propiedad=estadias-vacacionales" legacyBehavior passHref>
                    <ListItem title="Estadias vacacionales">
                      Disfruta de unas vacaciones inolvidables en nuestras casas y apartamentos de temporada.
                    </ListItem>
                  </Link>
                  <Link href="/inmuebles?tipo-de-propiedad=estadias-residenciales" legacyBehavior passHref>
                    <ListItem title="Estadias residenciales ">
                      Encuentra tu hogar temporal ideal para estancias prolongadas o reubicaciones.
                    </ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[475px] gap-3 p-4  md:grid-cols-2  ">
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Servicio inmobiliario">
                      Te acompañamos en todo el proceso de compra, venta o alquiler de tu propiedad.
                    </ListItem>
                  </Link>
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Administracin de inmuebles alquilados">
                      Asesoría y gestión de los trámites legales relacionados con tu propiedad.
                    </ListItem>
                  </Link>
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Trámites legales">Servicio profesional de limpieza y mantenimiento de tu hogar.</ListItem>
                  </Link>
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Gestión contable">
                      Mantenemos tu propiedad en óptimas condiciones con nuestros servicios de mantenimiento integral.
                    </ListItem>
                  </Link>
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Ama de llaves (limpieza)">
                      Gestionamos tus propiedades de alquiler de forma eficiente y segura.
                    </ListItem>
                  </Link>
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Remodelación">
                      Llevamos a cabo la gestión contable de tu propiedad de forma transparente y precisa.
                    </ListItem>
                  </Link>
                  <Link href="/servicios" legacyBehavior passHref>
                    <ListItem title="Mantenimiento de inmuebles">
                      Convertimos tus sueños en realidad con nuestros servicios de remodelación y diseño de interiores.
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
                  <Link href="/equipo-de-trabajo" legacyBehavior passHref>
                    <ListItem title="Equipo de trabajo" href="">
                      Descubre a nuestro equipo de profesionales apasionados por el sector inmobiliario.
                    </ListItem>
                  </Link>
                  <Link href="/comentarios" legacyBehavior passHref>
                    <ListItem title="Comentarios" href="">
                      Lee las opiniones de nuestros clientes satisfechos y descubre por qué elegirnos.
                    </ListItem>
                  </Link>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Contacto</NavigationMenuTrigger>
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
                Tu aliado inmobiliario. Compra, venta, alquiler, administración y remodelación. Expertos y comprometidos con tu
                satisfacción.
              </SheetDescription>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl">Inmuebles</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=venta">En venta</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=alquiler">En Alquiler</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=estadias-vacacionales">Estadias vacaionales</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/inmuebles?tipo-de-operacion=estadias-residenciales">Estadias residenciales</Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl">Servicios</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Servicio inmobiliario</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Tramites legales</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Ama de llaves (limpieza)</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Mantenimiento de inmuebles</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Administracion de inmuebles alquilados</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Gestion contable</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/servicios">Remodelacion</Link>
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
                        <Link href="/equipo-de-trabajo">Equipo de trabajo</Link>
                      </li>
                      <li className="p-2 mb-1">
                        <Link href="/comentarios">Comentarios</Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-xl">Contacto</AccordionTrigger>
                  <AccordionContent>
                    <ul className="px-2 text-left">
                      <li className="p-2 mb-1">
                        <Link href="/contacto">Contactanos</Link>
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
