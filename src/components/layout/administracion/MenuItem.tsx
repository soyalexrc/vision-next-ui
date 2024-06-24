'use client';

import Link from 'next/link';
import { AllowedRoute } from '@/lib/interfaces/Menu';
import { usePathname } from 'next/navigation';
import {
  BookUser,
  Building,
  Calculator,
  Coins,
  ContactRound,
  FileCog,
  FolderCog,
  LayoutDashboard,
  SquareUserRound,
  UserRoundCog,
  UsersRound,
} from 'lucide-react';

const menuIcons: Record<string, React.ReactNode> = {
  '/administracion': <LayoutDashboard />,
  '/administracion/clientes': <BookUser />,
  '/administracion/usuarios': <UserRoundCog />,
  '/administracion/asesores-externos': <ContactRound />,
  '/administracion/aliados': <UsersRound />,
  '/administracion/propiedades': <Building />,
  '/administracion/flujo-de-caja': <Coins />,
  '/administracion/administracion-interna': <FolderCog />,
  '/administracion/propietarios': <SquareUserRound />,
  '/administracion/calculo-de-comisiones': <Calculator />,
  '/administracion/gestion-de-archivos': <FileCog />,
};

export default function MenuItem({ route }: { route: AllowedRoute }) {
  const pathname = usePathname();
  return (
    <Link
      key={route.path}
      href={route.path ?? ''}
      prefetch={true}
      className={`
      ${pathname.includes(route.path.split('/')[2]) && 'bg-muted'}
      ${pathname === '/administracion' && route.path === '/administracion' && 'bg-muted'}
         flex items-center gap-3 rounded-lg md:px-3 py-1 md:py-2 text-muted-foreground transition-all hover:text-primary`}
    >
      {menuIcons[route.path]}
      {route.title}
    </Link>
  );
}
