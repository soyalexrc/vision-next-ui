import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactUsBanner() {
  return (
    <section className="w-full relative">
      <img className="w-full min-h-[300px]" src="/home/contact-banner.jpg" alt="" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
        <h2 className="text-center text-white lg:text-4xl">
          Te asesoramos para conseguir el propiedad <br />
          que estas buscando, de forma transparente y segura.
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
