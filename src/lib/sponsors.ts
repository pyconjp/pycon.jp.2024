import 'server-only'
import {LocaledSponsor, Sponsor} from "@/types/Sponsors";
import {getAccessToken} from "@/lib/google";

export async function getSponsors(): Promise<Sponsor[]> {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
      || !process.env.GOOGLE_PRIVATE_KEY
      || !process.env.SPONSOR_SPREADSHEET_ID) {
      return [];
    }

    const {access_token} = await getAccessToken();

    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPONSOR_SPREADSHEET_ID}/values/Webサイト掲載用!A2:J100`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await sheetsResponse.json();

    return (data.values || [])
      .map((row: string[]) => {
        while (row.length < 10) {
          row.push('');
        }

        return {
          name_ja: row[0],
          name_en: row[1],
          url_ja: row[2],
          url_en: row[3],
          profile_ja: row[4],
          profile_en: row[5],
          job_board_ja: row[6],
          job_board_en: row[7],
          logo_image: row[8],
          plan: row[9] as Sponsor['plan'],
        };
      });
  } catch (e) {
    return [];
  }
}

export function getLocaledSponsors(sponsors: Sponsor[], lang: 'ja' | 'en'): LocaledSponsor[] {
  return sponsors.map(sponsor => {
    if (lang === 'ja') {
      return {
        name: sponsor.name_ja || sponsor.name_en,
        url: sponsor.url_ja || sponsor.url_en,
        profile: sponsor.profile_ja || sponsor.profile_en,
        logo_image: sponsor.logo_image,
        plan: sponsor.plan
      }
    } else {
      return {
        name: sponsor.name_en || sponsor.name_ja,
        url: sponsor.url_en || sponsor.url_ja,
        profile: sponsor.profile_en || sponsor.profile_ja,
        logo_image: sponsor.logo_image,
        plan: sponsor.plan
      }
    }
  });
}