'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { Input } from '@/components/ui/input';
import { EquipmentForm } from '@/lib/interfaces/property/PropertyForm';

export function DistributionAndEquipmentInformation() {
  const { control, register } = useFormContext();

  const { fields: equipmentFields } = useFieldArray({
    control,
    name: 'equipments',
  });

  const { fields: utilityFields } = useFieldArray({
    control,
    name: 'utilities',
  });
  // TODO agregar la posibilidad de crear un equipo / utilidad

  return (
    <div className="grid grid-cols-12 gap-y-2">
      <h2 className="text-2xl mb-4 col-span-12">Equipos</h2>
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

      <div className="my-5" />

      <h2 className="text-2xl mb-4 col-span-12">Servicios / Utilidades</h2>
      {utilityFields.map((field, index) => {
        const { value, id, title } = field as EquipmentForm;
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
