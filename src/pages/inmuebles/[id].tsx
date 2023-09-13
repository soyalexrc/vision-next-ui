import {Inter} from 'next/font/google'
import {Button, Checkbox, Input, Link, Textarea} from '@nextui-org/react'
import {http} from "@/utils/axios";
import Image from "next/image";
import NextLink from "next/link";
import Lightbox from "yet-another-react-lightbox";
import NextJsImage from "@/components/lightbox/NextJsImage";
import {useState} from "react";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import formatSlides from "@/utils/getSlides";



const inter = Inter({subsets: ['latin']})

export default function Property({property}: any) {
    const [openGallery, setOpenGallery] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    console.log(property);


    function handleOpenGallery(index: number) {
        setImgIndex(index);
        setOpenGallery(true)
    }


    return (
        <main
            className={`min-h-screen ${inter.className}`}
        >
            <div className='w-full h-[300px] lg:h-[500px] relative'>
                <Image
                    fill
                    priority
                    alt='Property image'
                    className='top-0 left-0 w-full h-full object-cover'
                    src={property.images[0]}
                />
            </div>
            <div className='border-b-8 pb-5 mt-5 mb-5 border-red-opacity'>
                <div className='lg:px-24'>
                    <div className='hidden justify-between lg:flex'>
                        <div>
                            <h1 className='text-4xl'>Titulo de inmueble</h1>
                            <h2 className='text-2xl mt-3'>Ubicacion corta - {property.generalInformation.code}</h2>
                        </div>
                        <div className=''>
                            <h2 className='text-xl'>{property.generalInformation.operationType}</h2>
                            <h3 className='text-4xl mt-3 text-red-900'>$ {property.negotiationInformation.price}</h3>
                        </div>
                    </div>
                    <div className='lg:hidden px-4'>
                        <h1 className='text-2xl'>Titulo de inmueble</h1>
                        <h2 className='text-lg mt-3'>Ubicacion corta - {property.generalInformation.code}</h2>
                        <h2 className='text-xl'>{property.generalInformation.operationType}</h2>
                        <h3 className='text-3xl text-center mt-3 text-red-900'>$ {property.negotiationInformation.price}</h3>
                    </div>
                    <div className='mt-5'>
                        <div className='flex gap-5 justify-center lg:justify-start '>
                            <small>86 m2</small>
                            <small className='border-x-1 border-gray-400 px-4'>3 Habitaciones</small>
                            <small>1 Bano</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className='lg:px-24 grid gap-10 grid-cols-1 lg:grid-cols-12'>
                <div className='lg:col-span-9 border-b-1 pb-5 lg:border-none lg:pb-0'>
                    <div className='px-4'>
                        <h3 className='text-2xl mb-5'>Descripcion</h3>
                        <p>{property.generalInformation.description}</p>
                    </div>

                    <div className='px-4'>
                        <h3 className='text-2xl mb-5'>Caracteristicas</h3>
                        <p>---</p>
                    </div>

                    <div>
                        <h3 className='px-4 text-2xl mb-5'>Galeria</h3>
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
                            {property && property.images && property.images.length  > 0 &&property.images.map((image: string, index: number) => (
                                <img onClick={() => handleOpenGallery(index)} className='w-full h-[150px] lg:h-[200px] object-cover rounded cursor-zoom-in' key={image} src={image} alt=""/>
                            ))}
                        </div>
                    </div>
                    <div className='px-4'>
                        <h3 className='text-2xl mb-5'>Ubicacion</h3>
                        <p>location here</p>
                    </div>
                </div>
                <div className='px-4 lg:col-span-3'>
                    <h3 className='text-2xl text-center mb-3'>Contactanos</h3>
                    <p className='text-sm text-center lg:text-left'>Si deseas más información sobre esta propiedad, por favor, rellena el formulario.</p>
                    <div className='my-5'>
                        <Input size='sm' variant='bordered' className='mb-4' type="text" label="Nombres y apellidos"/>
                        <Input size='sm' variant='bordered' className='mb-4' type="email" label="Email"/>
                        <Input size='sm' variant='bordered' className='mb-4' type="tel" label="Telefono"/>
                        <Textarea
                            minRows={8}
                            variant='bordered'
                            label="Mensaje"
                            className="w-full"
                        />
                        <div className='my-5'>
                            <Checkbox defaultSelected/>
                            <span className='text-xs'>He leido y acepto los <Link className='text-xs' underline='always' as={NextLink}
                                                                                  href='/'>terminos y condiciones</Link></span>
                        </div>


                        <div className='flex justify-center'>
                            <Button size='lg' className='bg-red-900 text-white'>Enviar informacion</Button>
                        </div>
                    </div>
                </div>
            </div>


            <Lightbox
                open={openGallery}
                index={imgIndex}
                close={() => setOpenGallery(false)}
                slides={formatSlides(property.images)}
                render={{ slide: NextJsImage }}
                plugins={[Zoom]}
            />
        </main>
    )
}

export async function getStaticPaths() {
    const res = await http.get('/property/previews?pageIndex=1&pageSize=10');
    const properties = await res.data.rows;

    const paths = properties.map((property: any) => ({
        params: {id: property.id.toString()}
    }))

    console.log(paths);

    return {paths, fallback: 'blocking'};

}


export async function getStaticProps({params}: any) {
    const res = await http.get(`/property/${params.id}`);
    const finalProperty = await res.data;

    return {props: {property: finalProperty, revalidate: 60}}
}


