'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CircleCheck, CircleX, Pencil, Trash } from 'lucide-react';

// import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
import { toast } from 'sonner';
import { Owner } from '@prisma/client';
import OwnerForm from '@/components/owners/OwnerForm';
import { deleteOwner } from '@/actions/owner';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Owner>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'lastname',
    header: 'Apellido',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Telefono',
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
    accessorKey: 'email',
    header: 'email',
    cell: ({ cell }) => {
      const email = cell.row.original.email;
      return (
        <ul>
          <li className="underline">{email}</li>
        </ul>
      );
    },
  },
  {
    accessorKey: 'isInvestor',
    header: 'Inversionista',
    cell: ({ cell }) => {
      const isInvestor = cell.row.original.isInvestor;
      return isInvestor ? <CircleCheck color="green" size={20} /> : <CircleX color="red" size={20} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const owner = row.original;
      async function handleDeleteOwner(id: number) {
        const { success, error } = await deleteOwner(id);
        if (success) {
          toast.success('Se elimino el propietario con exito!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error(`Ocurrio un error al intentar eliminar el:propietario  ${error}`);
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
                <DialogTitle className="text-center text-2xl">Editar aliado</DialogTitle>
                <OwnerForm data={owner} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={16} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro de eliminar el propietario ({owner.name})?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                  servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteOwner(owner.id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
