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
  const { slug, title, excerpt, authors, feature_image } = data;

  return (
    <Link href={`/post/${slug}`} className="flex-1">
      <Cardx className="flex flex-col min-h-full">
        <CardHeader>
          {feature_image && (
            <CardDescription>
              <Image
                src={feature_image}
                alt={`img-${slug}`}
                width={300}
                height={300}
              />
            </CardDescription>
          )}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        {excerpt && <CardContent>{truncateString(excerpt)}</CardContent>}
        <CardFooter className="mt-auto">
          {authors?.length && (
            <div className="mt-auto">
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
