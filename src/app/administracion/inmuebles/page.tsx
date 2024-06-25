import { columns } from '@/app/administracion/inmuebles/columns';
import { DataTable } from '@/app/administracion/inmuebles/data-table';

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const properties = await fetch(
    `http://localhost:3000/api/inmuebles?pagina=${searchParams?.pagina || '1'}&cantidad=${searchParams?.cantidad || '10'}`,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((data) => data.json());

  return (
    <div className="p-4">
      <h1 className="text-4xl">Inmuebles</h1>
      {/*  TODO add filters and search*/}
      <DataTable columns={columns} data={properties} />
    </div>
  );
}
