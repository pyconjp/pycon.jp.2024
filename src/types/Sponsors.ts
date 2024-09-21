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
  job_board: string;
  logo_image: string;
  plan: 'platinum' | 'gold' | 'silver';
}

export type SpecialSponsor = {
  name_ja: string;
  name_en: string;
  url_ja: string;
  url_en: string;
  title_ja: string;
  title_en: string;
  logo_image: string;
  plan: 'psf' | 'advertising' | 'special';
}

export type LocaledSpecialSponsor = {
  name: string;
  url: string;
  title: string;
  logo_image: string;
  plan: 'psf' | 'advertising' | 'special';
}

export type Patron = {
  name: string;
  image: string;
}
