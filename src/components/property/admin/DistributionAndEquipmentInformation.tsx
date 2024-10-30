'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { Input } from '@/components/ui/input';
import { EquipmentForm, UtilityForm } from '@/lib/interfaces/property/PropertyForm';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EquipmentsForm from '@/components/property/admin/EquipmentsForm';
import UtilityFormComponent from '@/components/property/admin/UtilityForm';

export function DistributionAndEquipmentInformation() {
  const { control, register } = useFormContext();

  const {
    fields: equipmentFields,
    update: updateEquipment,
    remove: removeEquipment,
    append: appendEquipment,
  } = useFieldArray({
    control,
    name: 'equipments',
  });

  const {
    fields: utilityFields,
    update: updateUtility,
    remove: removeUtility,
    append: appendUtility,
  } = useFieldArray({
    control,
    name: 'utilities',
  });
  // TODO agregar la posibilidad de crear un equipo / utilidad

  return (
    <div className="grid grid-cols-12 gap-y-2">
      <div className="flex justify-between col-span-12 items-center">
        <h2 className="text-2xl mb-4 col-span-12">Equipos y Mobiliario</h2>
        <Dialog>
          <DialogTrigger
            type="button"
            className="w-[40px] h-[40px] text-primary-foreground flex items-center justify-center rounded-md bg-primary"
          >
            <Settings size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confguracion de equipos y mobiliario</DialogTitle>
              <DialogDescription>Aqui podras agregar, editar y eliminar equipos y mobiliario de manera rapida.</DialogDescription>
            </DialogHeader>
            <EquipmentsForm
              data={equipmentFields as EquipmentForm[]}
              onAppend={(values) => {
                appendEquipment({
                  ...values,
                });
              }}
              onUpdate={updateEquipment}
              onRemove={removeEquipment}
            />
          </DialogContent>
        </Dialog>
      </div>
      {equipmentFields.map((field, index) => {
        const { id, title } = field as EquipmentForm;
        return (
          <FormField
            key={id}
            control={control}
            defaultValue={false}
            name={`equipments.${index}.value`}
            render={({ field }) => (
              <>
                <FormItem className="flex gap-2 items-end col-span-12">
                  <FormControl>
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{title}</FormLabel>
                </FormItem>
                {field.value && (
                  <div className="flex flex-wrap gap-4 ml-6 mt-2 col-span-12">
                    <FormItem className="w-[230px]">
                      <FormControl>
                        <Input placeholder="Agregar informacion adicional" {...register(`equipments.${index}.additionalInformation`)} />
                      </FormControl>
                    </FormItem>
                    <FormItem className="w-[230px]">
                      <FormControl>
                        <Input placeholder="Marca (opcional)" {...register(`equipments.${index}.brand`)} />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              </>
            )}
          />
        );
      })}

      <Separator className="my-5 col-span-12" />

      <div className="flex justify-between col-span-12 items-center">
        <h2 className="text-2xl mb-4 col-span-12">Servicios / Utilidades</h2>
        <Dialog>
          <DialogTrigger
            type="button"
            className="w-[40px] h-[40px] text-primary-foreground flex items-center justify-center rounded-md bg-primary"
          >
            <Settings size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confguracion de servicios (utilidades)</DialogTitle>
              <DialogDescription>Aqui podras agregar, editar y eliminar servicios (utilidades) de manera rapida.</DialogDescription>
            </DialogHeader>
            <UtilityFormComponent
              data={utilityFields as UtilityForm[]}
              onAppend={(values) => {
                appendUtility({
                  ...values,
                });
              }}
              onUpdate={updateUtility}
              onRemove={removeUtility}
            />
          </DialogContent>
        </Dialog>
      </div>

      {utilityFields.map((field, index) => {
        const { value, id, title } = field as UtilityForm;
        return (
          <FormField
            key={id}
            control={control}
            defaultValue={false}
            name={`utilities.${index}.value`}
            render={({ field }) => (
              <>
                <FormItem className="flex gap-2 items-end col-span-12">
                  <FormControl>
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} defaultChecked={value} {...field} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{title}</FormLabel>
                </FormItem>
                {field.value && (
                  <div className="flex flex-wrap ml-6 mt-2 col-span-12">
                    <FormItem className="w-[230px]">
                      <FormControl>
                        <Input placeholder="Agregar informacion adicional" {...register(`utilities.${index}.additionalInformation`)} />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
              </>
            )}
          />
        );
      })}
    </div>
  );
}
