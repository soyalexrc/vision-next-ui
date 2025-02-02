'use client';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/lib/api/categories';

export function FiltersConfig() {
  // const [state, setState] = useState<string>('');
  // const [municipality, setMunicipality] = useState<string>('');
  // const [municipalitiesList, setMunicipalitiesList] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string>('');
  const [operationType, setOperationType] = useState<string>('');
  const stickyRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(0);
  const router = useRouter();
  const { data, isPending } = useCategories();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/inmuebles?${params.toString()}`);
  };

  // function handleChangeLocation(value: string) {
  //   setState(value);
  //   if (value === '') setMunicipalitiesList([]);
  //   if (value === 'Caracas') setMunicipalitiesList(LOCATIONS_DETAIL.caracas);
  //   if (value === 'Carabobo') setMunicipalitiesList(LOCATIONS_DETAIL.carabobo);
  //   if (value === 'Cojedes') setMunicipalitiesList(LOCATIONS_DETAIL.cojedes);
  //   if (value === 'Aragua') setMunicipalitiesList(LOCATIONS_DETAIL.aragua);
  // }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPropertyType = params.get('tipo-de-inmueble') || '';
    const initialOperationType = params.get('tipo-de-operacion') || '';
    if (initialPropertyType) {
      setPropertyType(initialPropertyType);
    } else {
      setPropertyType('todos');
    }
    if (initialOperationType) {
      setOperationType(initialOperationType);
    } else {
      setOperationType('todos');
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const stickyRect = stickyRef.current.getBoundingClientRect();
        if (stickyRect.top <= 112) {
          setStickyTop(105);
        } else if (stickyRect.top > 133) {
          // Small buffer to prevent jitter
          // console.log(stickyRect.top);
          setStickyTop(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`py-5 flex bg-white z-20 gap-4 sticky`} style={{ top: `${stickyTop}px` }} ref={stickyRef}>
      {/*<div>*/}
      {/*  <p className="font-bold text-sm mb-1">Estado</p>*/}
      {/*  <Select value={state} onValueChange={handleChangeLocation}>*/}
      {/*    <SelectTrigger className="w-full mb-4">*/}
      {/*      <SelectValue placeholder="Seleccionar" />*/}
      {/*    </SelectTrigger>*/}
      {/*    <SelectContent>*/}
      {/*      <SelectGroup>*/}
      {/*        <SelectLabel>Estado</SelectLabel>*/}
      {/*        {LOCATIONS.map((location) => (*/}
      {/*          <SelectItem value={location} key={location}>*/}
      {/*            {location}*/}
      {/*          </SelectItem>*/}
      {/*        ))}*/}
      {/*      </SelectGroup>*/}
      {/*    </SelectContent>*/}
      {/*  </Select>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p className="font-bold text-sm mb-1">Municipio</p>*/}
      {/*  <Select value={municipality} onValueChange={setMunicipality}>*/}
      {/*    <SelectTrigger className="w-full mb-4">*/}
      {/*      <SelectValue placeholder="Seleccionar" />*/}
      {/*    </SelectTrigger>*/}
      {/*    <SelectContent>*/}
      {/*      <SelectGroup>*/}
      {/*        <SelectLabel>Municipio</SelectLabel>*/}
      {/*        {municipalitiesList.map((location) => (*/}
      {/*          <SelectItem value={location} key={location}>*/}
      {/*            {location}*/}
      {/*          </SelectItem>*/}
      {/*        ))}*/}
      {/*      </SelectGroup>*/}
      {/*    </SelectContent>*/}
      {/*  </Select>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <p className="font-bold text-sm mb-1">Precio</p>*/}

      {/*  <div className="mb-4 grid grid-cols-12 justify-items-center items-center">*/}
      {/*    <Input className="col-span-5" type="text" placeholder="Desde" />*/}
      {/*    <div className="col-span-2">-</div>*/}
      {/*    <Input className="col-span-5" type="text" placeholder="Hasta" />*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div>
        {/*<p className="font-bold text-sm mb-1">Inmueble</p>*/}
        <Select
          disabled={isPending}
          value={propertyType}
          onValueChange={(value) => {
            setPropertyType(value);
            updateQuery('tipo-de-inmueble', value);
          }}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo de inmueble</SelectLabel>
              <SelectItem value="todos">Todos</SelectItem>
              {data?.map((propertyType) => (
                <SelectItem value={propertyType.title} key={propertyType.id}>
                  {propertyType.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        {/*<p className="font-bold text-sm mb-1">Tipo de operacion</p>*/}
        <Select
          value={operationType}
          onValueChange={(value) => {
            setOperationType(value);
            updateQuery('tipo-de-operacion', value);
          }}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo de operacion</SelectLabel>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="venta">Venta</SelectItem>
              <SelectItem value="alquiler">Alquiler</SelectItem>
              <SelectItem value="traspaso de fondo">Traspaso de fondo</SelectItem>
              <SelectItem value="estadias vacacionales">Estadias Vacacionales</SelectItem>
              <SelectItem value="estadias residenciales">Estadias Residenciales</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        {/*<p className="font-bold text-sm mb-1">Buscar por codigo de referencia</p>*/}

        <Input className="mb-4" type="text" placeholder="Buscar por codigo" />
      </div>

      {/*<div className="flex justify-center">*/}
      {/*  <Button onClick={updateQuery} size="lg" className="bg-red-900 text-white w-full">*/}
      {/*    Buscar*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
}
