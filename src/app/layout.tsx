import React from 'react';
import { Metadata } from 'next';
import '@/styles/globals.css';
import 'keen-slider/keen-slider.min.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Vision inmobiliaria',
    template: '%s | Vision inmobiliaria',
  },
  description: `¿Buscas comprar, vender o alquilar una propiedad en Venezuela? En Vision Inmobiliria te ofrecemos un servicio personalizado y profesional. Tasaciones, trámites legales, asesoría inmobiliaria y más.`,
  keywords: [
    'comprar casa en Venezuela',
    'vender apartamento en Venezuela',
    'alquiler de propiedades en Venezuela',
    'inmobiliaria en Venezuela',
    'inmobiliaria en Venezuela',
    'agencia inmobiliaria Venezuela',
    'buscar vivienda en Venezuela',
    'propiedades en venta Venezuela',
    'inmuebles en alquiler Venezuela',
    'tasación de propiedades',
    'alquiler con opción a compra',
    'gestión de propiedades',
    'asesoría inmobiliaria',
    'casas en venta',
    'apartamentos en alquiler',
    'locales comerciales en venta',
    'oficinas en alquiler',
    'terrenos en venta',
    'fincas en venta',
    'terrenos en venta',
  ],
  creator: 'Vision inmobiliaria venezuela',
  manifest: 'https://visioninmobiliaria.com.ve/manifest.json',
  publisher: 'Vision inmobiliaria venezuela',
  applicationName: 'Vision inmobiliaria venezuela',
  alternates: {
    canonical: 'https://visioninmobiliaria.com.ve',
  },
  authors: [
    { url: 'https://alexleonardo.dev', name: 'Alex Rodriguez' },
    { url: 'https://lsmsinergy.com', name: 'LSM Synergy company' },
  ],
  openGraph: {
    title: 'Vision inmobiliaria',
    description: `¿Buscas comprar, vender o alquilar una propiedad en Venezuela? En Vision Inmobiliria te ofrecemos un servicio personalizado y profesional. Tasaciones, trámites legales, asesoría inmobiliaria y más.`,
    type: 'website',
    images: {
      url: 'https://firebasestorage.googleapis.com/v0/b/vision-inmobiliaria-636c6.appspot.com/o/Archivos%20generales%20del%20sistema%20(NO%20ELIMINAR)%2Fasesor-comercial.jpg?alt=media&token=0e82e01c-868f-463b-8ee6-c2d647a96480',
      type: 'image/jpg',
      alt: 'imagen de oficina de vision inmobiliaria venezuela',
      height: 630,
      width: 1200,
    },
    url: 'https://visioninmobiliaria.com.ve',
    countryName: 'Venezuela',
    siteName: 'https://visioninmobiliaria.com.ve',
    locale: 'es_VE',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className={cn('min-h-screen bg-background font-sans antialiased overflow-x-hidden', inter.variable)}>
          <ClerkProvider localization={esES}>
            <Providers>{children}</Providers>
          </ClerkProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
