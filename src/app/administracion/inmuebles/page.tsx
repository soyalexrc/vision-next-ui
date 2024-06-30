import { columns } from '@/app/administracion/inmuebles/columns';
import { DataTable } from '@/app/administracion/inmuebles/data-table';
import { Suspense } from 'react';
import TableFilters from '@/components/property/TableFilters';

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Inmuebles</h1>
      <TableFilters />
      <Suspense fallback="Loading..." key={JSON.stringify(searchParams)}>
        <TableWrapper query={searchParams} />
      </Suspense>
    </div>
  );
}

async function TableWrapper({ query }: { query: SearchParams }) {
  const filteredQuery = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) {
      filteredQuery.set(key, value as string);
    }
  }

  const urlParams = new URLSearchParams(filteredQuery.toString());

  const properties = await fetch(`http://localhost:3000/api/inmuebles?${urlParams}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
  return <DataTable columns={columns} data={properties} />;
}
