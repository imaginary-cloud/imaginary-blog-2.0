import Image from 'next/image';
import Link from 'next/link';
import { PostOrPage } from '@tryghost/content-api';

import {
  Card as Cardx,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { truncateString } from '@/lib/utils';

type CardData = {
  data: PostOrPage;
};

export default function Card({ data }: CardData) {
  const { slug, title, excerpt, authors, feature_image, tags } = data;

  const tagsName = tags?.map(({ name }) => name).join(', '); // comma seperated array

  return (
    <Link href={`/post/${slug}`} className="flex-1">
      <Cardx className="flex flex-col min-h-full">
        <CardHeader className="p-0">
          {feature_image && (
            <CardDescription className="relative w-full h-[200px]">
              <Image
                style={{ objectFit: 'cover' }}
                src={feature_image}
                alt={`img-${slug}`}
                fill
              />
            </CardDescription>
          )}
          <CardTitle className="p-5">{title}</CardTitle>
          {tags && tags.length > 0 && (
            <span className="px-5 text-blue-400">FROM: {tagsName}</span>
          )}
        </CardHeader>
        {excerpt && (
          <CardContent className="px-5">{truncateString(excerpt)}</CardContent>
        )}
        <CardFooter className="mt-auto">
          {authors?.length && (
            <div>
              {authors.map(({ id, name }) => (
                <span key={id} className="text-gray-400 font-light mt-5">
                  Author: {name}
                </span>
              ))}
            </div>
          )}
        </CardFooter>
      </Cardx>
    </Link>
  );
}
