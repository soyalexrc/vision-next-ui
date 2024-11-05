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
import { AdjacencyForm } from '@/lib/interfaces/property/PropertyForm';
import { AdjacencyFormSchema } from '@/lib/interfaces/Adjacency';
import { createAdjacency, deleteAdjacency, updateAdjacency } from '@/actions/property/adjacency';

type Props = {
  data: AdjacencyForm[];
  onRemove: (index: number) => void;
  onAppend: (values: any) => void;
  onUpdate: (index: number, values: any) => void;
};

export default function AdjacencyForm({ data, onAppend, onUpdate, onRemove }: Props) {
  console.log(data);
  const form = useForm<z.infer<typeof AdjacencyFormSchema>>({
    resolver: zodResolver(AdjacencyFormSchema),
    defaultValues: {
      id: 0,
      title: '',
      description: '',
    },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [adjacencyForEdition, setAdjacencyForEdition] = useState<AdjacencyForm>({
    adjacencyId: 0,
    title: '',
    id: '',
    value: false,
    description: '',
  });

  async function onSubmit(values: z.infer<typeof AdjacencyFormSchema>) {
    if (values.title.length < 1) {
      toast.error('Ingresa un titulo para el adyacencia');
      return;
    }
    setSubmitting(true);
    if (values.id !== 0) {
      const { success, error, data: eq } = await updateAdjacency(values);
      if (success) {
        const index = data.findIndex((e) => e.adjacencyId === values.id);
        onUpdate(index, { ...values, title: eq?.title, description: eq?.description, adjacencyId: eq?.id });
        toast.success('Se actualizo el adyacencia con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el adyacencia: ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    } else {
      const { success, error, data: eq } = await createAdjacency(values);
      if (success) {
        onAppend({ title: eq?.title, description: eq?.description, adjacencyId: eq?.id });
        toast.success('Se registro el adyacencia con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar registrar el adyacencia: ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    }
  }

  async function handleDeleteAdjacency(id: number) {
    const index = data.findIndex((e) => e.adjacencyId === id);
    const t = toast.loading('Se esta eliminando la adyacencia', {
      duration: 20000,
    });
    const { success, error } = await deleteAdjacency(id);
    toast.dismiss(t);
    if (success) {
      toast.success('Se elimino el adyacencia con exito!');
      onRemove(index);
    } else {
      toast.error(`Ocurrio un error al intentar eliminar el adyacencia: ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'title':
        return 'Nombre de adyacencia';
      default:
        return key;
    }
  }

  function handleEditSelection(adjacency: AdjacencyForm) {
    setAdjacencyForEdition(adjacency);
    form.setValue('id', adjacency.adjacencyId);
    form.setValue('title', adjacency.title);
    form.setValue('description', adjacency.description);
  }

  function clearEditSelection() {
    form.setValue('id', 0);
    form.setValue('title', '');
    form.setValue('description', '');
    setAdjacencyForEdition({
      adjacencyId: 0,
      title: '',
      id: '',
      value: false,
      description: '',
    });
  }

  return (
    <div className="p-4">
      <div className="max-h-[300px] overflow-auto">
        {data.map((adjacency) => (
          <div
            key={adjacency.adjacencyId}
            className={`flex items-center justify-between p-2 rounded ${
              adjacency.adjacencyId === adjacencyForEdition.adjacencyId && 'bg-muted'
            }`}
          >
            <div>
              <span className="text-accent-foreground">{adjacency.title}</span>
              <br />
              <span className=" text-xs text-accent-foreground">{adjacency.description}</span>
            </div>
            <div className="flex items-center">
              {adjacency.adjacencyId !== adjacencyForEdition.adjacencyId && (
                <Button variant="ghost" size="icon" onClick={() => handleEditSelection(adjacency)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              {adjacency.adjacencyId === adjacencyForEdition.adjacencyId && (
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
                    <AlertDialogTitle>Esta seguro de eliminar el adyacencia ({adjacency.title})?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteAdjacency(adjacency.adjacencyId)}>Continuar</AlertDialogAction>
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
                  <FormLabel>Nombre de adyacencia</FormLabel>
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
            {/*      <FormLabel>Descripcion de adyacencia (opcional)</FormLabel>*/}
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
