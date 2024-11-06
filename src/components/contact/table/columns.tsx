'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash } from 'lucide-react';

// import { toast } from 'sonner';
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
import { ContactForm } from '@prisma/client';
import { deleteAlly } from '@/actions/ally';
import { formatVenezuelanPhoneNumber } from '@/utils/string';
import {Badge} from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ContactForm>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'phone',
    header: 'Telefono',
    cell: ({ cell }) => {
      const phoneNumber = cell.row.original.phone;
      return (
        <ul>
          <li className="underline">{phoneNumber ? formatVenezuelanPhoneNumber(phoneNumber) : ''}</li>
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
    accessorKey: 'from',
    header: 'Origen',
    cell: ({ cell }) => {
      const from = cell.row.original.from;
      return <Badge variant="secondary">{from}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ally = row.original;
      async function handleDeleteAlly(id: number) {
        const t = toast.loading('Se esta eliminando el aliado', {
          duration: 20000,
        });
        const { success, error } = await deleteAlly(id);
        toast.dismiss(t);
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
          <Eye size={16} className="cursor-pointer" />
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
