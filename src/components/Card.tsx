import { PostOrPage } from '@tryghost/content-api';
import Link from 'next/link';

type CardData = {
  data: PostOrPage;
};

export default function Card({ data }: CardData) {
  const { slug, title, excerpt, authors } = data;

  return (
    <Link href={`/post/${slug}`} className="flex-1">
      <div className="flex flex-col bg-white p-4 rounded-md shadow-md min-h-full">
        <h2 className="text-xl text-blue-500 font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{excerpt}</p>
        {authors?.length && (
          <div className="mt-auto">
            {authors.map(({ id, name }) => (
              <p key={id} className="text-gray-400 font-light mt-5">
                Author: {name}
              </p>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
