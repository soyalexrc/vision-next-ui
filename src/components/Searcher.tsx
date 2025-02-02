'use client';
import { TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { SelectContent, SelectGroup, SelectItem, Select, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/lib/api/categories';
import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import { useEffect, useState } from 'react';

export default function Searcher() {
  const { data, isPending } = useCategories();
  const [selectedState, setSelectedState] = useState<string>('');
  const [municipalities, setMunicipalities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState === 'Cojedes') {
      setMunicipalities(LOCATIONS_DETAIL.cojedes);
    }
    if (selectedState === 'Carabobo') {
      setMunicipalities(LOCATIONS_DETAIL.carabobo);
    }
  }, [selectedState]);

  return (
    <section className="lg:px-24 w-full absolute top-[50%] ">
      <div className="bg-white p-4 rounded-xl">
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
            <Select disabled={isPending}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de inmueble" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccionar</SelectLabel>
                  {data?.map((category) => (
                    <SelectItem value={category.title} key={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex gap-3 items-center my-4 lg:mb-0">
              <Input type="text" placeholder="Desde" />
              <span>-</span>
              <Input type="text" placeholder="Hasta" />
            </div>
          </div>
          <div>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccionar</SelectLabel>
                  {LOCATIONS.map((state) => (
                    <SelectItem value={state} key={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input type="text" placeholder="Codigo" className="my-4 lg:mb-0" />
          </div>
          <div>
            <Select disabled={!selectedState}>
              <SelectTrigger>
                <SelectValue placeholder="Municipio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccionar</SelectLabel>
                  {municipalities.map((municipality) => (
                    <SelectItem value={municipality} key={municipality}>
                      {municipality}
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
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Zona" />
              </SelectTrigger>
              <SelectContent>
                {/*<SelectGroup>*/}
                {/*  <SelectLabel>Zona</SelectLabel>*/}
                {/*  {animals.map((animal) => (*/}
                {/*    <SelectItem value={animal.value.toString()} key={animal.value}>*/}
                {/*      {animal.label}*/}
                {/*    </SelectItem>*/}
                {/*  ))}*/}
                {/*</SelectGroup>*/}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-end justify-center px-2 mt-5">
          <Button className="bg-red-900" size="lg">
            Buscar
          </Button>
        </div>
      </div>
    </section>
  );
}
