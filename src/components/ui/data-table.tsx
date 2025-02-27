'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye } from 'lucide-react';
import { DataTablePagination } from '@/components/ui/table-pagination';
import { useWindowSize } from '@/lib/hooks';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const width = useWindowSize().width;

  const calculateWidth = () => {
    if (width >= 1024) {
      return width - 310;
    } else if (width >= 768 && width < 1024) {
      return width - 255;
    } else {
      return width - 40;
    }
  };

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex justify-end mb-4 gap-2">
        {/*<Button variant="outline" disabled={table.getRowModel().rows.length < 1} onClick={() => {}}>*/}
        <Button variant="outline" disabled onClick={() => {}}>
          <Image alt="icono de excel" width={30} height={30} src="/icons/excel-icon.webp" />
          Exportar Excel
        </Button>
        {/*<Button variant="outline" className="flex gap-2" disabled={table.getRowModel().rows.length < 1 || pdfLoading} onClick={() => {}}>*/}
        <Button variant="outline" className="flex gap-2" disabled onClick={() => {}}>
          {/*{*/}
          {/*  pdfLoading &&*/}
          {/*  <div*/}
          {/*    className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"*/}
          {/*    role="status" />*/}
          {/*}*/}
          {/*{*/}
          {/*  !pdfLoading &&*/}
          <Image alt="icono de excel" width={30} height={30} src="/icons/pdf-icon.png" />
          {/*}*/}
          {/*{pdfLoading ? 'Exportando...' : 'Exportar PDF'}*/}
          Exportar PDF
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Columnas
              <Eye />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className={`rounded-md border`} style={{ maxWidth: `${calculateWidth()}px` }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
