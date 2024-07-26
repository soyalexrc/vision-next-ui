'use client';
import { UiConfigProvider } from '@/lib/context/UiConfigContext';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return <UiConfigProvider>{children}</UiConfigProvider>;
};
