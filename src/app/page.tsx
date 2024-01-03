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
    <main className="flex min-h-screen max-w-[1140px] mx-auto flex-col items-center py-10">
      <Tags tags={tags} />
      <Grid posts={posts} />
      <Pagination
        currentPage={page}
        pages={pages}
        next={next}
        prev={prev}
        posts={posts}
      />
    </main>
  );
}
