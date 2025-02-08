'use client';

import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

const banners = [
  '/banners/banner-home-2.png',
  '/banners/acerca-de-nosotros.png',
  '/banners/Banner-inmuebles.png',
  '/banners/contacto.png',
  '/banners/servicios.png',
  '/banners/trabaja-con-nosotros.png',
];

export default function BannerCarousel() {
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
        {banners.map((src, index) => (
          <div key={index} className="keen-slider__slide relative">
            <div className="absolute hidden md:block top-0 left-0 h-full w-full bg-black opacity-30" />
            <Image
              className="object-cover object-bottom w-full h-[300px] md:h-[90vh]"
              width={1920}
              height={600}
              src={src}
              alt={`Banner ${index + 1}`}
            />
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
