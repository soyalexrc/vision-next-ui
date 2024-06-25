'use client';

import UiProvider from '@/context/UiContext';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <UiProvider>{children}</UiProvider>
    </Provider>
  );
};
