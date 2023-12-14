'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Tags } from '@tryghost/content-api';
import clsx from 'clsx';

type TagsProps = {
  tags: Tags;
  //! handleSelectedTag?: (name: string) => void;
};

export default function Tags({ tags }: TagsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const tagParam = useSearchParams().get('tag');

  // Add URL parameters and keep the user on the same page
  const handleSelectedTag = useCallback(
    (name?: string) =>
      !name ? router.push(pathname) : router.push(`${pathname}?tag=${name}`),
    [router, pathname]
  );

  return (
    <div className="flex items-center justify-center">
      <span
        className={clsx(
          'cursor-pointer mx-5 text-black transition-colors hover:text-blue-500',
          { 'text-blue-500': !tagParam }
        )}
        onClick={() => handleSelectedTag()}
      >
        All
      </span>
      {tags.map(({ name }, index) => (
        <span
          key={index}
          className={clsx(
            'cursor-pointer mx-5 text-black transition-colors hover:text-blue-500',
            { 'text-blue-500': name === tagParam }
          )}
          onClick={() => handleSelectedTag(name as string)}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
