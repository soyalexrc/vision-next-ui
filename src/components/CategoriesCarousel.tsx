import {useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import {Button} from "@nextui-org/react";

export default function CategoriesCarousel () {
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
            breakpoints: {
                "(min-width: 480px)": {
                    slides: {
                        perView: 1,
                        spacing: 5,
                    },
                },
                "(min-width: 700px)": {
                    slides: {
                        perView: 2,
                        spacing: 15,
                    },
                },
                "(min-width: 900px)": {
                    slides: {
                        perView: 3,
                        spacing: 15,
                    },
                },
                "(min-width: 1200px)": {
                    slides: {
                        perView: 4,
                        spacing: 15,
                    },
                }
            }
        },
        [
            // add plugins here
        ]
    )
    return (
        <section  className='px-24 py-12 w-full bg-gray-200'>
            <h2 className='text-center text-4xl mb-10'>Encuentra tu inmueble ideal</h2>
            <div className='navigation-wrapper'>
                <div ref={sliderRef} className="keen-slider">
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
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
    )
}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${
                props.left ? "arrow--left" : "arrow--right"
            } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}

function CarouselCard(props: {
    title?: string;
    image?: string;
    link?: string;
}) {
        return (
            <div className="keen-slider__slide relative">
                <img width='100%' height='100%' src="/home/lifestyle-banner-1.jpg" alt="banner"/>
                <div className='absolute bottom-0 left-0 w-full bg-black-opacity h-full flex flex-col items-center justify-end pb-6'>
                    <h4 className='text-white text-lg'>Alquileres vacacionales</h4>
                    <a className='underline text-blue-500'>Ver mas</a>
                </div>
            </div>
        )
}
