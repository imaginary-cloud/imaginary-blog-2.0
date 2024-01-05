export type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export type requestProps = {
  tag?: string | (string | undefined)[];
  currentPage?: number;
};

export type Menu = {
  title: string;
  url?: string;
  isBtn?: boolean;
  sublinks?: Sublink[];
};

export type Sublink = {
  title: string;
  url: string;
  parent?: string;
};
