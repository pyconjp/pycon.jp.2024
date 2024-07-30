import 'server-only'
import {Organizer} from "@/types/Organizer";
import {getAccessToken} from "@/lib/google";

export async function getOrganizers(): Promise<Organizer[]> {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    || !process.env.GOOGLE_PRIVATE_KEY
    || !process.env.ORGANIZER_SPREADSHEET_ID) {
    return [];
  }

  const {access_token} = await getAccessToken();

  const sheetsResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.ORGANIZER_SPREADSHEET_ID}/values/フォームの回答 1!C2:H100`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "force-cache",
    }
  );

  const data = await sheetsResponse.json();

  return (data.values || [])
    .map((row: string[]) => {
        while (row.length < 6) {
          row.push('');
        }

        return {
          name_ja: row[0],
          name_en: row[1],
          github: row[2],
          twitter: row[3],
          facebook: row[4],
          image: row[5]
        };
      }
    );
}