import React from 'react';
import Footer from '@/components/layout/Footer';
import SocialMediaHeader from '@/components/layout/SocialMediaHeader';
import Header from '@/components/layout/Header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full fixed z-50">
        <SocialMediaHeader />
      </div>
      <Header />
      <main className="pt-[6.5rem]">{children}</main>
      <Footer />
    </>
  );
}
