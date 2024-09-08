import {Poster} from "@/types/Talk";

export const getPosters: () => Promise<{
  general: Poster[],
  community: Poster[]
}> = async () => import('@/cache/posters.json')
  .then((module) => module.default as { general: Poster[], community: Poster[], })
  .catch(() => ({general: [], community: []}));