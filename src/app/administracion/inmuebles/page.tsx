'use client';
import { columns } from '@/components/property/admin/table';
import { AlertTriangle } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useProperties } from '@/lib/api/properties';
import { DataTable } from '@/components/ui/data-table';
import { TableFilters } from '@/components/property/admin';

export default function Page() {
  const { data, isPending, error } = useProperties();

  return (
    <>
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <div className="p-4 container mx-auto">
        <h1 className="text-4xl mb-4">Inmuebles</h1>
        <TableFilters />
        {isPending && <TableSkeleton />}
        {error && <div>Error: {error.message}</div>}
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
