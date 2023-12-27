import dynamic from 'next/dynamic';
import { getPostsByTag, getSinglePost } from '@/lib/api';

const MarkdownNoSSR = dynamic(() => import('markdown-to-jsx'), { ssr: false });

import '@/app/globals.css';
import Slider from '@/components/Slider';

export default async function Post({ params }: { params: { slug: string } }) {
  // Fetch the post data based on the slug param
  const data = await getSinglePost(params.slug);

  // Check if data exists, if not, display a loading or error message
  if (!data) {
    return <div>This post does not exist :/</div>;
  }

  // Destructure the relevant properties from the post data
  const { title, authors, tags, html } = data;

  return (
    <div className="w-3/4 mx-auto my-5 text-black">
      <h1 className="text-3xl font-bold">{title}</h1>
      {html && <MarkdownNoSSR>{html as string}</MarkdownNoSSR>}

      {!!authors?.length && (
        <div className="mb-4">
          <strong>Authors: </strong>
          {authors.map(({ name }, index) => (
            <span key={name}>
              {name}
              {index !== authors.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}

      {!!tags?.length && (
        <>
          <strong>Tags: </strong>
          {tags?.map(async ({ name }, index) => (
            <>
              <span key={index}>
                {name}
                {index !== tags.length - 1 ? ', ' : ''}
              </span>
              <Slider title="Related Posts" posts={await getPostsByTag(name)} />
            </>
          ))}
        </>
      )}
    </div>
  );
}
