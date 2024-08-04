export type Sponsor = {
  name_ja: string;
  name_en: string;
  url_ja: string;
  url_en: string;
  profile_ja: string;
  profile_en: string;
  job_board_ja: string;
  job_board_en: string;
  logo_image: string;
  plan: 'platinum' | 'gold' | 'silver';
}

export type LocaledSponsor = {
  name: string;
  url: string;
  profile: string;
  logo_image: string;
  plan: 'platinum' | 'gold' | 'silver';
}