'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CircleCheck, CircleX, Download, Pencil, Trash } from 'lucide-react';
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
import { deleteClient, updateStatusClient } from '@/actions/client';
import Link from 'next/link';
import { formatVenezuelanPhoneNumber } from '@/utils/string';
import formatCurrency from '@/utils/format-currency';
import { useQueryClient } from '@tanstack/react-query';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const statusOptions = ['Activo', 'Inactivo', 'Concretado'];

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: 'adviser_name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          Asesor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const adviser = cell.row.original.adviser_name;
      return <div className="min-w-[150px]">{adviser}</div>;
    },
  },
  {
    accessorKey: 'serviceName',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          Servicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'propertytype',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          Tipo de inmueble
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'propertyOfInterest',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          Inmueble por el cual nos contacta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const propertyOfInterest = cell.row.original.propertyOfInterest;
      return <div className="min-w-[130px]">{propertyOfInterest}</div>;
    },
  },
  {
    accessorKey: 'contactFrom',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          De donde nos contacta?
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const contactFrom = cell.row.original.contactFrom;
      return <div className="min-w-[170px]">{contactFrom}</div>;
    },
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
    accessorKey: 'requestracking',
    header: 'Seguimiento',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="min-w-[130px]">
          Estatus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const client = cell.row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient(); // Access the query client

      async function handleActivateDeactivateClient(id: number, newStatus: string) {
        const t = toast.loading(`Se esta actualizando el estatus de el cliente`, {
          duration: 20000,
        });
        const { success, error } = await updateStatusClient(id, newStatus);
        if (success) {
          toast.success(`Se actualizo el estatus de el cliente con exito!`);
          toast.dismiss(t);
          await queryClient.invalidateQueries({ queryKey: ['clients'] });
          // window.location.reload();
        } else {
          toast.dismiss();
          toast.error(`Ocurrio un error al intentar actualizar el estatus de el cliente  ${error}`);
          console.log(error);
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={`text-center rounded-lg cursor-pointer p-2 w-[70px] ${
                client.status === 'Activo'
                  ? 'text-green-500 font-bold bg-green-100'
                  : client.status === 'Inactivo'
                    ? 'text-red-500 font-bold bg-red-100'
                    : ''
              }`}
            >
              {client.status}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statusOptions.map((option) => (
              <DropdownMenuItem onClick={() => handleActivateDeactivateClient(client.id, option)} key={option}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'isinwaitinglist',
    header: 'Lista de espera',
    cell: ({ cell }) => {
      const client = cell.row.original;

      return (
        <div className="w-[110px] flex justify-center">
          {client.isinwaitinglist ? <CircleCheck className="text-green-500" /> : <CircleX className="text-red-500" />}
        </div>
      );
    },
  },
  {
    accessorKey: 'isPotentialInvestor',
    header: 'Potencial inversor',
    cell: ({ cell }) => {
      const client = cell.row.original;

      return (
        <div className="w-[120px] flex justify-center">
          {client.isPotentialInvestor ? <CircleCheck className="text-green-500" /> : <CircleX className="text-red-500" />}
        </div>
      );
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
    accessorKey: 'typeOfPerson',
    header: 'Perfil de cliente',
    cell: ({ cell }) => {
      const typeOfPerson = cell.row.original.typeOfPerson;
      return <div className="min-w-[130px]">{typeOfPerson}</div>;
    },
  },
  {
    accessorKey: 'allowyounger',
    header: 'Menores de edad',
    cell: ({ cell }) => {
      const allowyounger = cell.row.original.allowyounger;
      const amountOfYounger = cell.row.original.amountOfYounger;
      return (
        <div className="min-w-[120px]">
          {allowyounger} {allowyounger === 'Si' && `- ${amountOfYounger}`}
        </div>
      );
    },
  },
  {
    accessorKey: 'allowpets',
    header: 'Mascotas',
    cell: ({ cell }) => {
      const allowpets = cell.row.original.allowpets;
      const amountOfPets = cell.row.original.amountOfPets;
      return (
        <div className="min-w-[120px]">
          {allowpets} {allowpets === 'Si' && `- ${amountOfPets}`}
        </div>
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
