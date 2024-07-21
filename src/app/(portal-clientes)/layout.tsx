import React from 'react';
import Link from 'next/link';
import { SelectIcon } from '@/components/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SocialMediaLink } from '@prisma/client';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const socialMedia = await fetch(`${process.env.HOST_URL}/api/socialMedia`, {
    cache: 'force-cache',
    next: { tags: ['socialMedia'] },
    method: 'GET',
  }).then((res) => res.json());

  return (
    <>
      <div className="w-full fixed z-50">
        <div className="bg-red-100 flex justify-end items-center gap-4 py-2">
          {socialMedia.map((item: SocialMediaLink) => (
            <Link key={item.id} href={item.href} target="_blank" className=" flex gap-2 items-center cursor-pointer" color="foreground">
              <SelectIcon icon={item.iconName} />
            </Link>
          ))}
        </div>
      </div>
      <Header />
      {children}
      <Footer socialMediaLinks={socialMedia} />
    </>
  );
}
