import {useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import Arrow from "@/components/carousel/Arrow";
import {pop} from "@jridgewell/set-array";
import {Link} from "@nextui-org/react";
import NextLink from "next/link";
import textShortener from "@/utils/text-shortener";

export function PropertyCard(props: { img: string }) {
    return (
        <div>
            <img className={`h-[220px] w-full object-cover`} src={props.img} alt=""/>
            <div className='bg-gray-100 p-6 '>
                <h5 className='text-2xl hover:underline cursor-pointer mb-5'>Piso con terraza en avenida de
                    castilla</h5>
                <div className='flex gap-5 justify-center '>
                    <small>86 m2</small>
                    <small className='border-x-1 border-gray-400 px-4'>3 Habitaciones</small>
                    <small>1 Bano</small>
                </div>
                <p className='text-red-900 text-center mt-5 text-4xl'>$ 295.000</p>
            </div>
        </div>
    )
}


export function PropertyCardWithCarousel(props: {
    images: string[],
    viewStyle: 'list' | 'grid',
    path: string,
    title: string,
    description: string,
    price: string,
}) {
    const [loaded, setLoaded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            slideChanged(slider) {
                console.log('slide changed')
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setLoaded(true)
            },
            loop: true,
        },
        [
            // add plugins here
        ]
    )
    return (
        <>
            {
                props.viewStyle === 'grid' &&
                <div>
                    <div className='navigation-wrapper'>
                        <div ref={sliderRef} className="keen-slider">
                            {
                                props.images.map(image => (
                                    <CarouselCard key={image} image={image} position='vertical'/>
                                ))
                            }
                        </div>
                        {loaded && instanceRef.current && (
                            <>
                                <Arrow
                                    left
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    disabled={currentSlide === 0}
                                />

                                <Arrow
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    disabled={
                                        currentSlide ===
                                        instanceRef.current.track.details.slides.length - 1
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className='bg-gray-100 p-6 '>
                        <Link as={NextLink} color='foreground' underline='hover' href={`/inmuebles/${props.path}`} className='text-2xl cursor-pointer mb-5'>{props.title}</Link>

                        <div className='flex gap-5 justify-center '>
                            <small>86 m2</small>
                            <small className='border-x-1 border-gray-400 px-4'>3 Habitaciones</small>
                            <small>1 Bano</small>
                        </div>
                        <p className='text-red-900 text-center mt-5 text-4xl'>$ {props.price}</p>
                    </div>
                </div>
            }
            {
                props.viewStyle === 'list' &&
                <div className='flex w-full mb-5 max-h-[400px]'>
                    <div className='navigation-wrapper max-w-[300px]'>
                        <div ref={sliderRef} className="keen-slider">
                            {
                                props.images.map(image => (
                                    <CarouselCard key={image} image={image} position='horizontal'/>
                                ))
                            }
                        </div>
                        {loaded && instanceRef.current && (
                            <>
                                <Arrow
                                    left
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    disabled={currentSlide === 0}
                                />

                                <Arrow
                                    onClick={(e: any) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    disabled={
                                        currentSlide ===
                                        instanceRef.current.track.details.slides.length - 1
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className='bg-gray-100 p-6 w-full rounded-tr rounded-br'>
                        <Link as={NextLink} color='foreground' underline='hover' href={`/inmuebles/${props.path}`} className='text-2xl cursor-pointer mb-5'>{props.title}</Link>
                        <div className='flex gap-5 mb-4'>
                            <small>86 m2</small>
                            <small className='border-x-1 border-gray-400 px-4'>3 Habitaciones</small>
                            <small>1 Bano</small>
                        </div>

                        <p className='text-sm'>{textShortener(props.description, 285)}</p>

                        <p className='text-red-900 text-right mt-5 text-4xl'>$ {props.price}</p>

                    </div>
                </div>
            }
        </>
    )
}


function CarouselCard(props: {
    title?: string;
    image?: string;
    link?: string;
    position: 'horizontal' | 'vertical'
}) {
    return (
        <div className="keen-slider__slide min-w-[300px]">
            <img
                className={` ${props.position === 'vertical' ? 'h-[300px] w-full object-cover' : 'h-full max-h-[300px] w-[300px] object-cover rounded-bl rounded-tl'}`}
                src={props.image} alt="banner"/>
        </div>
    )
}
