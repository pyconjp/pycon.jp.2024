export type Menu = {
  title: string;
  children: ChildMenu[];
};

type ChildMenu = {
  title: string;
  url: string;
  isComingSoon: boolean;
  isExternal?: boolean;
};
