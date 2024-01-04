export default function AdvisersBanner() {
  return (
    <div className="lg:px-24">
      <h2 className="text-center text-3xl lg:text-4xl mb-10">Asesores inmobiliarios</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-5">
        <img className="w-full lg:h-[400px] object-cover" src="/home/asesor-comercial.jpg" alt="" />
        <img className="w-full lg:h-[400px] object-cover" src="/home/asesor-comercial.jpg" alt="" />
        <img className="w-full lg:h-[400px] object-cover" src="/home/asesor-comercial.jpg" alt="" />
      </div>
    </div>
  );
}
