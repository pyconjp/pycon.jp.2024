import {google} from "googleapis";
import * as fs from "node:fs";

const auth = new google.auth.JWT(
  {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

const drive = google.drive({version: 'v3', auth});

drive.files.list({
  driveId: process.env.DRIVE_ID,
  teamDriveId: process.env.TEAM_DRIVE_ID,
  includeItemsFromAllDrives: true,
  corpora: 'teamDrive',
  supportsAllDrives: true,
  q: `'${process.env.ORGANIZER_FOLDER_ID}' in parents and trashed = false`
}).then(
  res =>
    res.data.files.map(file => {
      const path = `./public/organizers/${file.name}`;
      const dest = fs.createWriteStream(path);
      drive.files.get(
        {fileId: file.id, alt: 'media'},
        {responseType: 'stream'},
        (err, res) => {
          res.data
            .on('end', () => console.log(`Downloaded file ${path}`))
            .on('error', () => console.error(`Error downloading file ${path}`))
            .pipe(dest);
        }
      );
    })
);

drive.files.list({
  driveId: process.env.DRIVE_ID,
  teamDriveId: process.env.TEAM_DRIVE_ID,
  includeItemsFromAllDrives: true,
  corpora: 'teamDrive',
  supportsAllDrives: true,
  q: `'${process.env.SPONSOR_FOLDER_ID}' in parents and trashed = false`
}).then(
  res =>
    res.data.files.map(file => {
      const path = `./public/sponsors/${file.name}`;
      const dest = fs.createWriteStream(path);
      drive.files.get(
        {fileId: file.id, alt: 'media'},
        {responseType: 'stream'},
        (err, res) => {
          res.data
            .on('end', () => console.log(`Downloaded file ${path}`))
            .on('error', () => console.error(`Error downloading file ${path}`))
            .pipe(dest);
        }
      );
    })
);
