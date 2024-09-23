import { TableFilters } from '@/components/allies/TableFilters';
import { Suspense } from 'react';
import { columns, DataTable } from '@/components/allies/table';
import { AlertTriangle } from 'lucide-react';

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <div className="bg-yellow-500 text-black p-2 text-center">
        <AlertTriangle className="inline-block mr-2" />
        Trabajo en progreso - Esta pagina se encuentra bajo desarrollo activo.
      </div>
      <div className="p-4 container mx-auto">
        <h1 className="text-4xl mb-4">Aliados</h1>
        <TableFilters />
        <Suspense fallback="Loading..." key={JSON.stringify(searchParams)}>
          <TableWrapper query={searchParams} />
        </Suspense>
      </div>
    </>
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
  const data = await fetch(`${process.env.HOST_URL}/api/aliados?${urlParams}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  console.log(data);

  return <DataTable columns={columns} data={data} />;
}
