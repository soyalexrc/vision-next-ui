'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

import Image from 'next/image';
// import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { ShortUser } from '@/lib/interfaces/User';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import UserForm from '@/components/users/UserForm';
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
import { deleteUser } from '@/actions/user';
import { toast } from 'sonner';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ShortUser>[] = [
  {
    accessorKey: 'user',
    header: 'Nombre / Correo',
    cell: ({ cell }) => {
      const image = cell.row.original.imageUrl;
      const firstName = cell.row.original.firstName;
      const lastName = cell.row.original.lastName;
      const email = cell.row.original.email;

      return (
        <div className="flex items-center gap-2">
          <Image src={image} width={40} height={40} className="max-h-[50px] rounded-full" alt="Imagen de inmueble" />
          <div>
            <p className="font-bold">
              {firstName} {lastName}
            </p>
            <p>{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: 'Usuario',
  },
  {
    accessorKey: 'phone',
    header: 'Telefono/s',
    cell: ({ cell }) => {
      const phoneNumber = cell.row.original.phoneNumber;
      return (
        <ul>
          <li className="underline">{phoneNumber}</li>
        </ul>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ cell }) => {
      return (
        <Badge className="min-w-[150px] flex justify-center" variant="secondary">
          {cell.row.original.role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'lastSignInAt',
    header: 'Ultimo ingreso',
    cell: ({ cell }) => {
      const lastSignedInAt = cell.row.original.lastSignInAt ? new Date(cell.row.original.lastSignInAt) : null;
      if (lastSignedInAt) {
        return <p>{lastSignedInAt.toLocaleString('es-VE', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>;
      } else {
        return <p>-</p>;
      }
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de creacion',
    cell: ({ cell }) => {
      const createdAt = new Date(cell.row.original.createdAt);
      return <p>{createdAt.toLocaleString('es-VE', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      async function handleDeleteUser(id: string) {
        const { success, error } = await deleteUser(id);
        if (success) {
          toast.success('Se elimino el usuario con exito!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error(`Ocurrio un error al intentar eliminar el usuario: ${error}`);
          console.log(error);
        }
      }

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger>
              <Pencil size={16} className="text-blue-500" />
            </DialogTrigger>
            <DialogContent className="overflow-y-auto max-h-screen">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">Editar Usuario</DialogTitle>
                <UserForm data={user} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={16} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro de eliminar el usuario ({user.username})?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                  servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
