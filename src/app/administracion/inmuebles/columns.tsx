'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PropertyPreview = {
  id: string;
  price: number;
  code: string;
  publicationTitle: string;
  image: string;
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
      const image = cell.row.original.image;
      return <Image src={image} width={50} height={50} className="max-h-[50px]" alt="Imagen de inmueble" />;
    },
  },
  {
    accessorKey: 'publicationTitle',
    header: 'Titulo de publicacion',
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
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const property = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(property.code)}>Copiar codigo</DropdownMenuItem>
            <DropdownMenuSeparator />
             <Link href={`/administracion/inmuebles/${property.id}`}>
               <DropdownMenuItem>Ver detalle</DropdownMenuItem>
             </Link>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
