'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
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
import { DistributionForm as DistributionFormType } from '@/lib/interfaces/property/PropertyForm';
import { createDistribution, deleteDistribution, updateDistribution } from '@/actions/property/distribution';
import { DistributionFormSchema } from '@/lib/interfaces/Distribution';

type Props = {
  data: DistributionFormType[];
  onRemove: (index: number) => void;
  onAppend: (values: any) => void;
  onUpdate: (index: number, values: any) => void;
};

export default function DistributionForm({ data, onAppend, onUpdate, onRemove }: Props) {
  const form = useForm<z.infer<typeof DistributionFormSchema>>({
    resolver: zodResolver(DistributionFormSchema),
    defaultValues: {
      id: 0,
      title: '',
      description: '',
    },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [distributionForEdition, setUtilityForEdition] = useState<DistributionFormType>({
    distributionId: 0,
    title: '',
    id: '',
    additionalInformation: '',
    value: false,
    description: '',
  });

  async function onSubmit(values: z.infer<typeof DistributionFormSchema>) {
    if (values.title.length < 1) {
      toast.error('Ingresa un titulo para la distribucion');
      return;
    }
    setSubmitting(true);
    if (values.id !== 0) {
      const { success, error, data: eq } = await updateDistribution(values);
      if (success) {
        const index = data.findIndex((e) => e.distributionId === values.id);
        onUpdate(index, { ...values, title: eq?.title, description: eq?.description, distributionId: eq?.id });
        toast.success('Se actualizo la distribucion con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar actualizar la distribucion: ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    } else {
      const { success, error, data: eq } = await createDistribution(values);
      if (success) {
        onAppend({ title: eq?.title, description: eq?.description, distributionId: eq?.id });
        toast.success('Se registro la distribucion con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar registrar la distribucion: ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    }
  }

  async function handleDeleteUtility(id: number) {
    const index = data.findIndex((e) => e.distributionId === id);
    const t = toast.loading('Se esta eliminando el inmueble', {
      duration: 20000,
    });
    const { success, error } = await deleteDistribution(id);
    toast.dismiss(t);
    if (success) {
      toast.success('Se elimino la distribucion con exito!');
      onRemove(index);
    } else {
      toast.error(`Ocurrio un error al intentar eliminar la distribucion: ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'title':
        return 'Nombre de distribucion';
      default:
        return key;
    }
  }

  function handleEditSelection(distribution: DistributionFormType) {
    setUtilityForEdition(distribution);
    form.setValue('id', distribution.distributionId);
    form.setValue('title', distribution.title);
    form.setValue('description', distribution.description);
  }

  function clearEditSelection() {
    form.setValue('id', 0);
    form.setValue('title', '');
    form.setValue('description', '');
    setUtilityForEdition({
      distributionId: 0,
      title: '',
      id: '',
      additionalInformation: '',
      value: false,
      description: '',
    });
  }

  return (
    <div className="p-4">
      <div className="max-h-[300px] overflow-auto">
        {data.map((distribution) => (
          <div
            key={distribution.distributionId}
            className={`flex items-center justify-between p-2 rounded ${
              distribution.distributionId === distributionForEdition.distributionId && 'bg-muted'
            }`}
          >
            <div>
              <span className="text-accent-foreground">{distribution.title}</span>
              <br />
              <span className=" text-xs text-accent-foreground">{distribution.description}</span>
            </div>
            <div className="flex items-center">
              {distribution.distributionId !== distributionForEdition.distributionId && (
                <Button variant="ghost" size="icon" onClick={() => handleEditSelection(distribution)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              {distribution.distributionId === distributionForEdition.distributionId && (
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
                    <AlertDialogTitle>Esta seguro de eliminar la distribucion ({distribution.title})?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteUtility(distribution.distributionId)}>Continuar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form>
          <div className={`flex flex-col gap-2`}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nombre de distribucion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*<FormField*/}
            {/*  control={form.control}*/}
            {/*  name="description"*/}
            {/*  render={({ field }) => (*/}
            {/*    <FormItem className="flex-1">*/}
            {/*      <FormLabel>Descripcion de servicio (utilidad) (opcional)</FormLabel>*/}
            {/*      <FormControl>*/}
            {/*        <Input {...field} />*/}
            {/*      </FormControl>*/}
            {/*      <FormMessage />*/}
            {/*    </FormItem>*/}
            {/*  )}*/}
            {/*/>*/}
            <div className=" hidden sm:block mt-2">
              <Button disabled={submitting} onClick={() => onSubmit(form.getValues())} type="button" className="w-full bg-red-900">
                {submitting && <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>}
                {!submitting ? 'Guardar' : 'Cargando...'}
              </Button>
            </div>
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
            <Button disabled={submitting} onClick={() => onSubmit(form.getValues())} type="button" className="w-full bg-red-900">
              {submitting && <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>}
              {submitting ? 'Cargando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
