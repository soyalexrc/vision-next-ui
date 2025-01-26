'use client';
import { AlertTriangle } from 'lucide-react';
import { useWorkWithUs } from '@/lib/api/work-with-us';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/workWithUs/table';

export default function Page() {
  const { data, isPending, error } = useWorkWithUs();
  return (
    <>
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <div className="p-4 container mx-auto">
        <h1 className="text-4xl mb-4">Recepcion de CV</h1>
        {/*<TableFilters />*/}
        {isPending && <TableSkeleton />}
        {error && <div>Error: {error.message}</div>}
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </>
  );
}
