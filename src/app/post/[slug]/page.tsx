import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import Slider from '@/components/Slider';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getPostsByTag, getSinglePost } from '@/lib/api';
import { lato, merriweather } from '@/lib/fonts';
import { convertDate, convertString } from '@/lib/utils';

// Dynamicly load Markdown component
const Markdown = dynamic(() => import('markdown-to-jsx'), { ssr: false });

export default async function Post({ params }: { params: { slug: string } }) {
  // Fetch the post data based on the slug param
  const data = await getSinglePost(params.slug);

  // If slug data doesn't exist, display an empty state
  if (!data) {
    return <div>This post does not exist :/</div>;
  }

  // Destructure the relevant properties from the post data
  const { title, authors, tags, html, reading_time, updated_at } = data;

  // Construct readingTime string based on reading_time variable
  const readingTime = reading_time ? `${reading_time} min read` : '';

  // Create tags array and retrieve related posts
  const tagsArr = tags?.map(({ name }) => convertString(name!));
  const related = !!tagsArr?.length ? await getPostsByTag({ tag: tagsArr }) : null;

  return (
    <div className="w-full mx-auto">
      <div className="mx-auto py-20 text-black">
        {!!tags?.length && (
          <>
            <span className="text-gray-500 text-xs">FROM: </span>
            {tags?.map(async ({ name }, index) => (
              <span key={index} className="text-primary text-xs">
                {name?.toUpperCase()}
                {index !== tags.length - 1 ? ', ' : ''}
              </span>
            ))}
          </>
        )}

        <h1 className={`${lato.className} text-3xl text-primary font-bold mb-10`}>
          {title}
        </h1>

        {!!authors?.length && (
          <div className="flex items-center w-2/4 mb-4">
            {authors.map(({ name }, index) => (
              <>
                <Avatar>
                  <AvatarImage src="/user.png" />
                </Avatar>
                <div className="flex flex-col justify-start text-gray-400">
                  <span className="ml-5" key={name}>
                    Post written by: {name}
                    {index !== authors.length - 1 ? ', ' : ''}
                  </span>
                  <div className="flex">
                    {updated_at && (
                      <span className="ml-5">
                        {convertDate(updated_at).concat(
                          '. ',
                          readingTime.toString()
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}

        {html && (
          <div
            className={`${merriweather.className} text-[20px] markdown-wrapper mt-10 !leading-8`}
          >
            <Markdown options={{ wrapper: Fragment }}>{html}</Markdown>
          </div>
        )}
      </div>

      {!!related?.posts && (
        <Slider
          title="People who read this post, also found these interesting:"
          posts={related?.posts}
        />
      )}
    </div>
  );
}
