'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AdjacencyForm } from '@/components/property/admin/PropertyForm';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';

export function LocationInformation() {
  const { control } = useFormContext();

  const { fields: adjacencies } = useFieldArray({
    control,
    name: 'adjacencies',
  });

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de ubicacion </h1>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={control}
          name="locationInformation.country"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Pais</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.city"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.state"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.municipality"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Municipio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.urbanization"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Urbanizacion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.avenue"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Avenida</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.street"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Calle</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.location"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Ubicacion</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.referencePoint"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Punto de referencia</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.isClosedStreet"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Es una calle cerrada?</FormLabel>
              <FormControl>
                <Input placeholder="Si, No " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.tower"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Torre</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.floor"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Nro. de piso</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.nomenclature"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Nomenclatura de propiedad</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.howToGet"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Como llegar?</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.parkingNumber"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Numero de estacionamiento</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.parkingLevel"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Nivel de estacionamiento</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.trunkNumber"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Numero de maletero</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locationInformation.trunkLevel"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Nivel de maletero</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <h2 className="text-2xl text-center mb-5 pt-5 mt-10 border-t-2 border-gray-100">Adyacencias</h2>
      <div className="grid grid-cols-12 gap-2">
        {adjacencies.map((item, index) => {
          const { id, title, value } = item as AdjacencyForm;
          return (
            <FormField
              key={id}
              control={control}
              defaultValue={false}
              name={`adjacencies.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex gap-2 items-end col-span-12 md:col-span-6 lg:col-span-3">
                  <FormControl>
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} defaultChecked={value} {...field} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{title}</FormLabel>
                </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
