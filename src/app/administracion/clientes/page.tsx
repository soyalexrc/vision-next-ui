'use client';

import { TableFilters } from '@/components/clients/TableFilters';
import { columns } from '@/components/clients/table';
import { AlertTriangle, Plus } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useClients } from '@/lib/api/clients';
import { DataTable } from '@/components/ui/data-table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data, isPending, error } = useClients();
  const router = useRouter();
  const [adviser, setAdviser] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [propertyType, setPropertyType] = useState('');
  // const [allowPets, setAllowPets] = useState('');
  // const [allowYounger, setAllowYounger] = useState('');
  const [contactFrom, setContactFrom] = useState('');
  // const [budgetFrom, setBudgetFrom] = useState('');
  // const [budgetTo, setBudgetTo] = useState('');
  // const [status, setStatus] = useState('');

  // Filter data based on the query, price range, and new fields
  const filteredData = data?.filter((client) => {
    const searchText = query.toLowerCase();

    return (
      (!query ||
        client.name?.toLowerCase().includes(searchText) ||
        client.phone?.toLowerCase().includes(searchText) ||
        client.propertyOfInterest?.toLowerCase().includes(searchText) ||
        client.specificRequirement?.toLowerCase().includes(searchText) ||
        client.adviser_name?.toLowerCase().includes(searchText)) && // <-- Corrected `&&` placement
      // (operationType === 'all' || !operationType || property.operationType === operationType) &&
      (propertyType === 'all' || !propertyType || client.propertytype === propertyType) &&
      (contactFrom === 'all' || !contactFrom || client.contactFrom === contactFrom) &&
      (status === 'all' || !status || client.status === status) &&
      // (!priceFrom || price >= Number(priceFrom)) && // Min Price
      // (!priceTo || price <= Number(priceTo)) && // Max Price

      (adviser === 'all' || !adviser || client.adviser_id?.toLowerCase().includes(adviser.toLowerCase())) // Adviser
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
          <h1 className="text-4xl mb-4">Clientes</h1>
          {/* Button to Add a New Property */}
          <Button variant="outline" className="flex gap-2" onClick={() => router.push('clientes/nuevo')}>
            <Plus />
            Nuevo cliente
          </Button>
        </div>
        <TableFilters
          setAdviser={setAdviser}
          query={query}
          setStatus={setStatus}
          status={status}
          contactFrom={contactFrom}
          setContactFrom={setContactFrom}
          propertyType={propertyType}
          setQuery={setQuery}
          adviser={adviser}
          setPropertyType={setPropertyType}
        />
        {isPending && <TableSkeleton />}
        {error && <div>Error: {error.message}</div>}
        {data && <DataTable columns={columns} data={filteredData!} />}
      </div>
    </>
  );
}
