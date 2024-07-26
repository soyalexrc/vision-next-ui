'use client';

import { useUiConfig } from '@/lib/context/UiConfigContext';

export default function PropertyListWrapper({ children }: { children: React.ReactNode }) {
  const { viewStyle } = useUiConfig();
  return <div className={`${viewStyle === 'grid' && 'grid'} gap-4 grid-cols-1 lg:grid-cols-2 `}>{children}</div>;
}
