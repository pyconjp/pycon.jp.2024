import {drive_v3, google,} from 'googleapis';
import * as fs from "node:fs";
import axios from "axios";
import {Talk} from "../types/Talk";
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

// Google Sheets データ取得（エラー時は空配列を使用）
let reviewers: Reviewer[] = [];
try {
  reviewers = await fetchSheet<Reviewer>(
    process.env.REVIEWER_SPREADSHEET_ID || '',
    'フォームの回答 1!B2:C30',
    ['name_en', 'name_ja']
  );
} catch (error) {
  console.warn('Failed to fetch reviewers from Google Sheets:', error);
  // キャッシュファイルが存在すれば読み込む
  if (fs.existsSync('./src/cache/reviewers.json')) {
    reviewers = JSON.parse(fs.readFileSync('./src/cache/reviewers.json', 'utf-8'));
    console.log('Using cached reviewers data');
  }
}
writeJson('./src/cache/reviewers.json', reviewers);

let cameraCrews: CameraCrew[] = [];
try {
  cameraCrews = await fetchSheet<CameraCrew>(
    process.env.ORGANIZER_SPREADSHEET_ID || '',
    'カメラマン!A2:B30',
    ['name_ja', 'name_en']
  );
} catch (error) {
  console.warn('Failed to fetch camera crews from Google Sheets:', error);
  if (fs.existsSync('./src/cache/camera_crew.json')) {
    cameraCrews = JSON.parse(fs.readFileSync('./src/cache/camera_crew.json', 'utf-8'));
    console.log('Using cached camera crews data');
  }
}
writeJson('./src/cache/camera_crew.json', cameraCrews);

let specialSponsors: SpecialSponsor[] = [];
try {
  specialSponsors = await fetchSheet<SpecialSponsor>(
    process.env.SPONSOR_SPREADSHEET_ID || '',
    '特別スポンサー_Webサイト掲載用!A2:H51',
    ['name_ja', 'name_en', 'url_ja', 'url_en', 'title_ja', 'title_en', 'logo_image', 'plan']
  );
} catch (error) {
  console.warn('Failed to fetch special sponsors from Google Sheets:', error);
  if (fs.existsSync('./src/cache/special_sponsors.json')) {
    specialSponsors = JSON.parse(fs.readFileSync('./src/cache/special_sponsors.json', 'utf-8'));
    console.log('Using cached special sponsors data');
  }
}
writeJson('./src/cache/special_sponsors.json', specialSponsors);

let sprints: Sprint[] = [];
try {
  sprints = await fetchSheet<Sprint>(
    process.env.SPRINT_SPREADSHEET_ID || '',
    'シート1!B2:D51',
    ['leader', 'title', 'slideId']
  );
} catch (error) {
  console.warn('Failed to fetch sprints from Google Sheets:', error);
  if (fs.existsSync('./src/cache/sprints.json')) {
    sprints = JSON.parse(fs.readFileSync('./src/cache/sprints.json', 'utf-8'));
    console.log('Using cached sprints data');
  }
}
writeJson('./src/cache/sprints.json', sprints);

let specialThanks: SpecialThanks[] = [];
try {
  specialThanks = await fetchSheet<SpecialThanks>(
    process.env.SPECIAL_THANKS_SPREADSHEET_ID || '',
    'シート1!A2:E51',
    ['name', 'title', 'url', 'image', 'contribution']
  );
} catch (error) {
  console.warn('Failed to fetch special thanks from Google Sheets:', error);
  if (fs.existsSync('./src/cache/special_thanks.json')) {
    specialThanks = JSON.parse(fs.readFileSync('./src/cache/special_thanks.json', 'utf-8'));
    console.log('Using cached special thanks data');
  }
}
writeJson('./src/cache/special_thanks.json', specialThanks);

let contents: Content[] = [];
try {
  contents = await fetchSheet<Content>(
    process.env.CONTENTS_SPREADSHEET_ID || '',
    'シート1!A2:F51',
    ['title_ja', 'title_en', 'description_ja', 'description_en', 'url', 'image']
  );
} catch (error) {
  console.warn('Failed to fetch contents from Google Sheets:', error);
  if (fs.existsSync('./src/cache/contents.json')) {
    contents = JSON.parse(fs.readFileSync('./src/cache/contents.json', 'utf-8'));
    console.log('Using cached contents data');
  }
}
writeJson('./src/cache/contents.json', contents);

let sponsors: Sponsor[] = [];
try {
  sponsors = await fetchSheet<Sponsor>(
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
} catch (error) {
  console.warn('Failed to fetch sponsors from Google Sheets:', error);
  if (fs.existsSync('./src/cache/sponsors.json')) {
    sponsors = JSON.parse(fs.readFileSync('./src/cache/sponsors.json', 'utf-8'));
    console.log('Using cached sponsors data');
  }
}
writeJson('./src/cache/sponsors.json', sponsors);

let organizers: Organizer[] = [];
try {
  organizers = await fetchSheet<Organizer>(
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
  );
} catch (error) {
  console.warn('Failed to fetch organizers from Google Sheets:', error);
  if (fs.existsSync('./src/cache/organizers.json')) {
    organizers = JSON.parse(fs.readFileSync('./src/cache/organizers.json', 'utf-8'));
    console.log('Using cached organizers data');
  }
}
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

// Google Drive downloads (skip if Google Cloud Project is unavailable)
try {
  await download(process.env.ORGANIZER_FOLDER_ID || '', './public/organizers/');
} catch (error) {
  console.warn('Failed to download organizer images from Google Drive:', error);
}

try {
  await download(process.env.SPONSOR_FOLDER_ID || '', './public/sponsors/');
} catch (error) {
  console.warn('Failed to download sponsor images from Google Drive:', error);
}

try {
  await download(process.env.SPECIAL_THANKS_FOLDER_ID || '', './public/special-thanks/');
} catch (error) {
  console.warn('Failed to download special thanks images from Google Drive:', error);
}

try {
  await download(process.env.CONTENTS_FOLDER_ID || '', './public/contents/');
} catch (error) {
  console.warn('Failed to download contents images from Google Drive:', error);
}

// fetch pretalx talks
const fetchTalks = async (): Promise<Talk[]> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('submission_type', '4328,4329'); // mini talk&talk
    searchParams.append('expand', [
      'answers',
      'answers.question',
      'resources',
      'slots.room',
      'speakers.answers',
      'submission_type',
      'tags',
      'tracks',
    ].join(','));
    searchParams.append('state', 'confirmed');
    searchParams.append('limit', '100');

    const response = await axios.get(
      `https://pretalx.com/api/events/pyconjp2024/submissions/?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Token ${process.env.PRETALX_AUTH_KEY}`,
        },
      }
    );

    const originalTalks = response.data.results;

    // Parse talks according to the new API structure
    return originalTalks
      .filter((talk: any) => !['HHVDEQ', 'TUPJBN'].includes(talk.code)) // exclude keynotes
      .map((talk: any) => {
        // Extract answers from new structure
        const getAnswer = (questionId: number) => {
          const answer = talk.answers?.find((a: any) => a.question?.id === questionId);
          return answer?.answer || '';
        };

        const getBoolAnswer = (questionId: number) => {
          const answer = talk.answers?.find((a: any) => a.question?.id === questionId);
          return answer?.answer === 'True';
        };

        // Map level, language from answers to numeric IDs
        const levelMap: any = {
          'Beginner': 5539,
          'Intermediate': 5540,
          'Advanced': 5541
        };
        const level = levelMap[getAnswer(3772)] || 5540;

        const langMap: any = {
          'Japanese': 5542,
          '日本語': 5542,
          'English': 5543
        };
        const speakLang = langMap[getAnswer(3773)] || 5542;
        const slideLang = langMap[getAnswer(3774)] || 5542;

        const slot = talk.slots?.[0] || null;
        const startTime = slot?.start || null;
        const endTime = slot?.end || null;

        return {
          code: talk.code,
          speakers: talk.speakers?.map((speaker: any) => ({
            code: speaker.code,
            name: speaker.name,
            biography: speaker.biography || '',
            avatar: speaker.avatar_url || null,
          })) || [],
          title: talk.title,
          track_id: talk.track || null,
          state: talk.state,
          abstract: talk.abstract || '',
          description: talk.description || '',
          duration: talk.duration || 0,
          slot: slot && slot.room ? {
            start: startTime,
            end: endTime,
            room: slot.room?.name || {'en': '', 'ja-jp': ''},
            room_id: slot.room?.id || 0
          } : null,
          resources: talk.resources || [],
          pending_state: null,
          question_answers: {
            level: level,
            speak_language: speakLang,
            slide_language: slideLang,
            photo_agreement: getBoolAnswer(3791),
            video_agreement: getBoolAnswer(3792),
          },
          date: startTime && new Date(startTime) < new Date('2024-09-28T00:00:00+09:00') ? 'day1' : 'day2' as 'day1' | 'day2',
          start_minute: startTime ? calculateMinutes(startTime, startTime < '2024-09-28T00:00:00+09:00' ? '2024-09-27T10:00:00+09:00' : '2024-09-28T10:00:00+09:00') : 0,
          end_minute: endTime ? calculateMinutes(endTime, startTime < '2024-09-28T00:00:00+09:00' ? '2024-09-27T10:00:00+09:00' : '2024-09-28T10:00:00+09:00') : 0,
          is_event: false as false,
        };
      });
  } catch (error) {
    console.error('Failed to fetch talks from Pretalx API:', error);
    return [];
  }
};

const calculateMinutes = (dateStr: string, baseStr: string): number => {
  const date = new Date(dateStr);
  const base = new Date(baseStr);
  return Math.floor((date.getTime() - base.getTime()) / (1000 * 60));
};


// Pretalx API データ取得
let talks: Talk[] = [];
try {
  talks = await fetchTalks();
  if (talks.length > 0) {
    fs.writeFileSync('./src/cache/talks.json', JSON.stringify(talks, null, 2));
    console.log(`${talks.length} talks fetched and written to ./src/cache/talks.json`);

    // MDXファイル作成
    talks.forEach(talk => {
      fs.writeFileSync(`./src/cache/talks/abstract_${talk.code}.mdx`, talk.abstract);
      console.log(`Talk ${talk.code} written to ./src/cache/talks/abstract_${talk.code}.mdx`);
      fs.writeFileSync(`./src/cache/talks/description_${talk.code}.mdx`, talk.description);
      console.log(`Talk ${talk.code} written to ./src/cache/talks/description_${talk.code}.mdx`);
      talk.speakers.forEach(speaker => {
        fs.writeFileSync(`./src/cache/speakers/biography_${speaker.code}.mdx`, speaker.biography || '');
        console.log(`Speaker ${speaker.code} written to ./src/cache/speakers/biography_${speaker.code}.mdx`);
      });
    });
  } else {
    // Pretalx APIからデータが取得できなかった場合、キャッシュを使用
    if (fs.existsSync('./src/cache/talks.json')) {
      talks = JSON.parse(fs.readFileSync('./src/cache/talks.json', 'utf-8'));
      console.log('Using cached talks data');
    }
  }

  // ポスターセッション取得
  const fetchPosters = async (submissionTypeId: number): Promise<any[]> => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('submission_type', String(submissionTypeId));
      searchParams.append('expand', 'speakers,answers,answers.question');
      searchParams.append('state', 'confirmed');
      searchParams.append('state', 'accepted');
      searchParams.append('limit', '100');

      const response = await axios.get(
        `https://pretalx.com/api/events/pyconjp2024/submissions/?${searchParams.toString()}`,
        {
          headers: {
            Authorization: `Token ${process.env.PRETALX_AUTH_KEY}`,
          },
        }
      );

      return response.data.results.map((poster: any) => ({
        code: poster.code,
        speakers: poster.speakers?.map((speaker: any) => ({
          code: speaker.code,
          name: speaker.name,
          biography: speaker.biography || '',
          avatar: speaker.avatar_url || null,
        })) || [],
        title: poster.title,
        abstract: poster.abstract || '',
      }));
    } catch (error) {
      console.error(`Failed to fetch posters (type ${submissionTypeId}):`, error);
      return [];
    }
  };

  const writeAbstracts = (posters: any[]) => {
    posters.forEach(poster => {
      fs.writeFileSync(`./src/cache/posters/abstract_${poster.code}.mdx`, poster.abstract);
      console.log(`Poster ${poster.code} written to ./src/cache/posters/abstract_${poster.code}.mdx`);
    });
  };

  let general: any[] = [];
  let community: any[] = [];

  try {
    general = await fetchPosters(4331);
    community = await fetchPosters(4366);
  } catch (error) {
    console.warn('Failed to fetch posters from Pretalx API:', error);
    // キャッシュからポスターデータを読み込む
    if (fs.existsSync('./src/cache/posters.json')) {
      const cachedPosters = JSON.parse(fs.readFileSync('./src/cache/posters.json', 'utf-8'));
      general = cachedPosters.general || [];
      community = cachedPosters.community || [];
      console.log('Using cached posters data');
    }
  }

  if (general.length > 0 || community.length > 0) {
    fs.writeFileSync('./src/cache/posters.json', JSON.stringify({general, community}, null, 2));
    console.log(`${general.length} general posters and ${community.length} community posters fetched and written to ./src/cache/posters.json`);

    writeAbstracts(general);
    writeAbstracts(community);
  }
} catch (error) {
  console.error('Error in Pretalx data fetching:', error);
  // エラーが発生してもビルドは続行する
}