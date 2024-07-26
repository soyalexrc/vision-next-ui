'use client';
import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, LayoutGrid, List } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FiltersConfig } from '@/components/property/FiltersConfig';
import { useUiConfig } from '@/lib/context/UiConfigContext';

const animals = [{ label: 'sample', value: 2 }];

export function Toolbar() {
  const { viewStyle, setViewStyle } = useUiConfig();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex justify-between items-center px-4 mb-4">
      <div>
        <p className="font-bold text-sm mb-1">Ordenar por</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ordenar por</SelectLabel>
              {animals.map((animal) => (
                <SelectItem value={animal.value.toString()} key={animal.value}>
                  {animal.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="lg:hidden">
        <Button variant="ghost" onClick={() => setShowFilters(true)} className="bg-red-900" aria-label="Like">
          <Filter height={25} width={25} className="text-white" />
        </Button>
      </div>
      <div className="gap-4 hidden lg:flex">
        <Button
          onClick={() => setViewStyle('grid')}
          variant="ghost"
          className={`hover:bg-red-900 ${viewStyle === 'grid' ? 'bg-red-900' : 'bg-gray-200'}`}
          aria-label="Like"
        >
          <LayoutGrid height={30} width={30} className={`hover:text-white ${viewStyle === 'grid' ? 'text-white' : 'text-gray-600'}`} />
        </Button>
        <Button
          onClick={() => setViewStyle('list')}
          variant="ghost"
          className={`hover:bg-red-900 ${viewStyle === 'list' ? 'bg-red-900' : 'bg-gray-200'}`}
          aria-label="Like"
        >
          <List height={30} width={30} className={`hover:text-white ${viewStyle === 'list' ? 'text-white' : 'text-gray-600'}`} />
        </Button>
      </div>
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="h-[600px]">
          <ScrollArea className="h-full">
            <SheetHeader>
              <SheetTitle className="my-2">Filtros de busqueda</SheetTitle>
              <div className="px-2">
                <FiltersConfig />
              </div>
            </SheetHeader>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
