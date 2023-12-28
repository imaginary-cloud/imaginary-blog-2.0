import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { getPostsByTag, getSinglePost } from '@/lib/api';
import { lato, merriweather } from '@/lib/fonts';

import Slider from '@/components/Slider';

// Dynamicly load Markdown component
const Markdown = dynamic(() => import('markdown-to-jsx'), { ssr: false });

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
    <div className="w-[80%] mx-auto">
      <div className="w-[50%] mx-auto py-20 text-black">
        <h1 className={`${lato.className} text-3xl text-primary font-bold`}>
          {title}
        </h1>
        {html && (
          <div
            className={`${merriweather.className} text-[20px] markdown-wrapper mt-10 !leading-8`}
          >
            <Markdown options={{ wrapper: Fragment }}>{html}</Markdown>
          </div>
        )}

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
              <span key={index}>
                {name}
                {index !== tags.length - 1 ? ', ' : ''}
              </span>
            ))}
          </>
        )}
      </div>
      {!!tags?.length && (
        <>
          {tags?.map(async ({ name }, index) => (
            <Slider
              key={index}
              title="People who read this post, also found these interesting:"
              posts={await getPostsByTag(name)}
            />
          ))}
        </>
      )}
    </div>
  );
}
