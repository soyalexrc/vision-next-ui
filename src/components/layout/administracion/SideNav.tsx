import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { AllowedRoute } from '@/lib/interfaces/Menu';
import MenuItem from '@/components/layout/administracion/MenuItem';
import Image from 'next/image';
import getConfig from 'next/config';

export default async function Sidenav() {
  const { publicRuntimeConfig } = getConfig();
  const user = await currentUser();
  const defaultRoutes = user?.publicMetadata.allowedRoutes as AllowedRoute[];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href={defaultRoutes[0].path || '/administracion'} className="flex items-center gap-2 font-semibold">
            <Image src="/vision-icon.png" alt="Logo de vision inmobiliaria" width={30} height={30} />
            <div>
              <span className="">Vision Inmobiliaria</span>
              <br />
              <span className="text-xs text-blue-500">Version {publicRuntimeConfig.version}</span>
            </div>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {(user?.publicMetadata.allowedRoutes as AllowedRoute[]).map((route: { path: string; title: string }) => (
              <MenuItem key={route.path} route={route} />
            ))}
            {/*<MenuItem route={{ path: '/administracion/contacto', title: 'Contacto' }} />*/}
            {/*<MenuItem route={{ path: '/administracion/trabaja-con-nosotros', title: 'Trabaja con Nosotros' }} />*/}
          </nav>
        </div>
      </div>
    </div>
  );
}
