import { SERVICES_DATA } from '@/utils/data/services';
import { Button } from '@nextui-org/button';
import NextLink from 'next/link';

export default function ServicesBanner() {
  return (
    <div className="lg:px-24  py-10 m-10 bg-black-opacity w-full">
      <h2 className=" text-center text-white text-lg lg:text-2xl tracking-widest  mt-5 mb-10">
        Porque no somos otra inmobiliaria mas, somos integrales.
      </h2>
      <div className="grid gap-x-4 grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-y-10">
        {SERVICES_DATA.map((service) => (
          <div key={service.title} className={`flex flex-col items-center justify-center`}>
            <img className="mb-3" src={service.img} alt="" />
            <h6 className="text-white">{service.title}</h6>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button size="lg" as={NextLink} href="/servicios" variant="bordered" className="text-white">
          Ver detalle
        </Button>
      </div>
    </div>
  );
}
