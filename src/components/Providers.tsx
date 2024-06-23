'use client';

import UiProvider from '@/context/UiContext';
import { NextUIProvider } from '@nextui-org/react';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <UiProvider>{children}</UiProvider>
    </NextUIProvider>
  );
};
