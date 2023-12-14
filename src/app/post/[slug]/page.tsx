import Markdown from 'markdown-to-jsx';
import { getSinglePost } from '@/utils/api';

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
    <div className="mx-96 text-black">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <Markdown>{html as string}</Markdown>

      {authors?.length && (
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

      {tags?.length && (
        <>
          <strong>Tags: </strong>
          {tags.map(({ name }, index) => (
            <span key={index}>
              {name}
              {index !== tags.length - 1 ? ', ' : ''}
            </span>
          ))}
        </>
      )}
    </div>
  );
}
