import { getPostsByTag, getTags } from '@/lib/api';

import Tags from '@/components/Tags';
import Grid from '@/components/Grid';
import Pagination from '@/components/Pagination';

export default async function Home({ searchParams }: PageProps) {
  const tagParam = searchParams.tag;
  const pageParam = searchParams.page;

  const tags = await getTags();

  const { next, page, pages, posts, prev } = await getPostsByTag({
    tag: tagParam,
    currentPage: Number(pageParam) || undefined,
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-32">
      <Tags tags={tags} />
      <Grid posts={posts} />
      <Pagination currentPage={page} pages={pages} next={next} prev={prev} />
    </main>
  );
}
