import 'server-only'
import {LocaledSpecialSponsor, LocaledSponsor, SpecialSponsor, Sponsor} from "@/types/Sponsors";

export const getSponsors: () => Promise<Sponsor[]> = async () => import('@/cache/sponsors.json')
  .then((module) => module.default as Sponsor[])
  .catch(() => []);

export function getLocaledSponsors(sponsors: Sponsor[], lang: 'ja' | 'en'): LocaledSponsor[] {
  return sponsors.map(sponsor => {
    if (lang === 'ja') {
      return {
        name: sponsor.name_ja || sponsor.name_en,
        url: sponsor.url_ja || sponsor.url_en,
        profile: sponsor.profile_ja || sponsor.profile_en,
        job_board: sponsor.job_board_ja || sponsor.job_board_en,
        job_board_url: sponsor.job_board_url_ja || sponsor.job_board_url_en,
        logo_image: sponsor.logo_image,
        plan: sponsor.plan
      }
    } else {
      return {
        name: sponsor.name_en || sponsor.name_ja,
        url: sponsor.url_en || sponsor.url_ja,
        profile: sponsor.profile_en || sponsor.profile_ja,
        job_board: sponsor.job_board_en || sponsor.job_board_ja,
        job_board_url: sponsor.job_board_url_en || sponsor.job_board_url_ja,
        logo_image: sponsor.logo_image,
        plan: sponsor.plan
      }
    }
  });
}

export const getLocaledSpecialSponsors: (lang: 'ja' | 'en') => Promise<LocaledSpecialSponsor[]> = async (lang: 'ja' | 'en') => import('@/cache/special_sponsors.json')
  .then((module) => module.default as SpecialSponsor[])
  .then(
    (specialSponsors: SpecialSponsor[]) => lang === 'ja' ? specialSponsors.map(
      sponsor => (
        {
          name: sponsor.name_ja || sponsor.name_en,
          url: sponsor.url_ja || sponsor.url_en,
          title: sponsor.title_ja || sponsor.title_en,
          logo_image: sponsor.logo_image,
          plan: sponsor.plan
        }
      )
    ) : specialSponsors.map(
      sponsor => (
        {
          name: sponsor.name_en || sponsor.name_ja,
          url: sponsor.url_en || sponsor.url_ja,
          title: sponsor.title_en || sponsor.title_ja,
          logo_image: sponsor.logo_image,
          plan: sponsor.plan
        }
      )
    )
  )
  .catch(() => []);
