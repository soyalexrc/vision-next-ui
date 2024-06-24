'use client';
import { PROPERTY_TYPES } from '@/utils/data/property-types';
import { TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { SelectContent, SelectGroup, SelectItem, Select, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Searcher() {
  const animals = [
    { label: 'sample', value: 2 },
    { label: 'sample 2', value: 33 },
  ];
  // const attributesOptions = [
  //   { label: 'Pozo de agua' },
  //   { label: 'Planta electrica 50%' },
  //   { label: 'Planta electrica 100%' },
  //   { label: 'Piscina' },
  //   { label: 'A estrenar' },
  //   { label: 'Obra blanca' },
  //   { label: 'Amoblado' },
  //   { label: 'Equipado' },
  //   { label: 'Terraza' },
  //   { label: 'ocina empotrada' },
  // ];
  return (
    <section className="my-14 lg:px-24 w-full">
      <div className="w-full flex justify-center lg:justify-start   mt-4">
        <Tabs defaultValue="sell" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="sell">Venta</TabsTrigger>
            <TabsTrigger value="rent">Alquiler</TabsTrigger>
            <TabsTrigger value="transfer">Traspaso</TabsTrigger>
          </TabsList>
          {/*<TabsContent value="sell">Make changes to your account here.</TabsContent>*/}
          {/*<TabsContent value="rent">Change your password here.</TabsContent>*/}
          {/*<TabsContent value="transfer">Change your password here.</TabsContent>*/}
        </Tabs>
      </div>
      <div className="py-4 px-4 lg:px-0 lg:grid grid-cols-4 gap-2">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Inmueble</SelectLabel>
                {PROPERTY_TYPES.map((animal) => (
                  <SelectItem value={animal} key={animal}>
                    {animal}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex gap-3 items-center mb-4 lg:mb-0">
            <Input type="text" placeholder="Desde" />
            <span>-</span>
            <Input type="text" placeholder="Hasta" />
          </div>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado</SelectLabel>
                {animals.map((animal) => (
                  <SelectItem value={animal.value.toString()} key={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input type="text" placeholder="Codigo" className="mb-4 lg:mb-0" />
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Municipio</SelectLabel>
                {animals.map((animal) => (
                  <SelectItem value={animal.value.toString()} key={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/*<Select size="sm" selectionMode="multiple" label="Atributos" className="mb-4 lg:max-w-xs lg:mb-0">*/}
          {/*  {attributesOptions.map((attribute) => (*/}
          {/*    <SelectItem key={attribute.label} value={attribute.label}>*/}
          {/*      {attribute.label}*/}
          {/*    </SelectItem>*/}
          {/*  ))}*/}
          {/*</Select>*/}
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Zona</SelectLabel>
                {animals.map((animal) => (
                  <SelectItem value={animal.value.toString()} key={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-end justify-center px-2 mt-5">
        <Button className="bg-red-900" size="lg">
          Buscar
        </Button>
      </div>
    </section>
  );
}
