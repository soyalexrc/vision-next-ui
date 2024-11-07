'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Download, Pencil, Trash } from 'lucide-react';
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
import { formatVenezuelanPhoneNumber } from '@/utils/string';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Client>[] = [
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
          <li className="underline">{formatVenezuelanPhoneNumber(phoneNumber)}</li>
        </ul>
      );
    },
  },
  {
    accessorKey: 'serviceName',
    header: 'Servicio',
  },
  {
    accessorKey: 'subServiceName',
    header: 'Operacion',
  },
  {
    accessorKey: 'contactFrom',
    header: 'De donde nos contacta?',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original;
      async function handleDeleteClient(id: number) {
        const t = toast.loading('Se esta eliminando el cliente', {
          duration: 20000,
        });
        const { success, error } = await deleteClient(id);
        toast.dismiss(t);
        if (success) {
          toast.success('Se elimino el cliente con exito!');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          toast.error(`Ocurrio un error al intentar eliminar el cliente  ${error}`);
          toast.dismiss();
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
          <Download size={16} className="cursor-pointer" />
        </div>
      );
    },
  },
];
