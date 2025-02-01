'use client';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { useCategories } from '@/lib/api/categories';

export function GeneralInformation() {
  const { control } = useFormContext();
  const { data, isPending } = useCategories();

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion general</h1>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={control}
          name="generalInformation.publicationTitle"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Titulo de publicacion</FormLabel>
              <FormControl>
                <Input placeholder="Titulo" {...field} />
              </FormControl>
              <FormDescription>Este es el titulo que se mostrara en tu URL y en las busquedas de google.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInformation.description"
          render={({ field }) => (
            <FormItem className="col-span-12 my-5">
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea className="min-h-[150px]" placeholder="Descripcion" {...field} />
              </FormControl>
              <FormDescription>Este es la descripcion de el inmueble. Tambien aparecera en las busquedas de google.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          defaultValue={''}
          name="generalInformation.code"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Codigo</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          disabled={isPending}
          name="generalInformation.propertyType"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Tipo de propiedad</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data?.map((category) => (
                    <SelectItem key={category.id} value={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInformation.propertyCondition"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Tipo de mercado</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key="No Aplica" value="No Aplica">
                    No Aplica
                  </SelectItem>
                  <SelectItem key="Mercado Primario" value="Mercado Primario">
                    Mercado Primario
                  </SelectItem>

                  <SelectItem key="Mercado Secundario" value="Mercado Secundario">
                    Mercado Secundario
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInformation.footageGround"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Metraje de terreno</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} className="pr-10" />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2">m2</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.footageBuilding"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Metraje de construccion</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} className="pr-10" />
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2">m2</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.antiquity"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Antiguedad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.zoning"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Zonificacion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.amountOfFloors"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Cantidad de pisos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.propertiesPerFloor"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Propiedades por piso</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInformation.typeOfWork"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Tipo de obra</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key="No Aplica" value="No Aplica">
                    No Aplica
                  </SelectItem>
                  <SelectItem key="Obra gris" value="Obra gris">
                    Obra gris
                  </SelectItem>

                  <SelectItem key="Obra blanca" value="Obra blanca">
                    Obra blanca
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.handoverKeys"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>El propietario nos facilitó un juego de llaves</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.termsAndConditionsAccepted"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} onCheckedChange={field.onChange} {...field} />
              </FormControl>
              <FormLabel>El propietario aceptó los términos y condiciones de trabajo mediante la ficha técnica</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.isOccupiedByPeople"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>La propiedad está ocupada por personas</FormLabel>
            </FormItem>
          )}
        />
        {/*<FormField*/}
        {/*  control={control}*/}
        {/*  name="generalInformation.isFurnished"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem className="col-span-12 flex items-end gap-2">*/}
        {/*      <FormControl>*/}
        {/*        <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormLabel>Esta amoblado?</FormLabel>*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
      </div>
    </div>
  );
}
