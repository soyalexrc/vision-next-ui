import { PropertyCard } from '@/components/PropertyCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const elements = [
  {
    id: '1',
    img: '/home/latestElements/latest-1.jpg',
  },
  {
    id: '2',
    img: '/home/latestElements/latest-2.jpg',
  },
  {
    id: '3',
    img: '/home/latestElements/latest-3.jpg',
  },
  {
    id: '4',
    img: '/home/latestElements/latest-4.jpg',
  },
  {
    id: '5',
    img: '/home/latestElements/latest-5.jpg',
  },
  {
    id: '6',
    img: '/home/latestElements/latest-6.jpg',
  },
  {
    id: '7',
    img: '/home/latestElements/latest-7.jpg',
  },
  {
    id: '8',
    img: '/home/latestElements/latest-8.jpg',
  },
  {
    id: '9',
    img: '/home/latestElements/latest-9.jpg',
  },
];

export default function FeaturedProperties() {
  return (
    <section className="lg:px-24">
      <h2 className="text-2xl font-bold lg:font-medium lg:text-4xl py-10 text-center">Conoce las propiedades que tenemos para ti</h2>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 grid-rows-3">
        {elements.map((element) => (
          <PropertyCard img={element.img} key={element.id} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/inmuebles?pagina=1&limite=10">
          <Button className="bg-red-900 text-white w-[300px]">
            Ver más
          </Button>
        </Link>
      </div>
    </section>
  );
}
