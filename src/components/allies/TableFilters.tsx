'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AllyForm from '@/components/allies/AllyForm';

export function TableFilters() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row mb-4 gap-4">
      {/*<Input*/}
      {/*  placeholder="Buscar por nombre, correo o numero de telefono"*/}
      {/*  value={query}*/}
      {/*  onChange={({ target: { value } }) => setQuery(value)}*/}
      {/*  className="w-full md:max-w-sm"*/}
      {/*/>*/}
      {/*<Button onClick={search}>Buscar</Button>*/}
      <span className="mx-auto h-[30px] md:h-auto"></span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="outline" className="flex gap-2">
            <Plus />
            Nuevo aliado
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Nuevo aliado</DialogTitle>
            <AllyForm isForm={true} data={{} as any} onCloseModal={() => setOpen(false)} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
