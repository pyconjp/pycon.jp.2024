// TODO typeをtypesディレクトリに移動する
type ChildMenu = {
  title: string;
  url: string;
  isComingSoon: boolean;
  isExternal?: boolean;
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
      {title: "venue", url: "/venue", isComingSoon: false},
    ],
  },
  {
    title: "events",
    children: [
      {title: "timetable", url: "/timetable", isComingSoon: false},
      {title: "sprint", url: "/sprint", isComingSoon: false},
      {title: "posters", url: "/posters", isComingSoon: false},
    ],
  },
  {
    title: "sponsor",
    children: [
      {title: "sponsor_list", url: "/sponsors", isComingSoon: false},
      {title: "job_board", url: "/job-board", isComingSoon: false},
    ],
  },
  {
    title: "organizer",
    children: [
      {title: "organizer_list", url: "/organizers", isComingSoon: false},
      {title: "special_thanks", url: "/special-thanks", isComingSoon: false},
    ],
  },
];

export default menu;
