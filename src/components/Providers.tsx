'use client';

import UiProvider from '@/context/UiContext';
import { NextUIProvider } from '@nextui-org/react';
import {Provider} from "react-redux";
import {store} from "@/lib/store";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
   <Provider store={store}>
       <NextUIProvider>
           <UiProvider>{children}</UiProvider>
       </NextUIProvider>
   </Provider>
  );
};
