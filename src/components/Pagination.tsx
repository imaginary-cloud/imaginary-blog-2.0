'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Nullable } from '@tryghost/content-api';
import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
  currentPage: number;
  next?: Nullable<number>;
  prev?: Nullable<number>;
  pages: number;
};

export default function Pagination({
  currentPage,
  next,
  prev,
  pages,
}: PaginationProps) {
  // Handle hydration error - https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create an array with numbers from 1 to length
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Change URL's page param.
  const changePage = useCallback(
    (page: Nullable<number> | undefined) => {
      // Create a new instance of URLSearchParams based on the existing searchParams.
      const params = new URLSearchParams(searchParams);
      // Set page param to the new page number (converted to string).
      params.set('page', page!.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const handleClick = useCallback((page: number) => changePage(page), [changePage]);
  const handlePrev = useCallback(() => changePage(prev), [changePage, prev]);
  const handleNext = useCallback(() => changePage(next), [changePage, next]);

  return (
    <>
      {isClient && (prev || next) && (
        <PaginationWrapper className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePrev()} />
            </PaginationItem>
            {pageNumbers.map((page) => (
              <PaginationItem
                onClick={() => handleClick(page)}
                key={page}
                className={currentPage === page ? 'bg-neutral-100 rounded-md' : ''}
              >
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handleNext()} />
            </PaginationItem>
          </PaginationContent>
        </PaginationWrapper>
      )}
    </>
  );
}
