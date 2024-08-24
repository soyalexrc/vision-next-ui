import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full">
      <div className="absolute hidden md:block top-0 left-0 h-full w-full bg-black opacity-50" />
      <Image className="object-cover w-full h-[300px] md:h-[92vh]" width={200} height={300} src="/home/induo-inmobiliaria.jpeg" alt="" />
    </div>
  );
}
