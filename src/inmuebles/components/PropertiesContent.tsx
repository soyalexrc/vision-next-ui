'use client';

import { LOCATIONS, LOCATIONS_DETAIL } from '@/utils/data/locations';
import { PROPERTY_TYPES } from '@/utils/data/property-types';
import { PropertyCardWithCarousel } from '@/components/PropertyCard';
import formatPropertyTitle from '@/utils/format-property-title';
import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Filter, LayoutGrid, List } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';


interface Props {
  properties: any;
  total: any;
}

export function PropertiesContent({ properties }: Props) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const [currentPage, setCurrentPage] = useState<string>('1');
  // const [pageLimit, setPageLimit] = useState<string>('10');


  // useEffect(() => {
  //   setCurrentPage(searchParams?.get('pagina') ?? '1');
  //   setPageLimit(searchParams?.get('limite') ?? '10');
  //   setState(searchParams?.get('estado') ?? '');
  //   setMunicipality(searchParams?.get('municipalidad') ?? '');
  //   setPropertyType(searchParams?.get('tipo_de_inmueble') ?? '');
  //   setOperationType(searchParams?.get('tipo_de_operacion') ?? '');
  // }, [searchParams]);

  return (
      <div>



      </div>
  );
}

