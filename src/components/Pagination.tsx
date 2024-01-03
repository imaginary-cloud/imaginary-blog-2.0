'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Nullable, PostsOrPages } from '@tryghost/content-api';
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
  posts: void | PostsOrPages;
};

export default function Pagination({
  currentPage,
  next,
  prev,
  pages,
  posts,
}: PaginationProps) {
  // Handle hydration error
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create an array with numbers from 1 to length
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (page: number) => page && router.push(`${pathname}?page=${page}`),
    [pathname, router]
  );

  const handlePrev = useCallback(() => {
    prev && router.push(`${pathname}?page=${prev}`);
  }, [pathname, prev, router]);

  const handleNext = useCallback(() => {
    next && router.push(`${pathname}?page=${next}`);
  }, [next, pathname, router]);

  return (
    <>
      {isClient && posts?.length! > 3 && (
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
