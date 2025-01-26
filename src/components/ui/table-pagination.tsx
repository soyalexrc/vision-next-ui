import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalPages: any;
}

export function DataTablePagination<TData>({ table, totalPages }: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const query = Object.fromEntries(params.entries());
    console.log(query);
    if (query.cantidad) {
      table.setPageSize(Number(query.cantidad));
    }
  }, [params, table]);

  console.log(table.getPageCount());
  console.log(table.getState())

  const onNextPage = () => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = table.getState().pagination.pageIndex + 1;
    params.set('pagina', String(currentPage + 1));
    table.nextPage();
    router.push(`/inmuebles?${params.toString()}`);
  };

  const handlePageSizeChange = (size: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('cantidad', size);
    router.push(`/administracion/inmuebles?${params.toString()}`);
    table.setPageSize(Number(size));

  };

  return (
    <div className="flex items-center justify-between p-4 mt-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {/*{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} Filas(s) seleccionadas.*/}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">filas por pagina</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          Pagina {table.getState().pagination.pageIndex + 1} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={onNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
