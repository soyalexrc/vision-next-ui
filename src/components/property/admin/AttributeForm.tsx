'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
import { AttributeForm } from '@/lib/interfaces/property/PropertyForm';
import { AttributeFormSchema } from '@/lib/interfaces/Atribute';
import { createAttribute, deleteAttribute, updateAttribute } from '@/actions/property/attribute';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  data: AttributeForm[];
  onRemove: (index: number) => void;
  onAppend: (values: any) => void;
  onUpdate: (index: number, values: any) => void;
};

export default function AttributeForm({ data, onAppend, onUpdate, onRemove }: Props) {
  console.log(data);
  const form = useForm<z.infer<typeof AttributeFormSchema>>({
    resolver: zodResolver(AttributeFormSchema),
    defaultValues: {
      id: 0,
      label: '',
      formType: '',
      placeholder: '',
      options: '',
    },
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [attributeForEdition, setAttributeForEdition] = useState<AttributeForm>({
    attributeId: 0,
    label: '',
    id: '',
    placeholder: '',
    value: false,
    options: '',
    formType: '',
  });

  async function onSubmit(values: z.infer<typeof AttributeFormSchema>) {
    if (values.label.length < 1) {
      toast.error('Ingresa un label para el atributo');
      return;
    }
    if (values.formType.length < 1) {
      toast.error('Ingresa un tipo de formulario para el atributo');
      return;
    }
    setSubmitting(true);
    if (values.id !== 0) {
      const { success, error, data: eq } = await updateAttribute(values);
      if (success) {
        const index = data.findIndex((e) => e.attributeId === values.id);
        onUpdate(index, {
          ...values,
          label: eq?.label,
          placeholder: eq?.placeholder,
          attributeId: eq?.id,
          options: eq?.options,
          formType: eq?.formType,
        });
        toast.success('Se actualizo el atributo con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el atributo: ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    } else {
      const { success, error, data: eq } = await createAttribute(values);
      if (success) {
        onAppend({
          label: eq?.label,
          placeholder: eq?.placeholder,
          attributeId: eq?.id,
          options: eq?.options,
          formType: eq?.formType,
        });
        toast.success('Se registro el atributo con exito!');
        clearEditSelection();
        setSubmitting(false);
      } else {
        toast.error(`Ocurrio un error al intentar registrar el atributo: ${error}`);
        console.log(error);
        setSubmitting(false);
      }
    }
  }

  async function handleDeleteUtility(id: number) {
    const index = data.findIndex((e) => e.attributeId === id);
    const { success, error } = await deleteAttribute(id);
    if (success) {
      toast.success('Se elimino el atributo con exito!');
      onRemove(index);
    } else {
      toast.error(`Ocurrio un error al intentar eliminar el atributo: ${error}`);
      console.log(error);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'title':
        return 'Nombre de atributo';
      default:
        return key;
    }
  }

  function handleEditSelection(attribute: AttributeForm) {
    setAttributeForEdition(attribute);
    form.setValue('id', attribute.attributeId);
    form.setValue('label', attribute.label);
    form.setValue('placeholder', attribute.placeholder);
    form.setValue('formType', attribute.formType);
    form.setValue('options', attribute.options);
  }

  function clearEditSelection() {
    form.setValue('id', 0);
    form.setValue('label', '');
    form.setValue('placeholder', '');
    form.setValue('options', '');
    form.setValue('formType', '');
    setAttributeForEdition({
      attributeId: 0,
      label: '',
      id: '',
      placeholder: '',
      value: false,
      options: '',
      formType: '',
    });
  }

  return (
    <div className="p-4">
      <div className="max-h-[300px] overflow-auto">
        {data.map((attribute) => (
          <div
            key={attribute.attributeId}
            className={`flex items-center justify-between p-2 rounded ${
              attribute.attributeId === attributeForEdition.attributeId && 'bg-muted'
            }`}
          >
            <div>
              <span className="text-accent-foreground">{attribute.label}</span>
              <br />
              <span className=" text-xs text-accent-foreground">{attribute.formType}</span>
            </div>
            <div className="flex items-center">
              {attribute.attributeId !== attributeForEdition.attributeId && (
                <Button variant="ghost" size="icon" onClick={() => handleEditSelection(attribute)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}
              {attribute.attributeId === attributeForEdition.attributeId && (
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
                    <AlertDialogTitle>Esta seguro de eliminar el atributo ({attribute.label})?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteUtility(attribute.attributeId)}>Continuar</AlertDialogAction>
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
              name="label"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Nombre de atributo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeholder"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Descripcion de atributo (opcional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>opciones de atributo (opcional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Escribir opciones separados por #</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Tipo de formulario</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="check" value="check">
                        check
                      </SelectItem>
                      <SelectItem key="text" value="text">
                        text
                      </SelectItem>
                      <SelectItem key="select" value="select">
                        select
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
