type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

type requestProps = {
  tag?: string | (string | undefined)[];
  currentPage?: number;
};

type Sublink = {
  title: string;
  url: string;
  parent?: string;
};
