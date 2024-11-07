'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        navigate(-1);
      } else if (event.key === 'ArrowRight') {
        navigate(1);
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const navigate = (step: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + step;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image src={images[currentIndex]} alt={`Full screen image ${currentIndex + 1}`} fill className="object-contain" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white hover:text-gray-300 focus:outline-none p-2 rounded-full"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white hover:text-gray-300 focus:outline-none p-2 rounded-full"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
