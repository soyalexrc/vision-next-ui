export default function WorkTeamPage() {
  return (
    <>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center">
          <h2 className="text-white lg:text-4xl tracking-widest">Nuestro equipo de trabajo</h2>
        </div>
      </section>
      <section className="lg:px-24 my-10">
        <h1 className="text-4xl text-center mb-10">Resena de equipo de trabajo</h1>
      </section>
    </>
  );
}
