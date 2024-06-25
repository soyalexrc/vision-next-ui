import Link from 'next/link';
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-background text-foreground">
      <div className="max-w-md px-4 text-center">
        <Image src="/404.png" width={400} height={300} alt="404 Not Found" className="mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-2">Oops! Pagina no encontrada.</h1>
        <p className="text-muted-foreground mb-8">

          La página que estás buscando parece haberse perdido. No te preocupes, te ayudaremos a encontrar el camino de vuelta al inicio.        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
