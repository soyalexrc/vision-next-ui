'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logEvent } from 'firebase/analytics';
import analytics from '@/lib/firebase/analytics';

export const FirebaseAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!analytics) return;

    logEvent(analytics, 'page_view', { page_path: pathname });
  }, [pathname]);

  return null;
};
