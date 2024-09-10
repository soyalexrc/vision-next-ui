'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { AllyFormSchema } from '@/lib/interfaces/Ally';
import { Ally, ExternalAdviser } from '@prisma/client';
import { createAlly, updateAlly } from '@/actions/ally';
import { ExternalAdviserFormSchema } from '@/lib/interfaces/ExternalAdviser';
import { createExternalAdviser, updateExternalAdviser } from '@/actions/external-adviser';

type Props = {
  data: ExternalAdviser;
  onCloseModal?: () => void;
};

export default function ExternalAdviserForm({ data, onCloseModal }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof ExternalAdviserFormSchema>>({
    resolver: zodResolver(ExternalAdviserFormSchema),
    defaultValues: {
      name: data.name ?? '',
      lastname: data.lastname ?? '',
      phoneNumber: data.phoneNumber ?? '',
      realStateCompanyName: data.realStateCompanyName ?? '',
      email: data.email ?? '',
      id: data.id ?? -1,
    },
  });

  async function onSubmit(values: z.infer<typeof ExternalAdviserFormSchema>) {
    if (values.id && values.id > 0) {
      const { success, error } = await updateExternalAdviser(values);
      if (success) {
        toast.success('Se actualizo el asesor externo con exito!');
        router.refresh();
        onCloseModal ? onCloseModal() : null;
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el asesor externo: ${error}`);
        console.log(error);
      }
    } else {
      const { success, error } = await createExternalAdviser(values);
      if (success) {
        toast.success('Se registro el asesor externo con exito!');
        router.refresh();
        onCloseModal ? onCloseModal() : null;
      } else {
        toast.error(`Ocurrio un error al intentar registrar el asesor externo: ${error}`);
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
      case 'realStateCompanyName':
        return 'Nombre de inmobiliaria';
      default:
        return key;
    }
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="py-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1">
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
                <FormItem className="col-span-1">
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
                <FormItem className="col-span-2">
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
                <FormItem className="col-span-2">
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
              name="realStateCompanyName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nombre de inmobiliaria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
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
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full lg:w-auto bg-red-900">
              {form.formState.isSubmitting && (
                <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
              )}
              {form.formState.isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
