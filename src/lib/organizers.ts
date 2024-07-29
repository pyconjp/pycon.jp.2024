import 'server-only'
import {google} from "googleapis";
import {Organizer} from "@/types/Organizer";

export async function getOrganizers(): Promise<Organizer[]> {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    || !process.env.GOOGLE_PRIVATE_KEY
    || !process.env.ORGANIZER_SPREADSHEET_ID) {
    return [];
  }

  const auth = new google.auth.JWT(
    {
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

  const sheets = google.sheets({version: 'v4', auth});
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.ORGANIZER_SPREADSHEET_ID,
    range: 'フォームの回答 1!C2:H100'
  });

  return (response.data.values || [])
    .map((row) => {
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