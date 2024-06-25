import CustomSelect from '@/components/property/CustomSelect';
import {Button} from "@/components/ui/button";
import PropertyForm from "@/components/property/form/PropertyForm";

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
      <PropertyForm />
    </div>
  );
}
