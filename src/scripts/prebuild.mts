import {drive_v3, google,} from 'googleapis';
import * as fs from "node:fs";
import axios from "axios";
import {Answer, OriginalSpeaker, OriginalTalk, Poster, Talk} from "../types/Talk";
import {differenceInMinutes} from "date-fns";
import {LEVEL_LIST, SLIDE_LANG_LIST, SPEAK_LANG_LIST} from "../const/timetable";
import {CameraCrew, Organizer, Reviewer} from "../types/Organizer";
import {SpecialSponsor, Sponsor} from "../types/Sponsors";
import {Sprint} from "../types/Sprint";
import {SpecialThanks} from "../types/SpecialThanks";
import {Content} from "../types/Contents";

// download files from Google Drive
const auth = new google.auth.JWT(
  {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/drive']
  });

const fetchSheet: <T extends {}>(spreadSheetId: string, range: string, keys: (keyof T)[]) => Promise<T[]>
  = async <T extends {}>(spreadSheetId: string, range: string, keys: (keyof T)[]): Promise<T[]> => {
  const sheets = google.sheets({version: 'v4', auth});
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadSheetId,
    range,
  });

  return (response.data.values || [])
    .map((row: string[]) => {
      // rowの長さがkeysの長さに満たない場合、空文字列で埋める
      while (row.length < keys.length) {
        row.push('');
      }

      // 初期値を空のオブジェクトとして型推論を利用
      return keys.reduce((acc, key, i) => {
        acc[key] = row[i] as T[keyof T];
        return acc;
      }, {} as T);
    });
}

const writeJson = (path: string, data: any[]) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`${data.length} items fetched and written to ${path}`);
}

const reviewers: Reviewer[] = await fetchSheet<Reviewer>(
  process.env.REVIEWER_SPREADSHEET_ID || '',
  'フォームの回答 1!B2:C30',
  ['name_en', 'name_ja']
);
writeJson('./src/cache/reviewers.json', reviewers);

const cameraCrews: CameraCrew[] = await fetchSheet<CameraCrew>(
  process.env.ORGANIZER_SPREADSHEET_ID || '',
  'カメラマン!A2:B30',
  ['name_ja', 'name_en']
);
writeJson('./src/cache/camera_crew.json', cameraCrews);

const specialSponsors: SpecialSponsor[] = await fetchSheet<SpecialSponsor>(
  process.env.SPONSOR_SPREADSHEET_ID || '',
  '特別スポンサー_Webサイト掲載用!A2:H51',
  ['name_ja', 'name_en', 'url_ja', 'url_en', 'title_ja', 'title_en', 'logo_image', 'plan']
);
writeJson('./src/cache/special_sponsors.json', specialSponsors);

const sprints: Sprint[] = await fetchSheet<Sprint>(
  process.env.SPRINT_SPREADSHEET_ID || '',
  'シート1!B2:D51',
  ['leader', 'title', 'slideId']
);
writeJson('./src/cache/sprints.json', sprints);

const specialThanks: SpecialThanks[] = await fetchSheet<SpecialThanks>(
  process.env.SPECIAL_THANKS_SPREADSHEET_ID || '',
  'シート1!A2:E51',
  ['name', 'title', 'url', 'image', 'contribution']
);
writeJson('./src/cache/special_thanks.json', specialThanks);

const contents: Content[] = await fetchSheet<Content>(
  process.env.CONTENTS_SPREADSHEET_ID || '',
  'シート1!A2:F51',
  ['title_ja', 'title_en', 'description_ja', 'description_en', 'url', 'image']
);
writeJson('./src/cache/contents.json', contents);

const sponsors: Sponsor[] = await fetchSheet<Sponsor>(
  process.env.SPONSOR_SPREADSHEET_ID || '',
  'Webサイト掲載用!A2:L100',
  [
    'name_ja',
    'name_en',
    'url_ja',
    'url_en',
    'profile_ja',
    'profile_en',
    'job_board_ja',
    'job_board_en',
    'logo_image',
    'plan',
    'job_board_url_ja',
    'job_board_url_en',
  ]
);
writeJson('./src/cache/sponsors.json', sponsors);

const organizers: Organizer[] = await fetchSheet<Organizer>(
  process.env.ORGANIZER_SPREADSHEET_ID || '',
  'フォームの回答 1!C2:H100',
  [
    'name_ja',
    'name_en',
    'github',
    'twitter',
    'facebook',
    'image',
  ]
)
writeJson('./src/cache/organizers.json', organizers);

const drive: drive_v3.Drive = google.drive({version: 'v3', auth});

const download = async (folderId: string, pathPrefix: string) => {
  try {
    const res = await drive.files.list({
      driveId: process.env.DRIVE_ID!,
      teamDriveId: process.env.TEAM_DRIVE_ID!,
      includeItemsFromAllDrives: true,
      corpora: 'teamDrive',
      supportsAllDrives: true,
      q: `'${folderId}' in parents and trashed = false`,
    });

    const files = res.data.files || [];

    for (const file of files) {
      const path = `${pathPrefix}${file.name}`;
      const dest = fs.createWriteStream(path);
      try {
        const res = await drive.files.get(
          {fileId: file.id!, alt: 'media'},
          {responseType: 'stream'}
        );
        await new Promise((resolve, reject) => {
          res.data
            .on('end', () => {
              console.log(`Downloaded file ${path}`);
              dest.end(); // ストリームを閉じる
              resolve(null);
            })
            .on('error', (err) => {
              console.error(`Error downloading file ${path}:`, err);
              dest.end(); // エラー時にもストリームを閉じる
              reject(err);
            })
            .pipe(dest);
        });
      } catch (err) {
        console.error(`Error downloading file ${path}:`, err);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

await download(process.env.ORGANIZER_FOLDER_ID || '', './public/organizers/');
await download(process.env.SPONSOR_FOLDER_ID || '', './public/sponsors/');
await download(process.env.SPECIAL_THANKS_FOLDER_ID || '', './public/special-thanks/');
await download(process.env.CONTENTS_FOLDER_ID || '', './public/contents/');

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
  talks => talks.filter(talk => !['HHVDEQ', 'TUPJBN'].includes(talk.code)) // exclude keynotes
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
        date: talk.slot.start < '2024-09-28T00:00:00+09:00' ? 'day1' : 'day2' as 'day1' | 'day2',
        start_minute: talk.slot.start < '2024-09-28T00:00:00+09:00' ? differenceInMinutes(new Date(talk.slot.start), new Date('2024-09-27T10:00:00+09:00')) : differenceInMinutes(new Date(talk.slot.start), new Date('2024-09-28T10:00:00+09:00')),
        end_minute: talk.slot.start < '2024-09-28T00:00:00+09:00' ? differenceInMinutes(new Date(talk.slot.end), new Date('2024-09-27T10:00:00+09:00')) : differenceInMinutes(new Date(talk.slot.end), new Date('2024-09-28T10:00:00+09:00')),
        is_event: false as false,
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
console.log(`${talks.length} talks fetched and written to ./src/cache/talks.json`);

talks.forEach(talk => {
  fs.writeFileSync(`./src/cache/talks/abstract_${talk.code}.mdx`, talk.abstract);
  console.log(`Talk ${talk.code} written to ./src/cache/talks/abstract_${talk.code}.mdx`);
  fs.writeFileSync(`./src/cache/talks/description_${talk.code}.mdx`, talk.description);
  console.log(`Talk ${talk.code} written to ./src/cache/talks/description_${talk.code}.mdx`);
  talk.speakers.forEach(speaker => {
    fs.writeFileSync(`./src/cache/speakers/biography_${speaker.code}.mdx`, speaker.biography || '');
    console.log(`Speaker ${speaker.code} written to ./src/cache/speakers/biography_${speaker.code}.mdx`);
  });
})
console.log('All talks and speakers written to cache');

const fetchPosters: (submissionTypeId: number) => Promise<Poster[]> = async submissionTypeId => axios.get(
  `https://pretalx.com/api/events/pyconjp2024/submissions/`,
  {
    params: {
      limit: 100,
      submission_type: submissionTypeId, // pretalxのドキュメントと異なる
      state: 'confirmed',
    },
    headers: {
      Authorization: `Token ${process.env.PRETALX_AUTH_KEY}`,
    },
  },
).then(
  response => response.data.results
).then(
  // pretalxのドキュメント通りの挙動になった場合に備えるため
  (talks: OriginalTalk[]) => talks.filter(talk => talk.submission_type_id === submissionTypeId)
).then((talks: OriginalTalk[]) => talks.map(talk => ({
    code: talk.code,
    speakers: talk.speakers.map((speaker: OriginalSpeaker) => ({
      code: speaker.code,
      name: speaker.name,
      biography: speaker.biography,
      avatar: speaker.avatar,
    })),
    title: talk.title,
    abstract: talk.abstract,
  }))
)

const writeAbstracts = async (posters: Poster[]) => {
  posters.forEach(poster => {
    fs.writeFileSync(`./src/cache/posters/abstract_${poster.code}.mdx`, poster.abstract);
    console.log(`Poster ${poster.code} written to ./src/cache/posters/abstract_${poster.code}.mdx`);
  });
}

const general = await fetchPosters(4331);
const community = await fetchPosters(4366);

fs.writeFileSync('./src/cache/posters.json', JSON.stringify({general, community}, null, 2));
console.log(`${general.length} general posters and ${community.length} community posters fetched and written to ./src/cache/posters.json`);

await writeAbstracts(general);
await writeAbstracts(community);