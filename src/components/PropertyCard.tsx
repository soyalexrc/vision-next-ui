'use client';
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Arrow from '@/components/carousel/Arrow';
import Link from 'next/link';
import textShortener from '@/utils/text-shortener';
import formatCurrency from '@/utils/format-currency';

export function PropertyCard(props: { img: string }) {
  return (
    <div>
      <img className={`h-[220px] w-full object-cover`} src={props.img} alt="" />
      <div className="bg-gray-100 p-6 ">
        <h5 className="text-2xl hover:underline cursor-pointer mb-5">Piso con terraza en avenida de castilla</h5>
        <div className="flex gap-5 justify-center ">
          <small>86 m2</small>
          <small className="border-x-1 border-gray-400 px-4">3 Habitaciones</small>
          <small>2 P.E</small>
        </div>
        <p className="text-red-900 text-center mt-5 text-4xl">$ 295.000</p>
      </div>
    </div>
  );
}

export function PropertyCardWithCarousel(props: {
  images: string[];
  viewStyle: 'list' | 'grid';
  path: string;
  title: string;
  description: string;
  price: string;
  featured: string[];
}) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
        console.log('slide changed');
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
    },
    [
      // add plugins here
    ],
  );
  return (
    <>
      {props.viewStyle === 'grid' && (
        <div>
          <div className="navigation-wrapper relative">
            <div ref={sliderRef} className="keen-slider">
              {props.images.map((image) => (
                <CarouselCard key={image} image={image} position="vertical" />
              ))}
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />

                <Arrow
                  onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                  disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                />
              </>
            )}
          </div>
          <div className="bg-gray-100 p-6 min-h-[240px] flex flex-col justify-between">
            <Link color="foreground" href={`/inmuebles/${props.path}`} className="text-2xl cursor-pointer mb-5">
              {textShortener(props.title, 90)}
            </Link>

            <div>
              <div className="flex gap-5 justify-center ">
                {props.featured.map((feature, index) => (
                  <small key={feature + index} className={index === 1 ? 'border-x-1 border-gray-400 px-4' : ''}>
                    {index === 0 ? `${feature} m2` : feature}
                  </small>
                ))}
              </div>
              <p className="text-red-900 text-center mt-5 text-4xl">{formatCurrency(props.price)}</p>
            </div>
          </div>
        </div>
      )}
      {props.viewStyle === 'list' && (
        <div className="flex w-full mb-5 max-h-[400px]">
          <div className="navigation-wrapper max-w-[300px] relative">
            <div ref={sliderRef} className="keen-slider">
              {props.images.map((image) => (
                <CarouselCard key={image} image={image} position="horizontal" />
              ))}
            </div>
            {loaded && instanceRef.current && (
              <>
                <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />

                <Arrow
                  onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                  disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                />
              </>
            )}
          </div>
          <div className="bg-gray-100 p-6 w-full rounded-tr rounded-br min-h-[290px] flex flex-col justify-between">
            <div>
              <Link color="foreground" href={`/inmuebles/${props.path}`} className="text-2xl cursor-pointer mb-5">
                {textShortener(props.title, 100)}
              </Link>
              <div className="flex gap-5 mb-4">
                {props.featured.map((feature, index) => (
                  <small key={feature + index} className={index === 1 ? 'border-x-1 border-gray-400 px-4' : ''}>
                    {index === 0 ? `${feature} m2` : feature}
                  </small>
                ))}
              </div>

              <p className="text-sm">{textShortener(props.description, 285)}</p>
            </div>

            <p className="text-red-900 text-right mt-5 text-4xl">{formatCurrency(props.price)}</p>
          </div>
        </div>
      )}
    </>
  );
}

function CarouselCard(props: { title?: string; image?: string; link?: string; position: 'horizontal' | 'vertical' }) {
  return (
    <div className="keen-slider__slide min-w-[300px]">
      <img
        className={` ${
          props.position === 'vertical' ? 'h-[300px] w-full object-cover' : 'h-[290px] w-[300px] object-cover rounded-bl rounded-tl'
        }`}
        src={props.image}
        alt="banner"
      />
    </div>
  );
}
