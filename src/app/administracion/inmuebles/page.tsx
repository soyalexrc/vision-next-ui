'use client';
import { useEffect, useState } from 'react';
import { columns } from '@/components/property/admin/table';
import { AlertTriangle, Plus } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { useProperties } from '@/lib/api/properties';
import { DataTable } from '@/components/ui/data-table';
import { TableFilters } from '@/components/property/admin';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function Page() {
  const { user } = useUser();
  const [adviserId, setAdviserId] = useState('');
  const [role, setRole] = useState('');
  const { data, isPending, error, refetch } = useProperties(adviserId);
  const [query, setQuery] = useState('');
  const [operationType, setOperationType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [adviser, setAdviser] = useState('');
  const [ally, setAlly] = useState('');
  const [externalAdviser, setExternalAdviser] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user && user.id) {
      const role: any = user.publicMetadata.role;
      setRole(role);
      // if (role === 'Asesor inmobiliario' || role === 'Asesor inmobiliario vision') {
      //   setAdviserId(user.id);
      // }
      setTimeout(async () => {
        await refetch();
      }, 200);
    }
  }, [user]);

  // Filter data based on the query, price range, and new fields
  const filteredData = data?.filter((property) => {
    const searchText = query.toLowerCase();
    const price = Number((property?.price as any).replace(/[^0-9.-]+/g, '')); // Convert price text to number

    return (
      (!query ||
        property.code?.toLowerCase().includes(searchText) ||
        property.publicationTitle?.toLowerCase().includes(searchText) ||
        property.propertyType?.toLowerCase().includes(searchText) ||
        property.operationType?.toLowerCase().includes(searchText)) &&
      (operationType === 'all' || !operationType || property.operationType === operationType) &&
      (propertyType === 'all' || !propertyType || property.propertyType === propertyType) &&
      (!priceFrom || price >= Number(priceFrom)) && // Min Price
      (!priceTo || price <= Number(priceTo)) && // Max Price
      (adviser === 'all' || !adviser || property.adviserId?.toLowerCase().includes(adviser.toLowerCase())) && // Adviser
      (ally === 'all' || !ally || property.allyId?.toLowerCase().includes(ally.toLowerCase())) && // Ally
      (externalAdviser === 'all' || !externalAdviser || property.externalAdviserId?.toLowerCase().includes(externalAdviser.toLowerCase())) // External Adviser
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
          role={role}
          operationType={operationType}
          setOperationType={setOperationType}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          setQuery={setQuery}
          priceFrom={priceFrom}
          priceTo={priceTo}
          setPriceTo={setPriceTo}
          setPriceFrom={setPriceFrom}
          adviser={adviser}
          setAdviser={setAdviser}
          externalAdviser={externalAdviser}
          setExternalAdviser={setExternalAdviser}
          ally={ally}
          setAlly={setAlly}
        />
        {isPending && <TableSkeleton />}
        {error && <div>Error: {error.message}</div>}
        {data && <DataTable columns={columns} data={filteredData!} />}
      </div>
    </>
  );
}
