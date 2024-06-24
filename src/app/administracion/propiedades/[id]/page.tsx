import { Select, SelectItem, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import CustomSelect from '@/components/property/CustomSelect';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const options = ['general', 'ubicacion', 'visuales', 'distribucion-y-equipos', 'negociacion', 'atributos', 'documentos'];
  console.log(params);

  return (
    <div>
      te encuentras en {options.some((opt: string) => opt === searchParams?.seccion) ? searchParams?.seccion : 'NONE'}
      <CustomSelect options={options} />
    </div>
  );
}
