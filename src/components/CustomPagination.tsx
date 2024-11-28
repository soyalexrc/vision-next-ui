'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const CustomPagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(window.location.search);
    params.set('pagina', page.toString());
    router.push(`/inmuebles?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationItem className="cursor-pointer" key={i} onClick={() => handlePageChange(i)}>
          <PaginationLink isActive>{i}</PaginationLink>
        </PaginationItem>,
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
          {renderPageNumbers()}
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationContent>
      </Pagination>
      {/*<div className="flex justify-center mt-4">*/}
      {/*  <button disabled={currentPage === 1} className="px-3 py-1 border bg-white text-black">*/}
      {/*    Previous*/}
      {/*  </button>*/}
      {/*  {renderPageNumbers()}*/}
      {/*  <button*/}
      {/*    onClick={() => handlePageChange(currentPage + 1)}*/}
      {/*    disabled={currentPage === totalPages}*/}
      {/*    className="px-3 py-1 border bg-white text-black"*/}
      {/*  >*/}
      {/*    Next*/}
      {/*  </button>*/}
      {/*</div>*/}
    </>
  );
};

export default CustomPagination;
