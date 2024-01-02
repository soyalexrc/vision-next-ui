import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import Layout from '@/components/layout';
import 'keen-slider/keen-slider.min.css';
import 'yet-another-react-lightbox/styles.css';
import UiProvider from '@/context/UiContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <UiProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UiProvider>
    </NextUIProvider>
  );
}
