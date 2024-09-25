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
import { ExternalAdviser } from '@prisma/client';
import ExternalAdviserForm from '@/components/externalAdvisers/ExternalAdviserForm';
import { deleteExternalAdviser } from '@/actions/external-adviser';
import { formatVenezuelanPhoneNumber } from '@/utils/string';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ExternalAdviser>[] = [
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
  {
    accessorKey: 'realStateCompanyName',
    header: 'Nombre de inmobiliaria',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const adviser = row.original;

      async function handleDeleteAlly(id: number) {
        const { success, error } = await deleteExternalAdviser(id);
        if (success) {
          toast.success('Se elimino el asesor externo con exito!');
          window.location.reload();
        } else {
          toast.error(`Ocurrio un error al intentar eliminar el asesor externo: ${error}`);
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
                <ExternalAdviserForm data={adviser} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={16} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro de eliminar el asesor externo ({adviser.name})?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                  servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteAlly(adviser.id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
