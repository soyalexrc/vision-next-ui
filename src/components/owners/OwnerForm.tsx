'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Owner } from '@prisma/client';
import { OwnersFormSchema } from '@/lib/interfaces/Owner';
import { createOwner, updateOwner } from '@/actions/owner';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  data: Owner;
  onCloseModal?: () => void;
  isForm?: boolean;
};

export default function OwnerForm({ data, onCloseModal, isForm }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof OwnersFormSchema>>({
    resolver: zodResolver(OwnersFormSchema),
    defaultValues: {
      name: data.name ?? '',
      lastname: data.lastname ?? '',
      phoneNumber: data.phoneNumber ?? '',
      birthdate: data.birthdate ?? undefined,
      isInvestor: data.isInvestor ?? false,
      email: data.email ?? '',
      id: data.id ?? -1,
    },
  });

  async function onSubmit(values: z.infer<typeof OwnersFormSchema>) {
    setLoading(true);
    if (values.id && values.id > 0) {
      const { success, error } = await updateOwner(values);
      setLoading(false);
      if (success) {
        toast.success('Se actualizo el propietario con exito!');
        await queryClient.invalidateQueries({ queryKey: ['owners'] });
        onCloseModal ? onCloseModal() : null;
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el propietario: ${error}`);
        console.log(error);
      }
    } else {
      const { success, error } = await createOwner(values);
      setLoading(false);
      if (success) {
        toast.success('Se registro el propietario con exito!');
        await queryClient.invalidateQueries({ queryKey: ['owners'] });
        onCloseModal ? onCloseModal() : null;
      } else {
        toast.error(`Ocurrio un error al intentar registrar el propietario: ${error}`);
        console.log(error);
      }
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'name':
        return 'Nombre';
      case 'lastname':
        return 'Apellido';
      case 'email':
        return 'Correo electronico';
      case 'phoneNumber':
        return 'Numero de telefono';
      default:
        return key;
    }
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
          <div className="grid grid-cols-12 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Correo electronico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-12">
                  <FormLabel>Numero de telefono</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="col-span-12 ">
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" locale={es} selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isInvestor"
              render={({ field }) => (
                <FormItem className="col-span-12 flex items-end gap-2">
                  <FormControl>
                    <Checkbox defaultChecked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                  </FormControl>
                  <FormLabel>Es inversor</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive" className="mt-5">
              <AlertTitle>Existen errores en las siguientes secciones del formulario</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.keys(form.formState.errors).map((key) => (
                    <li key={key}>
                      <span className="mr-2">*</span>
                      <span>{formatErrorSection(key)}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-3 mt-10">
            {isForm && (
              <Button disabled={form.formState.isSubmitting} type="submit" className="w-full lg:w-auto bg-red-900">
                {form.formState.isSubmitting && (
                  <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
                )}
                {form.formState.isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
              </Button>
            )}
            {!isForm && (
              <Button onClick={() => onSubmit(form.getValues())} disabled={loading} type="button" className="w-full lg:w-auto bg-red-900">
                {loading && <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>}
                {loading ? 'Guardando cambios...' : 'Guardar cambios'}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
