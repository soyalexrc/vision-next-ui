'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { EquipmentForm } from '@/components/property/admin/PropertyForm';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { Input } from '@/components/ui/input';

export function DistributionAndEquipmentInformation() {
  const { control, register, getValues } = useFormContext();

  const { fields: equipmentFields } = useFieldArray({
    control,
    name: 'equipments',
  });

  const { fields: utilityFields } = useFieldArray({
    control,
    name: 'utilities',
  });

  return (
    <div>
      <h2 className="text-2xl mb-4">Equipos</h2>
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
                <FormItem className="flex gap-2 items-end col-span-3">
                  <FormControl>
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{title}</FormLabel>
                </FormItem>
                {field.value && (
                  <div className="flex gap-4 ml-6 mt-2">
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

      <h2 className="text-2xl mb-4">Servicios / Utilidades</h2>
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
                <FormItem className="flex gap-2 items-end col-span-3">
                  <FormControl>
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} defaultChecked={value} {...field} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{title}</FormLabel>
                </FormItem>
                {field.value && (
                  <div className="flex ml-6 mt-2">
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

      <button onClick={() => console.log(getValues('equipments'))}>check state</button>
    </div>
  );
}
