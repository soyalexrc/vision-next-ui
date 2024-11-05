'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Download, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import formatCurrency from '@/utils/format-currency';
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
import { deleteProperty } from '@/actions/property';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PropertyPreview = {
  id: string;
  price: number;
  operationType: string;
  propertyType: string;
  code: string;
  publicationTitle: string;
  images: string[];
};

export const columns: ColumnDef<PropertyPreview>[] = [
  {
    accessorKey: 'code',
    header: 'Codigo',
  },
  {
    accessorKey: 'image',
    header: 'Imagen',
    cell: ({ cell }) => {
      const image = cell.row.original.images[0];
      return <Image src={image} width={50} height={50} className="max-h-[50px]" alt="Imagen de inmueble" />;
    },
  },
  {
    accessorKey: 'publicationTitle',
    header: 'Titulo de publicacion',
  },
  {
    accessorKey: 'propertyType',
    header: 'Tipo de propiedad',
  },
  {
    accessorKey: 'operationType',
    header: 'Tipo de operacion',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const price = cell.row.original.price ?? 0;
      return formatCurrency(price.toString());
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const property = row.original;
      async function handleDeleteProperty(id: string, imagesPaths: string[], code: string) {
        const t = toast.loading('Se esta eliminando el inmueble', {
          duration: 20000,
        });
        const { success, error } = await deleteProperty(id, imagesPaths, code);
        if (success) {
          toast.success('Se elimino el inmueble con exito!');
          toast.dismiss(t);
          window.location.reload();
        } else {
          toast.dismiss();
          toast.error(`Ocurrio un error al intentar eliminar el inmueble  ${error}`);
          console.log(error);
        }
      }

      return (
        <div className="flex gap-2">
          <Link href={`/administracion/inmuebles/${property.id}`}>
            <Pencil size={16} className="text-blue-500" />
          </Link>
          <AlertDialog>
            <AlertDialogTrigger>
              <Trash size={16} className="text-destructive" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro de eliminar el inmueble ({property.code})?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                  servidores. Incluidos datos de el inmueble, documentos e imagenes asociadas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteProperty(property.id, property.images, property.code)}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Download size={16} className="cursor-pointer" />
        </div>
      );
    },
  },
];
