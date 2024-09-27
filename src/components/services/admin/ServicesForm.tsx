'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Service } from '@prisma/client';
import { ServiceFormSchema } from '@/lib/interfaces/Service';
import { Pencil, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { createService, deleteService, updateService } from '@/actions/service';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';

type Props = {
  data: Service[];
  onDelete: (id: number) => void;
  onRefresh: () => void;
};

export default function ServicesForm({ data, onDelete, onRefresh }: Props) {
  const form = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      id: 0,
      title: '',
    },
  });

  const [serviceForEdition, setServiceForEdition] = useState<Service>({ id: 0, title: '' });

  async function onSubmit(values: z.infer<typeof ServiceFormSchema>) {
    if (values.id > 0) {
      const { success, error } = await updateService(values);
      if (success) {
        onRefresh();
        toast.success('Se actualizo el servicio con exito!');
        clearEditSelection();
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el servicio: ${error}`);
        console.log(error);
      }
    } else {
      const { success, error } = await createService(values);
      if (success) {
        onRefresh();
        toast.success('Se registro el servicio con exito!');
        clearEditSelection();
      } else {
        toast.error(`Ocurrio un error al intentar registrar el servicio: ${error}`);
        console.log(error);
      }
    }
  }

  async function handleDeleteService(id: number) {
    const { success, error } = await deleteService(id);
    if (success) {
      toast.success('Se elimino el servicio con exito!');
      onDelete(id);
    } else {
      toast.error(`Ocurrio un error al intentar eliminar el servicio: ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'title':
        return 'Nombre de servicio';
      default:
        return key;
    }
  }

  function handleEditSelection(service: Service) {
    setServiceForEdition(service);
    form.setValue('id', service.id);
    form.setValue('title', service.title);
  }

  function clearEditSelection() {
    form.setValue('id', 0);
    form.setValue('title', '');
    setServiceForEdition({ id: 0, title: '' });
  }

  return (
    <div className="p-4">
      <div className="max-h-[300px] overflow-auto">
        {data.map((service) => (
          <div
            key={service.id}
            className={`flex items-center justify-between p-2 rounded ${service.id === serviceForEdition.id && 'bg-muted'}`}
          >
            <span className="text-accent-foreground">{service.title}</span>
            <div className="flex items-center">
              {service.id !== serviceForEdition.id && (
                <Button variant="ghost" size="icon" onClick={() => handleEditSelection(service)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              {service.id === serviceForEdition.id && (
                <Button variant="ghost" size="icon" onClick={clearEditSelection} className="mr-2">
                  <XCircle className="h-4 w-4" />
                  <span className="sr-only">Cancel</span>
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Esta seguro de eliminar el servicio ({service.title})?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteService(service.id)}>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={`flex gap-2 ${Object.keys(form.formState.errors).length > 0 ? 'items-center' : 'items-end'}`}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nombre de servicio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-auto bg-red-900 hidden sm:block">
              {form.formState.isSubmitting && (
                <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
              )}
              {!form.formState.isSubmitting && 'Guardar'}
            </Button>
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

          <div className="sm:hidden block mt-2 ">
            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full bg-red-900">
              {form.formState.isSubmitting && (
                <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
              )}
              {form.formState.isSubmitting ? 'Cargando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
