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
import { activateDeactivateClient, deleteClient } from '@/actions/client';
import Link from 'next/link';
import { formatVenezuelanPhoneNumber } from '@/utils/string';
import formatCurrency from '@/utils/format-currency';
import { useQueryClient } from '@tanstack/react-query';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ cell }) => {
      const name = cell.row.original.name;
      return <div className="min-w-[130px]">{name}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Telefono',
    cell: ({ cell }) => {
      const phoneNumber = cell.row.original.phone;
      return (
        <ul className="min-w-[120px]">
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
    accessorKey: 'propertytype',
    header: 'Tipo de inmueble',
  },
  {
    accessorKey: 'requestracking',
    header: 'Solicitud de seguimiento',
  },
  {
    accessorKey: 'specificRequirement',
    header: 'Detalle de la solicitud',
    cell: ({ cell }) => {
      const specificRequirement = cell.row.original.specificRequirement;
      return <div className="min-w-[160px]">{specificRequirement}</div>;
    },
  },
  {
    accessorKey: 'typeOfPerson',
    header: 'Perfil de cliente',
    cell: ({ cell }) => {
      const typeOfPerson = cell.row.original.typeOfPerson;
      return <div className="min-w-[130px]">{typeOfPerson}</div>;
    },
  },
  {
    accessorKey: 'budget',
    header: 'Presupuesto',
    cell: ({ cell }) => {
      const budgetFrom = cell.row.original.budgetfrom;
      const budgetTo = cell.row.original.budgetto;
      return <div className="min-w-[150px]">{`${formatCurrency(String(budgetFrom))} - ${formatCurrency(String(budgetTo))}`}</div>;
    },
  },
  {
    accessorKey: 'contactFrom',
    header: 'De donde nos contacta?',
    cell: ({ cell }) => {
      const contactFrom = cell.row.original.contactFrom;
      return <div className="min-w-[170px]">{contactFrom}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Estatus',
    cell: ({ cell }) => {
      const client = cell.row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient(); // Access the query client

      async function handleActivateDeactivateClient(id: number, current: boolean) {
        const t = toast.loading(`Se esta ${current ? 'Desactivando' : 'Activando'} el cliente`, {
          duration: 20000,
        });
        const { success, error } = await activateDeactivateClient(id, current);
        if (success) {
          toast.success(`Se ${current ? 'Desactivo' : 'Activo'} el cliente con exito!`);
          toast.dismiss(t);
          await queryClient.invalidateQueries({ queryKey: ['clients'] });
          // window.location.reload();
        } else {
          toast.dismiss();
          toast.error(`Ocurrio un error al intentar ${current ? 'Desactivar' : 'Activar'} el inmueble  ${error}`);
          console.log(error);
        }
      }

      return (
        <AlertDialog>
          <AlertDialogTrigger>
            <div
              className={`text-center rounded-lg cursor-pointer p-2 w-[70px] ${
                client.status ? 'text-green-500 font-bold bg-green-100' : 'text-red-500 font-bold bg-red-100'
              }`}
            >
              {client.status ? 'Activo' : 'Inactivo'}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {client.status ? 'Desactivar' : 'Activar'} cliente ({client.name})?
              </AlertDialogTitle>
              <AlertDialogDescription>
                {client.status ? 'Esta seguro de desactivar el cliente?' : 'Esta seguro de activar el cliente?'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleActivateDeactivateClient(client.id, client.status!)}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient();

      async function handleDeleteClient(id: number) {
        const t = toast.loading('Se esta eliminando el cliente', {
          duration: 20000,
        });
        const { success, error } = await deleteClient(id);
        toast.dismiss(t);
        if (success) {
          toast.success('Se elimino el cliente con exito!');
          await queryClient.invalidateQueries({ queryKey: ['clients'] });
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
                <AlertDialogTitle>Esta seguro de eliminar el cliente ({client.name})?</AlertDialogTitle>
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
