import {Menu} from "@/types/Menu";

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
      {title: "timetable", url: "/timetable", isComingSoon: false},
      {title: "sprint", url: "/sprint", isComingSoon: false, isExternal: true},
      {title: "posters", url: "/posters", isComingSoon: false},
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
