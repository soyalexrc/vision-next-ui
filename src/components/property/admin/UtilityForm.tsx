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
import { UtilityForm } from '@/lib/interfaces/property/PropertyForm';
import { UtilityFormSchema } from '@/lib/interfaces/Utility';
import { createUtility, deleteUtility, updateUtility } from '@/actions/property/utility';

type Props = {
  data: UtilityForm[];
  onRemove: (index: number) => void;
  onAppend: (values: any) => void;
  onUpdate: (index: number, values: any) => void;
};

export default function UtilityForm({ data, onAppend, onUpdate, onRemove }: Props) {
  console.log(data);
  const form = useForm<z.infer<typeof UtilityFormSchema>>({
    resolver: zodResolver(UtilityFormSchema),
    defaultValues: {
      id: 0,
      title: '',
      description: '',
    },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [utilityForEdition, setUtilityForEdition] = useState<UtilityForm>({
    utilityId: 0,
    title: '',
    id: '',
    additionalInformation: '',
    value: false,
    description: '',
  });

  async function onSubmit(values: z.infer<typeof UtilityFormSchema>) {
    if (values.title.length < 1) {
      toast.error('Ingresa un titulo para el servicio (utilidad)');
      return;
    }
    setSubmitting(true);
    if (values.id !== 0) {
      const { success, error, data: eq } = await updateUtility(values);
      if (success) {
        const index = data.findIndex((e) => e.utilityId === values.id);
        onUpdate(index, { ...values, title: eq?.title, description: eq?.description, utilityId: eq?.id });
        toast.success('Se actualizo el servicio (utilidad) con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el servicio (utilidad): ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    } else {
      const { success, error, data: eq } = await createUtility(values);
      if (success) {
        onAppend({ title: eq?.title, description: eq?.description, utilityId: eq?.id });
        toast.success('Se registro el servicio (utilidad) con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar registrar el servicio (utilidad): ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    }
  }

  async function handleDeleteUtility(id: number) {
    const index = data.findIndex((e) => e.utilityId === id);
    const { success, error } = await deleteUtility(id);
    if (success) {
      toast.success('Se elimino el servicio (utilidad) con exito!');
      onRemove(index);
    } else {
      toast.error(`Ocurrio un error al intentar eliminar el servicio (utilidad): ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'title':
        return 'Nombre de servicio (utilidad)';
      default:
        return key;
    }
  }

  function handleEditSelection(utility: UtilityForm) {
    setUtilityForEdition(utility);
    form.setValue('id', utility.utilityId);
    form.setValue('title', utility.title);
    form.setValue('description', utility.description);
  }

  function clearEditSelection() {
    form.setValue('id', 0);
    form.setValue('title', '');
    form.setValue('description', '');
    setUtilityForEdition({
      utilityId: 0,
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
        {data.map((utility) => (
          <div
            key={utility.utilityId}
            className={`flex items-center justify-between p-2 rounded ${utility.utilityId === utilityForEdition.utilityId && 'bg-muted'}`}
          >
            <div>
              <span className="text-accent-foreground">{utility.title}</span>
              <br />
              <span className=" text-xs text-accent-foreground">{utility.description}</span>
            </div>
            <div className="flex items-center">
              {utility.utilityId !== utilityForEdition.utilityId && (
                <Button variant="ghost" size="icon" onClick={() => handleEditSelection(utility)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              {utility.utilityId === utilityForEdition.utilityId && (
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
                    <AlertDialogTitle>Esta seguro de eliminar el servicio (utilidad) ({utility.title})?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteUtility(utility.utilityId)}>Continuar</AlertDialogAction>
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
                  <FormLabel>Nombre de servicio (utilidad)</FormLabel>
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
