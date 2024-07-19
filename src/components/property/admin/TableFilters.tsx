'use client';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createProperty } from '@/actions/property';

export function TableFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('busqueda') ?? '');

  function search() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('busqueda', query);
    router.push(pathname + '?' + params.toString());
  }

  async function seed() {
    await createProperty();
  }

  return (
    <div className="flex mb-4 gap-4">
      <Input
        placeholder="Buscar por codigo o nombre"
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        className="max-w-sm"
      />
      <Button onClick={search}>Buscar</Button>
      <Button onClick={seed}>Seed</Button>
    </div>
  );
}
