'use client';

import { useEffect } from 'react';
import {redirect, usePathname, useRouter} from 'next/navigation';

interface Props {
  children: React.ReactNode;
  routes: { path: string; title: string }[];
}

export const ValidateRouteInRole = ({ children, routes }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!routes.find((route) => pathname.includes(route.path))) {
      router.replace(routes[0].path);
    }
  }, [pathname]);

  return children;
};
