import { getPostsByTag, getTags } from '@/lib/api';

import Tags from '@/components/Tags';
import Grid from '@/components/Grid';
import Pagination from '@/components/Pagination';
import { PageProps } from '@/common.types';

export default async function Home({ searchParams }: PageProps) {
  const tagParam = searchParams.tag;
  const pageParam = searchParams.page;

  const tags = await getTags();

  const { next, page, pages, posts, prev } = await getPostsByTag({
    tag: tagParam,
    currentPage: Number(pageParam) || undefined,
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center py-10">
      <Tags tags={tags} />
      <Grid posts={posts} />
      <Pagination currentPage={page} pages={pages} next={next} prev={prev} />
    </div>
  );
}
