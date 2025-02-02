'use client';
import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Arrow from '@/components/carousel/Arrow';
// import Link from 'next/link';
import textShortener from '@/utils/text-shortener';
import formatCurrency from '@/utils/format-currency';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Phone, Share2 } from 'lucide-react';
import { MailIcon, WhatsappIcon } from '@/components/icons';
import Link from 'next/link';
import { PropertyPreview } from '@/components/property/admin/table';

export function PropertyCard(props: PropertyPreview) {
  return (
    <div>
      <img className={`h-[220px] w-full object-cover`} src={props.images[0]} alt="" />
      <div className="bg-gray-100 p-6 min-h-[267.20px] flex flex-col">
        <Link href={`/inmuebles/${props.slug}`}>
          <h5 className="text-2xl hover:underline cursor-pointer mb-2">{props.publicationTitle}</h5>
        </Link>
        {/*<p>{textShortener(props.description, 120)}</p>*/}
        <p className="text-gray-500 text-sm">
          {props.state}, {props.municipality}
        </p>
        <p className="mb-5 text-gray-500 text-sm">{props.urbanization}</p>
        <div className="flex gap-5 justify-center mt-auto">
          <small>{props.footageBuilding || props.footageGround} m2</small>
          <small className="border-x-1 border-gray-400 px-4">{props.propertyType}</small>
          <small>{props.operationType}</small>
        </div>
        <p className="text-red-900 text-center mt-5 text-4xl">{formatCurrency(props.price.toString())}</p>
      </div>
    </div>
  );
}

export function PropertyCardWithCarousel(props: {
  images: string[];
  path: string;
  code: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  state: string;
  municipality: string;
  street: string;
  avenue: string;
  urbanization: string;
  featured: string[];
}) {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
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

  const shareContent = (title: string, slug: string) => {
    const location = window.location;
    if (navigator.share) {
      navigator
        .share({
          title,
          text: 'Mira estos increíbles inmuebles que te pueden interesar.',
          url: location.origin + location.pathname + '/' + slug, // Gets the current URL
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Tu navegador no soporta compartir.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full mb-5 md:max-h-[400px] border-2 border-gray-200 rounded-r-lg rounded-l-lg md:rounded-l-none">
      <div className="navigation-wrapper w-full md:max-w-[300px] relative">
        <Link href={`/inmuebles/${props.path}`} ref={sliderRef} className="keen-slider">
          {props.images.map((image) => (
            <CarouselCard2 key={image} image={image} />
          ))}
        </Link>
        {loaded && instanceRef.current && props.images.length > 1 && (
          <>
            <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />

            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>
      <div className="px-6 pt-6 pb-2 w-full z-10 min-h-[290px] flex flex-col justify-between">
        <Link href={`/inmuebles/${props.path}`} className="flex justify-between">
          <div className="mb-2 flex items-center gap-5">
            <h3 className="text-2xl ">{textShortener(props.title, 100)}</h3>
            <p className="text-gray-500">{props.code}</p>
          </div>
          {/*<Button variant="outline" size="icon">*/}
          {/*  <Heart size={18} className="fill-red-500 text-red-500" />*/}
          {/*</Button>*/}
        </Link>
        <Link href={`/inmuebles/${props.path}`} className="text-red-900  font-bold text-2xl">
          {formatCurrency(props.price)}
        </Link>
        <Link href={`/inmuebles/${props.path}`}>
          <h5>
            {props.urbanization} - {props.municipality} - {props.state}
          </h5>
          <div className="flex gap-5 mt-2 mb-4">
            {props.featured.map((feature, index) => (
              <Badge variant="secondary" key={feature} className={`${index === 1 && 'px-4'}`}>
                {index === 0 ? `${feature} m2` : feature}
              </Badge>
            ))}
          </div>

          <p className="text-sm">{textShortener(props.description, 285)}</p>
        </Link>
        <Separator className="my-2" />
        <div className="flex md:flex-row flex-col gap-2 justify-end z-50">
          <Link href="tel:5804244095149">
            <Button variant="outline" size="icon" className="w-full md:w-[40px]">
              <Phone size={18} />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href="wa.me/5804244095149" target="_blank">
              <Button className="bg-[#25D366] hover:bg-[rgba(31,169,83,1)] gap-2 w-full md:w-[130px]">
                <p className="font-bold text-white">Whatsapp</p>
                <WhatsappIcon width={18} height={18} fill="white" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="vision" className="gap-2 w-full md:w-[130px]">
                <p className="font-bold text-white">Contactar</p>
                <MailIcon width={18} height={18} fill="white" />
              </Button>
            </Link>

            <Button variant="outline" size="icon" className="w-full md:w-[40px]" onClick={() => shareContent(props.title, props.slug)}>
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {/*{viewStyle === 'grid' && (*/}
      {/*    <div>*/}
      {/*        <div className="navigation-wrapper relative">*/}
      {/*            <div ref={sliderRef} className="keen-slider">*/}
      {/*                {props.images.map((image) => (*/}
      {/*                    <CarouselCard key={image} image={image} position="vertical"/>*/}
      {/*                ))}*/}
      {/*            </div>*/}
      {/*            {loaded && instanceRef.current && props.images.length > 1 && (*/}
      {/*                <>*/}
      {/*                    <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}*/}
      {/*                           disabled={currentSlide === 0}/>*/}

      {/*                    <Arrow*/}
      {/*                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}*/}
      {/*                        disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}*/}
      {/*                    />*/}
      {/*                </>*/}
      {/*            )}*/}
      {/*        </div>*/}
      {/*        <div*/}
      {/*            onClick={() => router.push(`/inmuebles/${props.path}`)}*/}
      {/*            className="bg-gray-100 cursor-pointer p-6 min-h-[240px] flex flex-col justify-between"*/}
      {/*        >*/}
      {/*            <h3 className="text-2xl">{textShortener(props.title, 90)}</h3>*/}
      {/*            <div>*/}
      {/*                <div className="flex gap-5 justify-center ">*/}
      {/*                    {props.featured.map((feature, index) => (*/}
      {/*                        <Badge variant="outline" key={feature}*/}
      {/*                               className={`${index === 1 && 'px-4'} text-red-900 border-red-900`}>*/}
      {/*                            {index === 0 ? `${feature} m2` : feature}*/}
      {/*                        </Badge>*/}
      {/*                    ))}*/}
      {/*                </div>*/}
      {/*                <p className="text-red-900 text-center mt-5 text-4xl">{formatCurrency(props.price)}</p>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*)}*/}
      {/*{viewStyle === 'list' && (*/}
      {/*  <div className="flex w-full mb-5 max-h-[400px] border-2 border-gray-200 rounded-r-lg">*/}
      {/*    <div className="navigation-wrapper max-w-[300px] relative">*/}
      {/*      <Link href={`/inmuebles/${props.path}`} ref={sliderRef} className="keen-slider">*/}
      {/*        {props.images.map((image) => (*/}
      {/*          <CarouselCard key={image} image={image} position="horizontal" />*/}
      {/*        ))}*/}
      {/*      </Link>*/}
      {/*      {loaded && instanceRef.current && props.images.length > 1 && (*/}
      {/*        <>*/}
      {/*          <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />*/}

      {/*          <Arrow*/}
      {/*            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}*/}
      {/*            disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}*/}
      {/*          />*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*    <div className="px-6 pt-6 pb-2 w-full z-10 min-h-[290px] flex flex-col justify-between">*/}
      {/*      <Link href={`/inmuebles/${props.path}`} className="flex justify-between">*/}
      {/*        <p className="text-gray-500">{props.code}</p>*/}
      {/*        <Button variant="outline" size="icon">*/}
      {/*          <Heart size={18} className="fill-red-500 text-red-500" />*/}
      {/*        </Button>*/}
      {/*      </Link>*/}
      {/*      <Link href={`/inmuebles/${props.path}`} className="text-red-900  font-bold text-2xl">*/}
      {/*        {formatCurrency(props.price)}*/}
      {/*      </Link>*/}
      {/*      <Link href={`/inmuebles/${props.path}`}>*/}
      {/*        <h5>*/}
      {/*          {props.municipality}, {props.state}*/}
      {/*        </h5>*/}
      {/*        /!*<h3 className="text-xl mb-2">{textShortener(props.title, 100)}</h3>*!/*/}
      {/*        <div className="flex gap-5 mt-2 mb-4">*/}
      {/*          {props.featured.map((feature, index) => (*/}
      {/*            <Badge variant="secondary" key={feature} className={`${index === 1 && 'px-4'}`}>*/}
      {/*              {index === 0 ? `${feature} m2` : feature}*/}
      {/*            </Badge>*/}
      {/*          ))}*/}
      {/*        </div>*/}

      {/*        <p className="text-sm">{textShortener(props.description, 285)}</p>*/}
      {/*      </Link>*/}
      {/*      <Separator className="my-2" />*/}
      {/*      <div className="flex gap-2 justify-end z-50">*/}
      {/*        <Button variant="outline" size="icon">*/}
      {/*          <Phone size={18} />*/}
      {/*        </Button>*/}
      {/*        <Button className="bg-[#25D366] hover:bg-[rgba(31,169,83,1)] gap-2">*/}
      {/*          <p className="font-bold text-white">Whatsapp</p>*/}
      {/*          <WhatsappIcon width={18} height={18} fill="white" />*/}
      {/*        </Button>*/}
      {/*        <Button variant="vision" className="gap-2">*/}
      {/*          <p className="font-bold text-white">Contactar</p>*/}
      {/*          <MailIcon width={18} height={18} fill="white" />*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}

function CarouselCard2(props: { title?: string; image?: string; link?: string }) {
  return (
    <div className="keen-slider__slide min-w-[300px]">
      <Image
        className="max-h-[300px] md:h-[290px] w-full md:w-[300px] object-cover rounded-bl rounded-tl"
        width={300}
        height={300}
        src={props.image!}
        alt="banner"
      />
    </div>
  );
}

// function CarouselCard(props: { title?: string; image?: string; link?: string; position: 'horizontal' | 'vertical' }) {
//   return (
//     <div className="keen-slider__slide min-w-[300px]">
//       <Image
//         className={` ${
//           props.position === 'vertical' ? 'h-[300px] w-full object-cover' : 'h-[290px] w-[300px] object-cover rounded-bl rounded-tl'
//         }`}
//         width={300}
//         height={300}
//         src={props.image!}
//         alt="banner"
//       />
//     </div>
//   );
// }
