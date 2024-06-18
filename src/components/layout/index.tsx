'use client';

import { useContext } from 'react';
import { UiContext } from '@/context/UiContext';
import { Link } from '@nextui-org/react';
import { FacebookIcon, InstagramIcon, MailIcon, MapPointIcon, TiktokIcon, WhatsappIcon } from '@/components/icons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children }: any) {
  const { showToolbar } = useContext(UiContext);

  return (
    <>
      {showToolbar &&
          <div className="w-full fixed z-50">
            <div className="bg-red-opacity flex justify-end items-center gap-4 py-2">
              <Link
                  href="https://www.tiktok.com/@somosvisioninmobiliaria"
                  target="_blank"
                  className=" flex gap-2 items-center cursor-pointer"
                  underline="hover"
                  color="foreground"
              >
                <TiktokIcon width={25} height={25} fill="rgb(97, 3, 33)"/>
              </Link>
              <Link
                  href="https://www.instagram.com/somosvisioninmobiliaria/"
                  target="_blank"
                  className=" flex gap-2 items-center cursor-pointer"
                  underline="hover"
                  color="foreground"
              >
                <InstagramIcon width={25} height={25} fill="rgb(97, 3, 33)"/>
              </Link>
              <Link
                  href="https://www.facebook.com/Somosvisioninmobiliaria/"
                  target="_blank"
                  className="flex gap-2 items-center cursor-pointer"
                  underline="hover"
                  color="foreground"
              >
                <FacebookIcon width={25} height={25} fill="rgb(97, 3, 33)"/>
              </Link>
              <Link
                  href="https://wa.me/584244095149"
                  target="_blank"
                  className=" flex gap-2 items-center cursor-pointer"
                  underline="hover"
                  color="foreground"
              >
                <WhatsappIcon width={25} height={25} fill="rgb(97, 3, 33)"/>
              </Link>
              <Link
                  href="mailto:ventas@visioninmobiliaria.com.ve"
                  target="_blank"
                  className=" flex gap-2 items-center cursor-pointer"
                  underline="hover"
                  color="foreground"
              >
                <MailIcon width={25} height={25} fill="rgb(97, 3, 33)"/>
              </Link>
              <Link
                  href="https://www.google.com/maps/place/Visi%C3%B3n+Inmobiliaria/@10.2444275,-68.0105401,17z/data=!3m1!4b1!4m5!3m4!1s0x8e805d6ea2ff11a9:0x454dae0b7a50bc4b!8m2!3d10.244425!4d-68.0083623"
                  target="_blank"
                  className=" flex gap-2 items-center cursor-pointer"
                  underline="hover"
                  color="foreground"
              >
                <MapPointIcon width={25} height={25} fill="rgb(97, 3, 33)"/>
              </Link>
            </div>
          </div>
      }

      {showToolbar && <Header/>}
      {children}
      <Footer/>
    </>
  );
}
