import 'server-only'
import {CameraCrew, Organizer, Reviewer} from "@/types/Organizer";

export const getOrganizers: () => Promise<Organizer[]> = async () => import('@/cache/organizers.json')
  .then((module) => module.default as Organizer[])
  .catch(() => []);

export const getReviewers: () => Promise<Reviewer[]> = async () => import('@/cache/reviewers.json')
  .then((module) => module.default as Reviewer[])
  .catch(() => []);

export const getCameraCrews: () => Promise<CameraCrew[]> = async () => import('@/cache/camera_crew.json')
  .then((module) => module.default as CameraCrew[])
  .catch(() => []);
