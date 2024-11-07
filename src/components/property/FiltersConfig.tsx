'use client';
import React, { useState } from 'react';
import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PROPERTY_TYPES } from '@/utils/data/property-types';
import { Button } from '@/components/ui/button';

export function FiltersConfig() {
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
    <div className="my-5 flex gap-4">
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
      </div>

      <div>
        {/*<p className="font-bold text-sm mb-1">Tipo de operacion</p>*/}
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
