export type OriginalSpeaker = Speaker & {
  email: string,
}

export type OriginalTalk = Omit<Talk, 'question_answers' | 'date' | 'is_event'> & {
  speakers: OriginalSpeaker[],
  do_not_record: boolean,
  content_locale: 'ja-jp' | 'en',
  answers: [],
  notes: string | null,
  internal_notes: string | null,
  is_featured: boolean,
  slot_count: number,
  image: string | null,
  created: string,
  submission_type: {
    'en': string,
    'ja-jp': string,
  },
  submission_type_id: number,
}

export type Talk = {
  code: string,
  speakers: Speaker[],
  title: string,
  track_id: keyof Category,
  state: string,
  abstract: string,
  description: string,
  duration: number,
  slot: {
    room_id: number,
    room: {
      'en': string,
      'ja-jp': string,
    },
    start: string,
    end: string,
  },
  resources: {
    resource: string,
    description: string
  }[],
  pending_state: string | null,
  question_answers: {
    level?: number,
    speak_language?: number,
    slide_language?: number,
    photo_agree?: boolean,
    video_agree?: boolean,
  },
  date: 'day1' | 'day2',
  start_minute: number, // カンファレンス開始時刻からの経過分
  end_minute: number, // カンファレンス開始時刻からの経過分
  is_event: false,
  hide_start?: false,
  hide_end?: false,
}

export type Speaker = {
  code: string,
  name: string,
  biography: string | null,
  avatar: string | null,
}

export type Answer<T> = {
  id: number,
  question: {
    id: number,
    question: { en: string, 'ja-jp': string },
  },
  answer: string,
  answer_file: string | null,
  submission: string,
  review: number | null,
  person: string | null,
  options: [{ id: keyof T, answer: string, 'ja-jp': string, 'en': string }],
}

export type ConferenceEvent = {
  code: string,
  speakers: Speaker[],
  title: string,
  slot: {
    room_id: number,
    start: string,
    end: string,
  },
  date: 'day1' | 'day2',
  is_event: true,
  start_minute: number, // カンファレンス開始時刻からの経過分
  end_minute: number, // カンファレンス開始時刻からの経過分
  hide_start?: boolean,
  hide_end?: boolean,
}

export type Category = {
  4684: string,
  4695: string,
  4683: string,
  4720: string,
  4685: string,
  4686: string,
  4689: string,
  4690: string,
  4687: string,
  4688: string,
}

export type Poster = {
  code: string,
  speakers: Speaker[],
  title: string,
  abstract: string,
}