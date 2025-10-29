'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store/index';

interface Props {
  children: any;
}

export const AdminProviders = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
