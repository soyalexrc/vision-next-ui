import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import Icon from '@/components/ui/icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type AllowedRoute = {
  title: string;
  path: string;
  icon: keyof typeof dynamicIconImports;
};

export default async function Sidenav() {
  // const pathname = usePathname();
  const user = await currentUser();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/administracion" className="flex items-center gap-2 font-semibold">
            <span className="">Vision Inmobiliaria - Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {(user?.publicMetadata.allowedRoutes as AllowedRoute[]).map(
              (route: { path: string; title: string; icon: keyof typeof dynamicIconImports }) => (
                <Link
                  key={route.path}
                  href={route.path ?? ''}
                  prefetch={true}
                  className={`${
                    'sample' === route.path && 'bg-muted'
                  } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                >
                  <Icon name={route.icon} />
                  {route.title}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
