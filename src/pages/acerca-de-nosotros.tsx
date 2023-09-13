import Image from "next/image";
import {Button} from "@nextui-org/react";

const images = [
    {
        src: '/about/office-1.jpg',
        alt: 'oficina 1'
    },
    {
        src: '/about/office-2.jpg',
        alt: 'oficina 2'
    },
    {
        src: '/about/office-3.jpg',
        alt: 'oficina 3'
    },
    {
        src: '/about/office-4.jpg',
        alt: 'oficina 4'
    },
    {
        src: '/about/office-5.jpg',
        alt: 'oficina 5'
    },
    {
        src: '/about/office-6.jpg',
        alt: 'oficina 6'
    },
]

export default function AboutUs() {
    return (
        <>
            <section className='relative'>
                <img src="/about/aboutBanner.jpg" className='h-[200px] object-cover lg:h-full' alt=""/>
                <div className='absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center'>
                    <h2 className='text-white lg:text-4xl tracking-widest'>Comienza una nueva ilusion</h2>
                </div>
            </section>
            <section className='lg:px-52'>
                <div className='my-10 border-b-1'>
                    <h3 className='tracking-widest text-xl uppercase text-center mb-5'>Vision inmobiliaria</h3>
                    <h1 className='text-center text-4xl mb-5'>Profesionales con más de veinte años de <br/>
                        experiencia</h1>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='flex justify-center relative h-[300px] lg:h-full'>
                        <Image
                            alt='Imagen de oficina de vision inmobiliaria'
                            objectFit="cover"
                            fill
                            className="w-full h-full top-0 left-0 object-cover"
                            src='/about/about-image.jpg'
                        />
                    </div>
                    <div className='px-4'>
                        Grupo Induo, es una empresa de intermediación inmobiliaria y gestión de activos, compuesta por
                        profesionales con más de veinte años de experiencia en el sector. Actualmente gestionamos el
                        patrimonio inmobiliario de particulares, entidades financieras y fondos de inversión, ya sea
                        residencial, comercial y terciario. También realizamos operaciones de Sale & Lease back.
                        Disponemos de profesionales altamente cualificados para ofrecer a nuestros clientes seguridad y
                        profesionalidad ante cualquier proyecto inmobiliario. Nuestro trabajo consiste en proporcionar a
                        nuestros clientes el tipo de activo que más se ajuste a sus intereses. Ofrecemos nuestros
                        servicios tanto a particulares, empresas y fondos de inversión, adecuando cada tipo de operación
                        a las preferencias y capacidad de cada uno.
                    </div>
                </div>
            </section>

            <section className='relative h-[400px] lg:h-[500px] my-10'>
                <Image
                    alt='Imagen de globos aereos'
                    objectFit='cover'
                    fill
                    className='w-full h-full top-0 left-0 object-cover'
                    src='/about/about-image-2.jpg'
                />
                <div
                    className='absolute top-0 left-0 z-10 bg-black-opacity w-full h-full flex justify-center items-center flex-col'>
                    <h2 className='text-center text-white text-2xl lg:text-4xl tracking-widest mb-5'>Tu hogar te espera aqui</h2>
                    <p className='text-center text-white text-sm lg:text-lg max-w-[700px]'>Únicamente al lugar donde vivimos, en el que sentimos seguridad y calma, podemos llamar hogar. En
                        Induo sabemos que no siempre es fácil encontrar ese sueño en forma de casa, que tan importante
                        es para cualquier persona. Por ello dedicamos todos nuestros esfuerzos en hacer realidad esta
                        ilusión, un hogar hecho a tu medida.</p>
                    <Button size='lg' className='bg-red-900 text-white mt-5'>Contactanos</Button>
                </div>

            </section>

            <section className='px-4 lg:px-24 grid grid-cols-1 lg:grid-cols-3 grid-rows-2 gap-4'>
                {
                    images.map(image => (
                        <img src={image.src} alt={image.alt} />
                    ))
                }
            </section>
        </>
    )
}

const imageLoader = ({src, width, quality}: any) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}


