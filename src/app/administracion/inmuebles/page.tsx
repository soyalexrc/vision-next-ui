'use client';
import { useState } from 'react';
import { columns } from '@/components/property/admin/table';
import {AlertTriangle, Plus} from 'lucide-react';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useProperties } from '@/lib/api/properties';
import { DataTable } from '@/components/ui/data-table';
import { TableFilters } from '@/components/property/admin';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Page() {
  const { data, isPending, error } = useProperties();
  const [query, setQuery] = useState('');
  const [operationType, setOperationType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const router = useRouter();

  // Filter data based on the query
  const filteredData = data?.filter((property) => {
    const searchText = query.toLowerCase();

    return (
      (!query ||
        property.code?.toLowerCase().includes(searchText) ||
        property.publicationTitle?.toLowerCase().includes(searchText) ||
        property.propertyType?.toLowerCase().includes(searchText) ||
        property.operationType?.toLowerCase().includes(searchText)) &&
      (operationType === 'all' || !operationType || property.operationType === operationType) &&
      (propertyType === 'all' || !propertyType || property.propertyType === propertyType)
    );
  });

  return (
    <>
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <div className="p-4 container mx-auto">
        <div className="flex  justify-between">
          <h1 className="text-4xl mb-4">Inmuebles</h1>
          {/* Button to Add a New Property */}
          <Button variant="outline" className="flex gap-2" onClick={() => router.push('inmuebles/nuevo')}>
            <Plus />
            Nuevo inmueble
          </Button>
        </div>
        <TableFilters
          query={query}
          operationType={operationType}
          setOperationType={setOperationType}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          setQuery={setQuery}
        />
        {isPending && <TableSkeleton />}
        {error && <div>Error: {error.message}</div>}
        {data && <DataTable columns={columns} data={filteredData!} />}
      </div>
    </>
  );
}
