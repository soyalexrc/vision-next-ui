'use client';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {AttributeForm, DistributionForm, UtilityForm} from '@/lib/interfaces/property/PropertyForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import AttributeFormComponent from '@/components/property/admin/AttributeForm';
import { Separator } from '@/components/ui/separator';
import DistributionFormComponent from '@/components/property/admin/DistributionForm';

export function AttributesInformation() {
  const { control, register } = useFormContext();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'attributes',
  });

  const {
    fields: distributionFields,
    update: updateDistribution,
    remove: removeDistribution,
    append: appendDistribution,
  } = useFieldArray({
    control,
    name: 'distributions',
  });

  // TODO agregar la posibilidad de crear un atributo

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="flex justify-between col-span-12 items-center">
        <h2 className="text-2xl mb-4 col-span-12">Distribucion</h2>
        <Dialog>
          <DialogTrigger
            type="button"
            className="w-[40px] h-[40px] text-primary-foreground flex items-center justify-center rounded-md bg-primary"
          >
            <Settings size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confguracion de elementos de distribucion</DialogTitle>
              <DialogDescription>Aqui podras agregar, editar y eliminar elementos de distribucion de manera rapida.</DialogDescription>
            </DialogHeader>
            <DistributionFormComponent
              data={distributionFields as DistributionForm[]}
              onAppend={(values) => {
                appendDistribution({
                  ...values,
                });
              }}
              onUpdate={updateDistribution}
              onRemove={removeDistribution}
            />
          </DialogContent>
        </Dialog>
      </div>

      {distributionFields.map((field, index) => {
        const { value, id, title } = field as DistributionForm;
        return (
          <FormField
            key={id}
            control={control}
            defaultValue={false}
            name={`distributions.${index}.value`}
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

      <Separator className="my-5 col-span-12" />

      <div className="flex justify-between col-span-12 items-center">
        <h2 className="text-2xl mb-4 col-span-12">Atributos</h2>
        <Dialog>
          <DialogTrigger
            type="button"
            className="w-fit mb-5 px-5 h-[40px] text-primary-foreground flex items-center justify-center rounded-md bg-primary col-span-12"
          >
            <Settings size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confguracion de atributos</DialogTitle>
              <DialogDescription>Aqui podras agregar, editar y eliminar equipos de manera rapida.</DialogDescription>
            </DialogHeader>
            <AttributeFormComponent
              data={fields as AttributeForm[]}
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

      {fields.map((arrayField, index) => {
        const { id, formType, label, placeholder, options, value } = arrayField as AttributeForm;
        if (formType === 'text') {
          return (
            <FormField
              key={id}
              control={control}
              defaultValue=""
              name={`attributes.${index}.value`}
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 mt-5">
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholder || ''} {...field} />
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
