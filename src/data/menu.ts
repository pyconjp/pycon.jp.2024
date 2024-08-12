// TODO typeをtypesディレクトリに移動する
type ChildMenu = {
  title: string;
  url: string;
  isComingSoon: boolean;
};

export type Menu = {
  title: string;
  children: ChildMenu[];
};

export const menu: Menu[] = [
  {
    title: "about",
    children: [
      {title: "coc", url: "/coc", isComingSoon: false},
      {title: "venue", url: "/venue", isComingSoon: true},
    ],
  },
  {
    title: "events",
    children: [
      {title: "timetable", url: "/timetable", isComingSoon: true},
      {title: "sprint", url: "/sprint", isComingSoon: true},
    ],
  },
  {
    title: "sponsor",
    children: [
      {title: "sponsor_list", url: "/sponsors", isComingSoon: false},
    ],
  },
  {
    title: "organizer",
    children: [
      {title: "organizer_list", url: "/organizers", isComingSoon: false},
    ],
  },
];

export default menu;
