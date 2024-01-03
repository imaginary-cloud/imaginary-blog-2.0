import Card from './Card';
import { PostsOrPages } from '@tryghost/content-api';

type GridProps = {
  posts: void | PostsOrPages;
};

export default function Grid({ posts }: GridProps) {
  return (
    <>
      {Array.isArray(posts) && posts.length ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
            {posts.map((post) => (
              <Card key={post.id} data={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-5">No posts available.</div>
      )}
    </>
  );
}
