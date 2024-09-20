import { TableFilters } from '@/components/users/TableFilters';
import { Suspense } from 'react';
import { columns, DataTable } from '@/components/users/table';

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Usuarios</h1>
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
  const users = await fetch(`${process.env.HOST_URL}/api/usuarios?${urlParams}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());

  console.log('usuarios encontrados, ', users);

  return <DataTable columns={columns} data={users} />;
}
