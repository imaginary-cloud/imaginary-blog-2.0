import { getPostsByTag, getTags } from '@/lib/api';
import Card from '@/components/Card';
import Tags from '@/components/Tags';

export default async function Home(props: PageProps) {
  const searchParam = props.searchParams.tag;
  const posts = await getPostsByTag(searchParam as string | undefined);
  const tags = await getTags();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Tags tags={tags} />
      {Array.isArray(posts) && posts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {posts.map((post) => (
            <Card key={post.id} data={post} />
          ))}
        </div>
      ) : (
        <div className="mt-5">No posts available.</div>
      )}
    </main>
  );
}
