'use client';

import { TableFilters } from '@/components/clients/TableFilters';
import { columns } from '@/components/clients/table';
import { AlertTriangle } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useClients } from '@/lib/api/clients';
import { DataTable } from '@/components/ui/data-table';

export default function Page() {
  const { data, isPending, error } = useClients();

  return (
    <>
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <div className="p-4 container mx-auto">
        <h1 className="text-4xl mb-4">Clientes</h1>
        <TableFilters />
        {isPending && <TableSkeleton />}
        {error && <div>Error: {error.message}</div>}
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
