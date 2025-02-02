'use client';
import { TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { SelectContent, SelectGroup, SelectItem, Select, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/lib/api/categories';
import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SearcherFormSchema } from '@/lib/interfaces/Searcher';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

export default function Searcher() {
  const { data } = useCategories();
  const [municipalities, setMunicipalities] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof SearcherFormSchema | any>>({
    resolver: zodResolver(SearcherFormSchema),
    defaultValues: {
      operationType: 'venta',
      codigo: '',
      estado: '',
      municipio: '',
      propertyType: 'Apartamento',
    },
  });

  const watchedOperationType = form.watch('operationType');
  const watchedState = form.watch('estado');

  useEffect(() => {
    if (watchedState === 'Cojedes') {
      setMunicipalities(LOCATIONS_DETAIL.cojedes);
    }
    if (watchedState === 'Carabobo') {
      setMunicipalities(LOCATIONS_DETAIL.carabobo);
    }
  }, [watchedState]);

  function search(values: z.infer<typeof SearcherFormSchema>) {
    const { operationType, codigo, estado, municipio, propertyType } = values;

    const searchParams = new URLSearchParams();
    if (operationType) searchParams.append('tipo-de-operacion', operationType);
    if (codigo) searchParams.append('codigo', codigo);
    if (estado) searchParams.append('estado', estado);
    if (municipio) searchParams.append('municipio', municipio);
    if (propertyType) searchParams.append('tipo-de-inmueble', propertyType);

    const searchUrl = `/inmuebles?${searchParams.toString()}`;
    console.log(searchUrl);

    router.push(searchUrl);
  }

  return (
    <section className="md:px-24 w-full md:absolute top-[50%] md:translate-y-[-50%] lg:translate-y-[0]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(search)}>
          <div className="bg-white p-4 rounded-xl">
            <div className="w-full flex justify-center md:justify-start mt-4">
              <Tabs value={watchedOperationType} className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="venta" onClick={() => form.setValue('operationType', 'venta')}>
                    Venta
                  </TabsTrigger>
                  <TabsTrigger value="alquiler" onClick={() => form.setValue('operationType', 'alquiler')}>
                    Alquiler
                  </TabsTrigger>
                  <TabsTrigger value="traspaso" onClick={() => form.setValue('operationType', 'traspaso')}>
                    Traspaso
                  </TabsTrigger>
                </TabsList>
                {/*<TabsContent value="sell">Make changes to your account here.</TabsContent>*/}
                {/*<TabsContent value="rent">Change your password here.</TabsContent>*/}
                {/*<TabsContent value="transfer">Change your password here.</TabsContent>*/}
              </Tabs>
            </div>
            <div className="py-4 px-4 flex flex-col lg:px-0 lg:grid grid-cols-4 gap-4 lg:gap-2">
              <div>
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de imueble</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opcion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.map((property) => (
                            <SelectItem key={property.id} value={property.title}>
                              {property.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opcion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LOCATIONS.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="municipio"
                  disabled={!watchedState}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Municipio</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una opcion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {municipalities?.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="codigo"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-3">
                      <FormLabel>Codigo de inmueble</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*<div>*/}
              {/*  <Select disabled>*/}
              {/*    <SelectTrigger>*/}
              {/*      <SelectValue placeholder="Zona" />*/}
              {/*    </SelectTrigger>*/}
              {/*    <SelectContent>*/}
              {/*      /!*<SelectGroup>*!/*/}
              {/*      /!*  <SelectLabel>Zona</SelectLabel>*!/*/}
              {/*      /!*  {animals.map((animal) => (*!/*/}
              {/*      /!*    <SelectItem value={animal.value.toString()} key={animal.value}>*!/*/}
              {/*      /!*      {animal.label}*!/*/}
              {/*      /!*    </SelectItem>*!/*/}
              {/*      /!*  ))}*!/*/}
              {/*      /!*</SelectGroup>*!/*/}
              {/*    </SelectContent>*/}
              {/*  </Select>*/}
              {/*</div>*/}
            </div>
            <div className="flex items-end justify-center px-2 mt-5">
              <Button className="bg-red-900" size="lg">
                Buscar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
