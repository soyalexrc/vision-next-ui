import {Button} from "@nextui-org/react";

export default function ContactUsBanner() {
    return (
        <section className='w-full relative'>
            <img style={{ width: '100%'}} src="/home/contact-banner.jpg" alt=""/>
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full'>
                <h2 className='text-center text-white text-4xl'>Te asesoramos para conseguir el inmueble <br/>
                    que estas buscando, de forma transparente y segura.</h2>
                <div className='flex justify-center mt-7'>
                    <Button size='lg' className='bg-red-900 text-white'>Contactanos</Button>
                </div>
            </div>
        </section>
    )
}
