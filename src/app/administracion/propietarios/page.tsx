'use client';
import { useOwners } from '@/lib/api/owners';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { columns } from '@/components/owners/table';
import { DataTable } from '@/components/ui/data-table';
import { AlertTriangle } from 'lucide-react';

export default function Page() {
  const { data, isPending, error } = useOwners();

  return (
    <div className="p-4 container mx-auto">
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <h1 className="text-4xl mb-4">Propietarios</h1>
      {/*<TableFilters />*/}
      {isPending && <TableSkeleton />}
      {error && <div>Error: {error.message}</div>}
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
