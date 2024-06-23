'use client';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useClerk, UserButton } from '@clerk/nextjs';
import { AllowedRoute } from '@/lib/interfaces/Menu';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Icon from '@/components/ui/icon';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useClerk();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col">
          <SheetTitle>
            <Link href="#" className="flex items-center gap-2 mt-4 text-lg font-semibold">
              <span>Vision Admin</span>
            </Link>
          </SheetTitle>
          <nav className="grid gap-2 text-lg font-medium">
            {user &&
              (user?.publicMetadata.allowedRoutes as AllowedRoute[]).map(
                (route: { path: string; title: string; icon: keyof typeof dynamicIconImports }) => (
                  <Link
                    key={route.path}
                    href={route.path ?? ''}
                    prefetch={true}
                    className={`${
                      pathname === route.path && 'bg-muted'
                    } flex items-center gap-3 rounded-lg py-1 text-muted-foreground transition-all hover:text-primary`}
                  >
                    <Icon name={route.icon} />
                    {route.title}
                  </Link>
                ),
              )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1" />
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <UserButton afterSignOutUrl="/ingreso" />
    </header>
  );
}
