import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactUsBanner() {
  return (
    <section className="w-full relative aspect-[4/3] md:aspect-[5/2]">
      <div className="absolute hidden md:block top-0 left-0 h-full w-full bg-black opacity-70 z-10" />
      <Image className="object-cover" src="/banners/home.jpg" alt="" fill sizes="100vw" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full z-20">
        <h2 className="text-center text-white lg:text-4xl">
          Te asesoramos para conseguir la propiedad <br />
          que estas buscando de forma transparente y segura.
        </h2>
        <div className="flex justify-center mt-7">
          <Link href="/contacto">
            <Button size="lg" className="bg-red-900 text-white">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
