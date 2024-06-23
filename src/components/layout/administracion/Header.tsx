'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell, HandCoins, Home, Menu, Settings } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserButton } from '@clerk/nextjs';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

type LinkType = {
  title: string;
  route: string;
  icon: JSX.Element;
};

const links: LinkType[] = [
  {
    title: 'Dashboard',
    route: '/dashboard',
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: 'Expenses',
    route: '/dashboard/expenses',
    icon: <HandCoins className="h-4 w-4" />,
  },
  {
    title: 'Settings',
    route: '/dashboard/settings',
    icon: <Settings className="h-4 w-4" />,
  },
];

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

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
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <span className="sr-only">Acme Inc</span>
            </Link>
            {links.map((link) => (
              <Link
                key={link.route}
                href={link.route}
                prefetch={true}
                onClick={() => setOpen(false)}
                className={`${
                  pathname === link.route && 'bg-muted'
                } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1" />
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <UserButton afterSignOutUrl='/ingreso' />
    </header>
  );
}
