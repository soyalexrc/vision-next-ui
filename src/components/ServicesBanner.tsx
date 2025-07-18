import { SERVICES_DATA } from '@/utils/data/services';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ServicesBanner() {
  return (
    <div className="lg:px-24  py-10 m-10 bg-gray-800 w-full">
      <h2 className=" text-center text-white text-lg lg:text-2xl tracking-widest  mt-5 mb-10">
        Porque no somos otra inmobiliaria más, somos integrales.
      </h2>
      <div className="grid gap-x-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-y-10">
        {SERVICES_DATA.map((service) => (
          <Link key={service.title} href={service.href}>
            <div className={`flex flex-col items-center justify-center`}>
              <Image
                width={200}
                height={200}
                className="mb-3"
                src={service.img}
                alt={Array.isArray(service.title) ? service.title[0] : service.title}
              />
              <h6 className="text-white font-bold hidden md:block">
                {Array.isArray(service.title) ? (
                  <>
                    {service.title[0]} <br /> {service.title[1]}
                  </>
                ) : (
                  service.title
                )}
              </h6>
              <h6 className="text-white font-bold md:hidden text-center px-10">
                {Array.isArray(service.title) ? (
                  <>
                    {service.title[0]} <br /> {service.title[1]}
                  </>
                ) : (
                  service.title
                )}
              </h6>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/servicios">
          <Button size="lg" className="text-black bg-gray-200 w-[300px]">
            Ver detalle
          </Button>
        </Link>
      </div>
    </div>
  );
}
