'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect, useState } from 'react';
import { AdjacencyForm, UtilityForm } from '@/lib/interfaces/property/PropertyForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import AdjacencyFormComponent from '@/components/property/admin/AdjacencyForm';

export function LocationInformation() {
  const { control, setValue, getValues } = useFormContext();
  const [municipalities, setMunicipalities] = useState<string[]>([]);

  const {
    fields: adjacencies,
    update,
    remove,
    append,
  } = useFieldArray({
    control,
    name: 'adjacencies',
  });

  function onChangeLocationState(value: string) {
    setMunicipalities(value === 'Cojedes' ? LOCATIONS_DETAIL.cojedes : value === 'Carabobo' ? LOCATIONS_DETAIL.carabobo : []);
    setValue('locationInformation.state', value);
  }

  useEffect(() => {
    const state = getValues('locationInformation.state');
    setMunicipalities(state === 'Cojedes' ? LOCATIONS_DETAIL.cojedes : state === 'Carabobo' ? LOCATIONS_DETAIL.carabobo : []);
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de ubicacion </h1>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={control}
          name="locationInformation.country"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
              <FormLabel>Pais</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="locationInformation.state"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={onChangeLocationState} defaultValue={field.value}>
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

        <FormField
          control={control}
          name="locationInformation.municipality"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
              <FormLabel>Municipio</FormLabel>
              <Select disabled={municipalities.length < 1} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality}>
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/*<FormField*/}
        {/*  control={control}*/}
        {/*  name="locationInformation.city"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">*/}
        {/*      <FormLabel>Ciudad</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Input {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}
        <FormField
          control={control}
          name="locationInformation.urbanization"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Urbanizacion / Sector</FormLabel>
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
              <FormLabel>Nombre de Residencia/ Centro Comercial/ Edificio/ Complejo</FormLabel>
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
              <FormLabel>¿Se encuentra en calle cerrada?</FormLabel>
              <Select disabled={municipalities.length < 1} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Si">Si</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
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
              <FormLabel>Especificar cómo llegar</FormLabel>
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
      <Separator className="mb-5 mt-10" />
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl">Adyacencias</h2>
        <Dialog>
          <DialogTrigger
            type="button"
            className="w-[40px] h-[40px] text-primary-foreground flex items-center justify-center rounded-md bg-primary"
          >
            <Settings size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confguracion de adyacencias</DialogTitle>
              <DialogDescription>Aqui podras agregar, editar y eliminar adyacencias de manera rapida.</DialogDescription>
            </DialogHeader>
            <AdjacencyFormComponent
              data={adjacencies as AdjacencyForm[]}
              onAppend={(values) => {
                append({
                  ...values,
                });
              }}
              onUpdate={update}
              onRemove={remove}
            />
          </DialogContent>
        </Dialog>
      </div>
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
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} checked={value} {...field} />
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
