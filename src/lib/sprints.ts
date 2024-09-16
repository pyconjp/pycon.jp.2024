import {Sprint} from "@/types/Sprint";

export const getSprints: () => Promise<Sprint[]> = async () => import('@/cache/sprints.json')
  .then((module) => module.default as Sprint[])
  .catch(() => []);