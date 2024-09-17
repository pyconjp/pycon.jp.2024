import {SpecialThanks} from "@/types/SpecialThanks";

export const getSpecialThanks: () => Promise<SpecialThanks[]> = async () => import('@/cache/special_thanks.json')
  .then((module) => module.default as SpecialThanks[])
  .catch(() => []);