import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { FiltersConfig } from '@/components/property/FiltersConfig';
import PropertyListWrapper from '@/components/property/PropertyListWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen`}>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center flex-col">
          <h2 className="text-white text-xl lg:text-4xl tracking-widest mb-4">Opera con nosotros</h2>
          <p className="text-white text-sm lg:text-xl text-center">
            Consulta nuestra amplia oferta de propiedades en venta y alquiler. Encuentra la opcion que <br /> mejor se adapte a tus
            necesidades
          </p>
        </div>
      </section>

      <section className="lg:px-20">
        {/*toolbar*/}
        {/*<Toolbar />*/}
        <div className="flex justify-center">
          <div className="max-w-[1400px] w-full">
            <FiltersConfig />
            {/* Properties */}
            <PropertyListWrapper>{children}</PropertyListWrapper>
          </div>
        </div>
        <div className=" mt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
}
