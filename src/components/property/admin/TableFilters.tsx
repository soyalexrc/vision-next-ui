'use client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCategories } from '@/lib/api/categories';
import React from 'react';

export function TableFilters({
  query,
  setQuery,
  operationType,
  setOperationType,
  propertyType,
  setPropertyType,
}: {
  query: string;
  setQuery: (value: string) => void;
  operationType: string;
  setOperationType: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
}) {
  const { data } = useCategories();

  return (
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
    </div>
  );
}
