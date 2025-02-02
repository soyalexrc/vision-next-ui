import Image from 'next/image';

export default function Banner() {
  return (
    <div className="relative w-full">
      <div className="absolute hidden md:block top-0 left-0 h-full w-full bg-black opacity-30" />
      <Image
        objectFit="cover"
        className="object-cover object-bottom w-full h-[300px] md:h-[80vh]"
        width={1920}
        height={600}
        src="/banners/banner-home-2.png"
        alt=""
      />
    </div>
  );
}
