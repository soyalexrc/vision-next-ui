'use client';

import Image from 'next/image';
import Lightbox from '@/components/property/Lightbox';
import { useState } from 'react';

type Props = {
  images: string[];
};

export default function Gallery({ images }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>(0);

  function onImagePressed(index: number) {
    setLastIndex(index);
    setShow(true);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {images.map((image: string, index) => (
          <Image
            onClick={() => onImagePressed(index)}
            width={200}
            height={200}
            className="w-full h-[400px] lg:h-[200px] object-cover rounded cursor-zoom-in"
            key={image}
            src={image}
            alt="Imagen de propiedad"
          />
        ))}
      </div>
      {show && <Lightbox images={images} initialIndex={lastIndex} onClose={() => setShow(false)} />}
    </>
  );
}
