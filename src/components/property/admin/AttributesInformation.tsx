'use client';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {AttributeForm} from "@/lib/interfaces/property/PropertyForm";

export function AttributesInformation() {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: 'attributes',
  });

  // TODO agregar la posibilidad de crear un atributo

  return (
    <div className="grid grid-cols-12 gap-2">
      {fields.map((arrayField, index) => {
        const { id, formType, label, placeholder, options, value } = arrayField as AttributeForm;
        if (formType === 'text') {
          return (
            <FormField
              key={id}
              control={control}
              defaultValue={false}
              name={`attributes.${index}.value`}
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 mt-5">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder ?? ''} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          );
        }
        if (formType === 'select') {
          return (
            <FormField
              key={id}
              control={control}
              defaultValue={false}
              name={`attributes.${index}.value`}
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6 mt-5 lg:col-span-4 flex flex-col justify-end">
                  <FormLabel>{label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options?.split('#').map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          );
        }
        if (formType === 'check') {
          return (
            <FormField
              key={id}
              control={control}
              defaultValue={false}
              name={`attributes.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex gap-2 items-end col-span-12 md:col-span-6 lg:col-span-3">
                  <FormControl>
                    <Checkbox className="cursor-pointer" onCheckedChange={field.onChange} defaultChecked={value} {...field} />
                  </FormControl>
                  <FormLabel className="cursor-pointer">{label}</FormLabel>
                </FormItem>
              )}
            />
          );
        }
      })}
    </div>
  );
}
