'use client';

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Select, SelectItem } from '@nextui-org/react';
import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import { PROPERTY_TYPES } from '@/utils/data/property-types';
import { IconBxGridVertical, IconFilter, IconUnorderedList } from '@/components/icons';
import { PropertyCardWithCarousel } from '@/components/PropertyCard';
import formatPropertyTitle from '@/utils/format-property-title';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
  const [state, setState] = useState<string>('');
  const [municipality, setMunicipality] = useState<string>('');
  const [municipalitiesList, setMunicipalitiesList] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>('');
  const [operationType, setOperationType] = useState<string>('');
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  console.log(municipality);
  // useEffect(() => {
  //   setCurrentPage(searchParams?.get('pagina') ?? '1');
  //   setPageLimit(searchParams?.get('limite') ?? '10');
  //   setState(searchParams?.get('estado') ?? '');
  //   setMunicipality(searchParams?.get('municipalidad') ?? '');
  //   setPropertyType(searchParams?.get('tipo_de_inmueble') ?? '');
  //   setOperationType(searchParams?.get('tipo_de_operacion') ?? '');
  // }, [searchParams]);

  const updateQuery = () => {
    setShowFilters(false);
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
    <main className={`min-h-screen  ${inter.className}`}>
      <section className="relative">
        <img src="/about/aboutBanner.jpg" className="h-[200px] object-cover lg:h-full" alt="" />
        <div className="absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center flex-col">
          <h2 className="text-white text-xl lg:text-4xl tracking-widest mb-2">Opera con nosotros</h2>
          <p className="text-white text-sm lg:text-xl text-center">
            Consulta nuestra amplia oferta de propiedades en venta y alquiler. Encuentra la opcion que <br /> mejor se adapte a tus
            necesidades
          </p>
        </div>
      </section>

      <section className="lg:px-20 grid gap-4 lg:grid-cols-12 ">
        <div className="lg:col-span-3 lg:order-1 hidden lg:block">
          <div className="my-5">
            <Select
              value={state}
              selectedKeys={[state]}
              onChange={(e) => handleChangeLocation(e.target.value)}
              size="sm"
              variant="bordered"
              className="mb-4"
              label="Estado"
            >
              {LOCATIONS.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </Select>
            <Select size="sm" variant="bordered" className="mb-4" label="Municipio" onChange={(e) => setMunicipality(e.target.value)}>
              {municipalitiesList.map((city: string) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>

            <h3 className="my-4">Precio</h3>

            <div className="mb-4 grid grid-cols-12 justify-items-center items-center">
              <Input size="sm" variant="bordered" className="col-span-5" type="text" label="Desde" />
              <div className="col-span-2">-</div>
              <Input size="sm" variant="bordered" className="col-span-5" type="text" label="Hasta" />
            </div>

            <Select
              value={propertyType}
              selectedKeys={[propertyType]}
              onChange={(e) => setPropertyType(e.target.value)}
              size="sm"
              variant="bordered"
              className="mb-4"
              label="Propiedad"
            >
              {PROPERTY_TYPES.map((propertyType) => (
                <SelectItem key={propertyType} value={propertyType}>
                  {propertyType}
                </SelectItem>
              ))}
            </Select>

            <Select
              value={operationType}
              selectedKeys={[operationType]}
              onChange={(e) => setOperationType(e.target.value)}
              size="sm"
              variant="bordered"
              className="mb-4"
              label="Tipo de operacion"
            >
              <SelectItem key="Venta" value="Venta">
                Venta
              </SelectItem>
              <SelectItem key="Alquiler" value="Alquiler">
                Alquiler
              </SelectItem>
              <SelectItem key="Traspaso de fondo" value="Traspaso de fondo">
                Traspaso de fondo
              </SelectItem>
            </Select>

            <Input size="sm" variant="bordered" className="mb-4" type="text" label="Buscar por codigo" />

            <div className="flex justify-center">
              <Button onClick={updateQuery} size="lg" className="bg-red-900 text-white w-full">
                Buscar
              </Button>
            </div>
          </div>
        </div>
        <div className="order-1 lg:col-span-9 my-5 lg:order-2">
          {/*toolbar*/}
          <div className="flex justify-between  px-4">
            <Select size="sm" variant="bordered" className="mb-4 max-w-[200px]" label="Ordenar por">
              {animals.map((animal) => (
                <SelectItem key={animal.value} value={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
            <div className="lg:hidden">
              <Button
                onClick={() => setShowFilters(true)}
                isIconOnly
                className={`${viewStyle === 'grid' ? 'bg-red-900' : 'bg-none'}`}
                aria-label="Like"
              >
                <IconFilter height={25} width={25} fill="white" />
              </Button>
            </div>
            <div className="gap-4 hidden lg:flex">
              <Button
                onClick={() => setViewStyle('grid')}
                isIconOnly
                className={`${viewStyle === 'grid' ? 'bg-red-900' : 'bg-none'}`}
                aria-label="Like"
              >
                <IconBxGridVertical height={30} width={30} fill="white" />
              </Button>
              <Button
                onClick={() => setViewStyle('list')}
                isIconOnly
                className={`${viewStyle === 'list' ? 'bg-red-900' : 'bg-none'}`}
                aria-label="Like"
              >
                <IconUnorderedList height={30} width={30} fill="white" />
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
            <Pagination total={total} showControls page={1} />
          </div>
        </div>
      </section>

      <Modal isOpen={showFilters} placement="bottom" scrollBehavior="inside" onOpenChange={() => setShowFilters(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filtros de busqueda</ModalHeader>
              <ModalBody>
                <div>
                  <Select
                    value={state}
                    selectedKeys={[state]}
                    onChange={(e) => handleChangeLocation(e.target.value)}
                    size="sm"
                    variant="bordered"
                    className="mb-4"
                    label="Estado"
                  >
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select size="sm" variant="bordered" className="mb-4" label="Municipio" onChange={(e) => setMunicipality(e.target.value)}>
                    {municipalitiesList.map((city: string) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </Select>

                  <h3 className="my-4">Precio</h3>

                  <div className="mb-4 grid grid-cols-12 justify-items-center items-center">
                    <Input size="sm" variant="bordered" className="col-span-5" type="text" label="Desde" />
                    <div className="col-span-2">-</div>
                    <Input size="sm" variant="bordered" className="col-span-5" type="text" label="Hasta" />
                  </div>

                  <Select
                    value={propertyType}
                    selectedKeys={[propertyType]}
                    onChange={(e) => setPropertyType(e.target.value)}
                    size="sm"
                    variant="bordered"
                    className="mb-4"
                    label="Propiedad"
                  >
                    {PROPERTY_TYPES.map((propertyType) => (
                      <SelectItem key={propertyType} value={propertyType}>
                        {propertyType}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    value={operationType}
                    selectedKeys={[operationType]}
                    onChange={(e) => setOperationType(e.target.value)}
                    size="sm"
                    variant="bordered"
                    className="mb-4"
                    label="Tipo de operacion"
                  >
                    <SelectItem key="Venta" value="Venta">
                      Venta
                    </SelectItem>
                    <SelectItem key="Alquiler" value="Alquiler">
                      Alquiler
                    </SelectItem>
                    <SelectItem key="Traspaso de fondo" value="Traspaso de fondo">
                      Traspaso de fondo
                    </SelectItem>
                  </Select>

                  <Input size="sm" variant="bordered" className="mb-4" type="text" label="Buscar por codigo" />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button className="text-white bg-red-900" onPress={updateQuery}>
                  Buscar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}
