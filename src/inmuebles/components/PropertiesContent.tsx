'use client';

import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import { PROPERTY_TYPES } from '@/utils/data/property-types';
import { IconBxGridVertical, IconFilter, IconUnorderedList } from '@/components/icons';
import { PropertyCardWithCarousel } from '@/components/PropertyCard';
import formatPropertyTitle from '@/utils/format-property-title';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Filter, LayoutGrid, List } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

const animals = [{ label: 'sample', value: 2 }];

interface Props {
  properties: any;
  total: any;
}

export function PropertiesContent({ properties, total }: Props) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const [currentPage, setCurrentPage] = useState<string>('1');
  // const [pageLimit, setPageLimit] = useState<string>('10');
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // useEffect(() => {
  //   setCurrentPage(searchParams?.get('pagina') ?? '1');
  //   setPageLimit(searchParams?.get('limite') ?? '10');
  //   setState(searchParams?.get('estado') ?? '');
  //   setMunicipality(searchParams?.get('municipalidad') ?? '');
  //   setPropertyType(searchParams?.get('tipo_de_inmueble') ?? '');
  //   setOperationType(searchParams?.get('tipo_de_operacion') ?? '');
  // }, [searchParams]);

  return (
    <main className={`min-h-screen`}>
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

      <section className="lg:px-20 grid gap-4 lg:grid-cols-12 ">
        <div className="lg:col-span-3 lg:order-1 hidden lg:block">
          <FiltersConfig />
        </div>
        <div className="order-1 lg:col-span-9 my-5 lg:order-2">
          {/*toolbar*/}
          <div className="flex justify-between items-center px-4 mb-4">
            <div>
              <p className="font-bold text-sm mb-1">Ordenar por</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ordenar por</SelectLabel>
                    {animals.map((animal) => (
                      <SelectItem value={animal.value.toString()} key={animal.value}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="lg:hidden">
              <Button variant="ghost" onClick={() => setShowFilters(true)} className="bg-red-900" aria-label="Like">
                <Filter height={25} width={25} className="text-white" />
              </Button>
            </div>
            <div className="gap-4 hidden lg:flex">
              <Button
                onClick={() => setViewStyle('grid')}
                variant="ghost"
                className={`hover:bg-red-900 ${viewStyle === 'grid' ? 'bg-red-900' : 'bg-gray-200'}`}
                aria-label="Like"
              >
                <LayoutGrid
                  height={30}
                  width={30}
                  className={`hover:text-white ${viewStyle === 'grid' ? 'text-white' : 'text-gray-600'}`}
                />
              </Button>
              <Button
                onClick={() => setViewStyle('list')}
                variant="ghost"
                className={`hover:bg-red-900 ${viewStyle === 'list' ? 'bg-red-900' : 'bg-gray-200'}`}
                aria-label="Like"
              >
                <List height={30} width={30} className={`hover:text-white ${viewStyle === 'list' ? 'text-white' : 'text-gray-600'}`} />
              </Button>
            </div>
          </div>
          <div className={`${viewStyle === 'grid' && 'grid'} gap-4 grid-cols-1 lg:grid-cols-2 `}>
            {properties.map((property: any) => (
              <PropertyCardWithCarousel
                viewStyle={viewStyle}
                images={property.images}
                key={property.code}
                path={property.publicationTitle}
                title={formatPropertyTitle(property.publicationTitle)}
                description={property.description}
                price={property.price}
                featured={[property.footageGround, property.operationType, property.propertyType]}
              />
            ))}
          </div>

          <div className="flex justify-end mt-10">
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
        </div>
      </section>

      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-[600px]">
          <ScrollArea className="h-full">
            <SheetHeader>
              <SheetTitle className="my-2">Filtros de busqueda</SheetTitle>
              <div className="px-2">
                <FiltersConfig />
              </div>
            </SheetHeader>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </main>
  );
}

function FiltersConfig() {
  const [state, setState] = useState<string>('');
  const [municipality, setMunicipality] = useState<string>('');
  const [municipalitiesList, setMunicipalitiesList] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>('');
  const [operationType, setOperationType] = useState<string>('');

  const updateQuery = () => {
    // const updatedSearchParams = new URLSearchParams(searchParams?.toString());
    // updatedSearchParams.set('pagina', encodeURI(currentPage));
    // updatedSearchParams.set('limite', encodeURI(pageLimit));
    // updatedSearchParams.set('estado', encodeURI(state));
    // updatedSearchParams.set('municipalidad', encodeURI(municipality));
    // updatedSearchParams.set('tipo_de_operacion', encodeURI(operationType));
    // updatedSearchParams.set('tipo_de_inmueble', encodeURI(propertyType));
    //
    // router.push('/inmuebles' + '?' + updatedSearchParams.toString());
  };

  function handleChangeLocation(value: string) {
    setState(value);
    if (value === '') setMunicipalitiesList([]);
    if (value === 'Caracas') setMunicipalitiesList(LOCATIONS_DETAIL.caracas);
    if (value === 'Carabobo') setMunicipalitiesList(LOCATIONS_DETAIL.carabobo);
    if (value === 'Cojedes') setMunicipalitiesList(LOCATIONS_DETAIL.cojedes);
    if (value === 'Aragua') setMunicipalitiesList(LOCATIONS_DETAIL.aragua);
  }
  return (
    <div className="my-5">
      <p className="font-bold text-sm mb-1">Estado</p>
      <Select value={state} onValueChange={handleChangeLocation}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Estado</SelectLabel>
            {LOCATIONS.map((location) => (
              <SelectItem value={location} key={location}>
                {location}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <p className="font-bold text-sm mb-1">Municipio</p>
      <Select value={municipality} onValueChange={setMunicipality}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Municipio</SelectLabel>
            {municipalitiesList.map((location) => (
              <SelectItem value={location} key={location}>
                {location}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <p className="font-bold text-sm mb-1">Precio</p>

      <div className="mb-4 grid grid-cols-12 justify-items-center items-center">
        <Input className="col-span-5" type="text" placeholder="Desde" />
        <div className="col-span-2">-</div>
        <Input className="col-span-5" type="text" placeholder="Hasta" />
      </div>

      <p className="font-bold text-sm mb-1">Inmueble</p>
      <Select value={propertyType} onValueChange={setPropertyType}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de inmueble</SelectLabel>
            {PROPERTY_TYPES.map((propertyType) => (
              <SelectItem value={propertyType} key={propertyType}>
                {propertyType}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <p className="font-bold text-sm mb-1">Tipo de operacion</p>
      <Select value={operationType} onValueChange={setOperationType}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de operacion</SelectLabel>
            <SelectItem value="Venta">Venta</SelectItem>
            <SelectItem value="Alquiler">Alquiler</SelectItem>
            <SelectItem value="Traspaso de fondo">Traspaso de fondo</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <p className="font-bold text-sm mb-1">Buscar por codigo de referencia</p>

      <Input className="mb-4" type="text" placeholder="Buscar por codigo" />

      <div className="flex justify-center">
        <Button onClick={updateQuery} size="lg" className="bg-red-900 text-white w-full">
          Buscar
        </Button>
      </div>
    </div>
  );
}
