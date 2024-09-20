'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Service, SubService } from '@prisma/client';
import { SubServiceFormSchema } from '@/lib/interfaces/Service';
import { Pencil, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createSubService, deleteSubService, updateSubService } from '@/actions/service';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

type Props = {
  data: SubService[];
  defaultService?: Service;
  services: Service[];
  onDelete: (id: number) => void;
  onRefresh: () => void;
};

export default function SubServicesForm({ data, onDelete, onRefresh, defaultService, services }: Props) {
  const form = useForm<z.infer<typeof SubServiceFormSchema>>({
    resolver: zodResolver(SubServiceFormSchema),
    defaultValues: {
      id: 0,
      parentId: 0,
      service: '',
    },
  });

  const [serviceForEdition, setServiceForEdition] = useState<SubService>({ id: 0, service: '', serviceId: 0 });
  const [parentService, setParentService] = useState<Service>(defaultService ?? { id: 0, title: '' });
  const [subServices, setSubServices] = useState<SubService[]>(data);

  async function onSubmit(values: z.infer<typeof SubServiceFormSchema>) {
    console.log(values);
    if (values.id !== 0) {
      const { success, error } = await updateSubService(values);
      if (success) {
        onRefresh();
        toast.success('Se actualizo la operacion con exito!');
        clearEditSelection();
      } else {
        toast.error(`Ocurrio un error al intentar actualizar la operacion: ${error}`);
        console.log(error);
      }
    } else {
      const { success, error } = await createSubService(values);
      if (success) {
        onRefresh();
        toast.success('Se registro la operacion con exito!');
        clearEditSelection();
      } else {
        toast.error(`Ocurrio un error al intentar registrar la operacion: ${error}`);
        console.log(error);
      }
    }
  }

  async function handleDeleteSubService(id: number) {
    const { success, error } = await deleteSubService(id);
    if (success) {
      toast.success('Se elimino la operacion con exito!');
      onDelete(id);
    } else {
      toast.error(`Ocurrio un error al intentar eliminar la operacion: ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'title':
        return 'Nombre de operacion';
      default:
        return key;
    }
  }

  console.log(parentService);
  console.log(form.getValues());

  function handleEditSelection(service: SubService) {
    setServiceForEdition(service);
    form.setValue('id', service.id);
    form.setValue('parentId', service.serviceId);
    form.setValue('service', service.service);
  }

  function clearEditSelection() {
    form.setValue('id', 0);
    form.setValue('service', '');
    form.setValue('parentId', 0);
    setServiceForEdition({ id: 0, service: '', serviceId: 0 });
  }

  function handleSelectParentService(value: string) {
    const service = services.find((s) => s.title === value)!;
    form.setValue('parentId', service.id);
    setParentService(service);
  }

  useEffect(() => {
    if (parentService.id !== 0) {
      handleSelectParentService(parentService.title);
    }
  }, []);

  return (
    <div className="p-4">
      <FormLabel>Seleccionar servicio</FormLabel>
      <Select disabled={!services} value={parentService.title} onValueChange={handleSelectParentService}>
        <FormControl>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Selecciona un servicio" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {services.map((s) => (
            <SelectItem key={s.id} value={s.title}>
              {s.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {data.length < 1 && (
        <div className="my-5">
          <div className="p-12 bg-muted rounded-xl">
            <p className="text-gray-400">No existen operaciones bajo este servicio.</p>
          </div>
        </div>
      )}
      <div className="max-h-[300px] overflow-auto mt-5">
        {data.map((service) => (
          <div
            key={service.id}
            className={`flex items-center justify-between p-2 rounded ${service.id === serviceForEdition.id && 'bg-muted'}`}
          >
            <span className="text-accent-foreground">{service.service}</span>
            <div className="flex items-center">
              {service.id !== serviceForEdition.id && (
                <Button variant="ghost" size="icon" onClick={() => handleEditSelection(service)}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              {service.id === serviceForEdition.id && (
                <Button variant="ghost" size="icon" onClick={clearEditSelection}>
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
                    <AlertDialogTitle>Esta seguro de eliminar la operacion ({service.service})?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteSubService(service.id)}>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      {parentService.id !== 0 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={`flex gap-2 ${Object.keys(form.formState.errors).length > 0 ? 'items-center' : 'items-end'}`}>
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nombre de operacion</FormLabel>
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
      )}
    </div>
  );
}
