import 'server-only'
import {google} from "googleapis";

export async function getOrganizers() {
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

  return response.data.values;
}