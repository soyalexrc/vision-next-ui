'use client';

import Image from 'next/image';
import Lightbox from '@/components/property/Lightbox';
import { useState } from 'react';

interface ImageGridProps {
  images: string[];
}

export default function Component({ images = [] }: ImageGridProps) {
  const [show, setShow] = useState<boolean>(false);
  const [lastIndex, setLastIndex] = useState<number>(0);
  // Ensure we have exactly 5 images
  const gridImages = images.slice(0, 5);

  // If less than 5 images, fill the rest with placeholders
  while (gridImages.length < 5) {
    gridImages.push('/placeholder.webp');
  }

  function onImagePressed(index: number) {
    setLastIndex(index);
    setShow(true);
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 aspect-[2/1]">
          {/* First image - left half */}
          <div className="relative col-span-1 row-span-2">
            <Image
              onClick={() => onImagePressed(0)}
              src={gridImages[0]}
              alt="Main image"
              fill
              className="object-cover rounded-lg cursor-zoom-in"
            />
          </div>

          {/* Right half - 2x2 grid */}
          <div className="grid grid-cols-2 gap-4">
            {gridImages.slice(1).map((src, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  onClick={() => onImagePressed(index + 1)}
                  src={src}
                  alt={`Grid image ${index + 2}`}
                  fill
                  className="object-cover rounded-lg cursor-zoom-in"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {show && <Lightbox images={images} initialIndex={lastIndex} onClose={() => setShow(false)} />}
    </>
  );
}
