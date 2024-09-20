'use client';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

  return (
    <div className="flex flex-col md:flex-row mb-4 gap-4">
      <Input
        placeholder="Buscar por nombre"
        value={query}
        onChange={({ target: { value } }) => setQuery(value)}
        className="w-full md:max-w-sm"
      />
      <Button onClick={search}>Buscar</Button>
      <span className="mx-auto h-[30px] md:h-auto"></span>
      <Button variant="outline" className="flex gap-2" onClick={() => router.push('clientes/nuevo')}>
        <Plus />
        Nuevo cliente
      </Button>
    </div>
  );
}
