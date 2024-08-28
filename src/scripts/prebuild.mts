import {
  google,
  drive_v3,
} from 'googleapis';
import {GaxiosResponse} from 'gaxios';
import * as fs from "node:fs";
import axios from "axios";
import {Talk, Answer, OriginalSpeaker, OriginalTalk, LEVEL_LIST, SPEAK_LANG_LIST, SLIDE_LANG_LIST} from "../types/Talk";

// download files from Google Drive
const auth = new google.auth.JWT(
  {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

const drive: drive_v3.Drive = google.drive({version: 'v3', auth});

const download = (folderId: string, pathPrefix: string) => {
  drive.files.list({
    driveId: process.env.DRIVE_ID!,
    teamDriveId: process.env.TEAM_DRIVE_ID!,
    includeItemsFromAllDrives: true,
    corpora: 'teamDrive',
    supportsAllDrives: true,
    q: `'${folderId}' in parents and trashed = false`
  }).then((res: GaxiosResponse<drive_v3.Schema$FileList>) => {
    (res.data.files || []).forEach(file => {
      const path = `${pathPrefix}${file.name}`;
      const dest = fs.createWriteStream(path);
      drive.files.get(
        {fileId: file.id!, alt: 'media'},
        {responseType: 'stream'}
      ).then((res) => {
        res.data
          .on('end', () => console.log(`Downloaded file ${path}`))
          .on('error', () => console.error(`Error downloading file ${path}`))
          .pipe(dest);
      }).catch((err) => {
        console.error(`Error downloading file ${path}:`, err);
      });
    });
  }).catch(console.error);
}

download(process.env.ORGANIZER_FOLDER_ID || '', './public/organizers/');
download(process.env.SPONSOR_FOLDER_ID || '', './public/sponsors/');

// fetch pretalx talks
const fetchAnswers: <T>(question: number) => Promise<Answer<T>[]> = async question => axios.get(
  `https://pretalx.com/api/events/pyconjp2024/answers/`,
  {
    params: {
      limit: 300,
      question,
    },
    headers: {
      Authorization: `Token ${process.env.PRETALX_AUTH_KEY}`,
    },
  },
).then(
  response => response.data.results
)

const fetchAndMapAnswers = async <T, >(
  question: number,
): Promise<Record<string, keyof T>> => {
  const answers = await fetchAnswers<T>(question);
  return answers.reduce((acc, answer) => {
    return {
      ...acc,
      [answer.submission]: answer.options[0].id,
    };
  }, {});
};

const fetchBoolAnswers = async (question: number): Promise<Record<string, boolean>> => {
  const answers = await fetchAnswers<boolean>(question);
  return answers.reduce((acc, answer) => ({[answer.submission]: answer.answer === 'True', ...acc}), {});
}

const levels = await fetchAndMapAnswers<typeof LEVEL_LIST>(3772);
const speakLanguages = await fetchAndMapAnswers<typeof SPEAK_LANG_LIST>(3773);
const slideLanguages = await fetchAndMapAnswers<typeof SLIDE_LANG_LIST>(3774);

const photoAgreements = await fetchBoolAnswers(3791);
const videoAgreements = await fetchBoolAnswers(3792);

const talks: Talk[] = await axios.get<{ results: OriginalTalk[] }>(
  `https://pretalx.com/api/events/pyconjp2024/talks/`,
  {
    params: {
      limit: 100,
    },
    headers: {
      Authorization: `Token ${process.env.PRETALX_AUTH_KEY}`,
    },
  },
).then(
  response => response.data.results
).then(
  talks => talks.filter(talk => !['EHFVUR', 'HHVDEQ', 'TUPJBN'].includes(talk.code)) // exclude keynotes and invitation talks
).then(
  talks => talks.filter(talk => [4328, 4329].includes(talk.submission_type_id))
).then(
  (talks: OriginalTalk[]) => talks.map(talk => ({
        code: talk.code,
        speakers: talk.speakers.map((speaker: OriginalSpeaker) => ({
          code: speaker.code,
          name: speaker.name,
          biography: speaker.biography,
          avatar: speaker.avatar,
        })),
        title: talk.title,
        track_id: talk.track_id,
        state: talk.state,
        abstract: talk.abstract,
        description: talk.description,
        duration: talk.duration,
        slot: talk.slot,
        resources: talk.resources,
        pending_state: talk.pending_state,
        question_answers: {},
        submission_type: talk.submission_type,
        submission_type_id: talk.submission_type_id,
      }
    )
  )
).then(
  (talks: Talk[]) => talks.map(talk => ({
    ...talk,
    question_answers: {
      level: levels[talk.code],
      speak_language: speakLanguages[talk.code],
      slide_language: slideLanguages[talk.code],
      photo_agreement: photoAgreements[talk.code],
      video_agreement: videoAgreements[talk.code],
    },
  }))
);

fs.writeFileSync('./src/cache/talks.json', JSON.stringify(talks, null, 2));
console.log(`${talks.length} talks fetched and written to talks.json`);