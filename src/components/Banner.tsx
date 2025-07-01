'use client';

import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const banners = [
  '/banners/banner-home-2.png',
  '/banners/acerca-de-nosotros.png',
  '/banners/Banner-inmuebles.png',
  '/banners/contacto.png',
  '/banners/servicios.png',
  '/banners/trabaja-con-nosotros.png',
];

const bannersMobile = [
  '/banners/mobile/acerca-de-nosotros.png',
  '/banners/mobile/contacto.png',
  '/banners/mobile/servicios.png',
  '/banners/mobile/trabaja-con-nosotros.png',
  '/banners/mobile/expertos.png',
  '/banners/mobile/testimonios.png',
];

export default function BannerCarousel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Change to `true` if width < 768px
    };

    updateScreenSize(); // Run initially
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const activeBanners = isMobile ? bannersMobile : banners;
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    mode: 'snap',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef?.current?.next();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [instanceRef]);

  return (
    <div className="relative w-full">
      <div ref={sliderRef} className="keen-slider">
        {activeBanners.map((src, index) => (
          <div key={index} className="keen-slider__slide relative aspect-[16/9] md:aspect-[12/5]">
            <div className="absolute hidden md:block top-0 left-0 h-full w-full bg-black opacity-30 z-10" />
            <Image className="object-cover w-full h-full" fill src={src} alt={`Banner ${index + 1}`} sizes="100vw" />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={() => instanceRef.current?.prev()}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={() => instanceRef.current?.next()}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
