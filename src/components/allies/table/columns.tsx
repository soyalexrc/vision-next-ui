'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

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
import { Ally } from '@prisma/client';
import AllyForm from '@/components/allies/AllyForm';
import { deleteAlly } from '@/actions/ally';
import { formatVenezuelanPhoneNumber } from '@/utils/string';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Ally>[] = [
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
          <li className="underline">{formatVenezuelanPhoneNumber(phoneNumber)}</li>
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
  // {
  //   accessorKey: 'birthdate',
  //   header: 'Fecha de nacimiento',
  //   cell: ({ cell }) => {
  //     const birthdate = cell.row.original.birthdate ? new Date(cell.row.original.birthdate) : null;
  //     if (birthdate) {
  //       return <p>{birthdate.toLocaleString('es-VE', { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>;
  //     } else {
  //       return <p>-</p>;
  //     }
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ally = row.original;
      async function handleDeleteAlly(id: number) {
        const { success, error } = await deleteAlly(id);
        if (success) {
          toast.success('Se elimino el aliado con exito!');
          window.location.reload();
        } else {
          toast.error(`Ocurrio un error al intentar eliminar el aliado: ${error}`);
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
                <AllyForm data={ally} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={16} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro de eliminar el aliado ({ally.name})?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                  servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteAlly(ally.id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
