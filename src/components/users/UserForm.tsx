'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ShortUser, UserFormSchema } from '@/lib/interfaces/User';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createUser, updateUser } from '@/actions/user';
import { useState } from 'react';

type Props = {
  data: ShortUser;
  onCloseModal?: () => void;
  isForm?: boolean;
};

export default function UserForm({ data, onCloseModal, isForm }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      username: data.username ?? '',
      phoneNumber: data.phoneNumber ?? '',
      email: data.email ?? '',
      role: data.role ?? '',
      password: '',
      id: data.id ?? '',
    },
  });

  async function onSubmit(values: z.infer<typeof UserFormSchema>) {
    setLoading(true);
    if (values.id) {
      const { success, error } = await updateUser(values);
      setLoading(false);
      if (success) {
        toast.success('Se actualizo el usuario con exito!');
        router.refresh();
        onCloseModal ? onCloseModal() : null;
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el usuario: ${error}`);
        console.log(error);
      }
    } else {
      const { success, error } = await createUser(values);
      setLoading(false);
      if (success) {
        toast.success('Se registro el usuario con exito!');
        router.refresh();
        router.refresh();
        onCloseModal ? onCloseModal() : null;
      } else {
        toast.error(`Ocurrio un error al intentar registrar el usuario: ${error}`);
        console.log(error);
      }
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'firstName':
        return 'Nombre';
      case 'lastName':
        return 'Apellido';
      case 'email':
        return 'Correo electronico';
      case 'username':
        return 'Nombre de usuario';
      case 'role':
        return 'Rol de usuario';
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
              name="firstName"
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
              name="lastName"
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
                    <Input disabled={!!data.id} {...field} />
                  </FormControl>
                  <FormDescription>Este es el correo electronico de acceso.</FormDescription>
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
              name="username"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Contrasena</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Este campo es opcional (Los usuarios pueden configurar su propia contrasena al iniciar sesion)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Rol de usuario</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ? field.value.toString() : ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una opcion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="Administrador" value="Administrador">
                        Administrador
                      </SelectItem>
                      <SelectItem key="Asesor inmobiliario vision" value="Asesor inmobiliario vision">
                        Asesor inmobiliario vision
                      </SelectItem>
                      <SelectItem key="Asesor inmobiliario" value="Asesor inmobiliario">
                        Asesor inmobiliario
                      </SelectItem>
                      <SelectItem key="Coordinador de servicios" value="Coordinador de servicios">
                        Coordinador de servicios
                      </SelectItem>
                      <SelectItem key="Administrador de empresa" value="Administrador de empresa">
                        Administrador de empresa
                      </SelectItem>
                      <SelectItem key="Asistente operativo" value="Asistente operativo">
                        Asistente operativo
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
            {isForm && (
              <Button disabled={form.formState.isSubmitting} type="submit" className="w-full lg:w-auto bg-red-900">
                {form.formState.isSubmitting && (
                  <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
                )}
                {form.formState.isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
              </Button>
            )}

            {!isForm && (
              <Button disabled={loading} type="button" onClick={() => onSubmit(form.getValues())} className="w-full lg:w-auto bg-red-900">
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
