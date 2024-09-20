'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';
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
import { Client } from '@prisma/client';
import { deleteClient } from '@/actions/client';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  // {
  //   accessorKey: 'email',
  //   header: 'Correo electronico',
  // },
  {
    accessorKey: 'phone',
    header: 'Telefono',
    cell: ({ cell }) => {
      const phoneNumber = cell.row.original.phone;
      return (
        <ul>
          <li className="underline">{phoneNumber}</li>
        </ul>
      );
    },
  },
  // {
  //   accessorKey: 'location',
  //   header: 'Ubicacion',
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original;
      async function handleDeleteClient(id: number) {
        const { success, error } = await deleteClient(id);
        if (success) {
          toast.success('Se elimino el cliente con exito!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error(`Ocurrio un error al intentar eliminar el cliente  ${error}`);
          console.log(error);
        }
      }

      return (
        <div className="flex gap-2">
          <Link href={`/administracion/clientes/${client.id}`}>
            <Pencil size={16} className="text-blue-500" />
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={16} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro de eliminar el propietario ({client.name})?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                  servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteClient(client.id)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
