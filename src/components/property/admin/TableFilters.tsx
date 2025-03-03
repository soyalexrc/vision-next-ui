'use client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCategories } from '@/lib/api/categories';
import React from 'react';
import { useExternalAdvisers } from '@/lib/api/external-advisers';

export function TableFilters({
  query,
  setQuery,
  operationType,
  setOperationType,
  propertyType,
  setPropertyType,
  priceTo,
  setPriceTo,
  priceFrom,
  setPriceFrom,
  adviser,
  setAdviser,
  externalAdviser,
  setExternalAdviser,
  ally,
  setAlly,
}: {
  query: string;
  setQuery: (value: string) => void;
  operationType: string;
  setOperationType: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  priceTo: string;
  setPriceTo: (value: string) => void;
  priceFrom: string;
  setPriceFrom: (value: string) => void;
  adviser: string;
  setAdviser: (value: string) => void;
  ally: string;
  setAlly: (value: string) => void;
  externalAdviser: string;
  setExternalAdviser: (value: string) => void;
}) {
  const { data } = useCategories();
  const { data: externalAdvisers } = useExternalAdvisers();

  return (
    <>
      <div className="flex flex-col md:flex-row mb-4 md:items-end gap-4">
        {/* Search Input */}
        <Input placeholder="Buscar por código o título" className="w-full" value={query} onChange={(e) => setQuery(e.target.value)} />

        {/* Select for Operation Type */}
        <div>
          <p className="text-xs font-bold mb-1">Tipo de operacion</p>
          <Select value={operationType} onValueChange={setOperationType}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Venta">Venta</SelectItem>
              <SelectItem value="Alquiler">Alquiler</SelectItem>
              <SelectItem value="Traspaso">Traspaso de fondo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Select for Property Type */}
        <div>
          <p className="text-xs font-bold mb-1">Tipo de propiedad</p>

          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {data?.map((property) => (
                <SelectItem key={property.id} value={property.title}>
                  {property.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* input for price range */}
        <div>
          <p className="text-xs font-bold mb-1">Desde ($)</p>
          <Input className="w-[100px]" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />
        </div>
        <div>
          <p className="text-xs font-bold mb-1">Hasta ($)</p>
          <Input className="w-[100px]" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row mb-4 md:items-end gap-4">
        <div>
          <p className="text-xs font-bold mb-1">Asesor</p>
          <Select value={adviser} onValueChange={setAdviser}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Venta">Venta</SelectItem>
              <SelectItem value="Alquiler">Alquiler</SelectItem>
              <SelectItem value="Traspaso">Traspaso de fondo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs font-bold mb-1">Asesor externo</p>
          <Select value={externalAdviser} onValueChange={setExternalAdviser}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {externalAdvisers?.map((externalAdviser) => (
                <SelectItem value="Venta" key={externalAdviser.id}>
                  {externalAdviser.name} {externalAdviser.lastname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="text-xs font-bold mb-1">Aliado</p>
          <Select value={ally} onValueChange={setAlly}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Venta">Venta</SelectItem>
              <SelectItem value="Alquiler">Alquiler</SelectItem>
              <SelectItem value="Traspaso">Traspaso de fondo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
