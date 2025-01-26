'use client';
import { UiConfigProvider } from '@/lib/context/UiConfigContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: Props) => {
  return (
    <UiConfigProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UiConfigProvider>
  );
};
