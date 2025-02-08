'use client';
import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Arrow from '@/components/carousel/Arrow';
import { useCategories } from '@/lib/api/categories';
import { Categories } from '@prisma/client';
import Link from 'next/link';
// import Image from 'next/image';

export default function CategoriesCarousel() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isPending } = useCategories();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      breakpoints: {
        '(min-width: 480px)': {
          slides: {
            perView: 1,
            spacing: 5,
          },
        },
        '(min-width: 700px)': {
          slides: {
            perView: 2,
            spacing: 15,
          },
        },
        '(min-width: 900px)': {
          slides: {
            perView: 3,
            spacing: 15,
          },
        },
        '(min-width: 1200px)': {
          slides: {
            perView: 4,
            spacing: 15,
          },
        },
      },
    },
    [
      // add plugins here
    ],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef?.current?.next();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [instanceRef]);

  return (
    <section className="lg:px-24 py-12 w-full bg-gray-200">
      <h2 className="text-center text-2xl font-bold lg:font-medium  lg:text-4xl mb-10">Encuentra tu propiedad ideal</h2>
      {!isPending && data && data.length > 0 && (
        <div className="navigation-wrapper relative">
          <div ref={sliderRef} className="keen-slider">
            {data.map((category) => (
              <CarouselCard key={category.id} {...category} />
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />

              <Arrow
                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                disabled={currentSlide === instanceRef.current?.track?.details?.slides?.length - 1}
              />
            </>
          )}
        </div>
      )}
      {/*{loaded && instanceRef.current && (*/}
      {/*    <div className="dots">*/}
      {/*        {[*/}
      {/*            ...Array(instanceRef.current?.track.details.slides.length).keys(),*/}
      {/*        ].map((idx) => {*/}
      {/*            return (*/}
      {/*                <button*/}
      {/*                    key={idx}*/}
      {/*                    onClick={() => {*/}
      {/*                        instanceRef.current?.moveToIdx(idx)*/}
      {/*                    }}*/}
      {/*                    className={"dot" + (currentSlide === idx ? " active" : "")}*/}
      {/*                ></button>*/}
      {/*            )*/}
      {/*        })}*/}
      {/*    </div>*/}
      {/*)}*/}
    </section>
  );
}

function CarouselCard(props: Categories) {
  console.log(props);
  return (
    <div className="keen-slider__slide relative">
      {/*<Image src={props.image || '/home/lifestyle-banner-1.jpg'} alt={props.title} width={200} height={200} className="w-full" />*/}
      <img src={props.image || '/home/lifestyle-banner-1.jpg'} alt={props.title} className="w-full h-full" />
      {/*<img width="100%" height="100%" src="/home/lifestyle-banner-1.jpg" alt={props.title} />*/}
      <div className="absolute hidden md:block top-0 left-0 h-full w-full bg-black opacity-50" />
      <div className="absolute bottom-0 left-0 w-full  h-full flex flex-col items-center justify-end pb-6">
        <h4 className="text-white text-lg">{props.titlePlural}</h4>
        <Link href="/inmuebles" className="underline text-blue-500">
          Ver más
        </Link>
      </div>
    </div>
  );
}
