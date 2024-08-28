import 'server-only'
import {Talk} from "@/types/Talk";

export const getTalks: () => Promise<Talk[]> = async () => import('@/cache/talks.json').then((module) => module.default as Talk[]).catch(() => []);
