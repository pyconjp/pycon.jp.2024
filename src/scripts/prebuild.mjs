import {google} from "googleapis";

console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log(process.env.GOOGLE_PRIVATE_KEY);

// const auth = new google.auth.JWT(
//   {
//     email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
//     scopes: ['https://www.googleapis.com/auth/drive']
//   });
//
// const drive = google.drive({version: 'v3', auth});
// const res = drive.files.list({
//   driveId: '1vhn-lDdgdAixhFkGEi14JaTlXEToBWMf',
// }).then(
//   res => console.log(res)
// );

