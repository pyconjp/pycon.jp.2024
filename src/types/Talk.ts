export type OriginalSpeaker = Speaker & {
  email: string,
}

export type OriginalTalk = Omit<Talk, 'question_answers'> & {
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
  track_id: number,
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
    level?: keyof typeof LEVEL_LIST,
    speak_language?: keyof typeof SPEAK_LANG_LIST,
    slide_language?: keyof typeof SLIDE_LANG_LIST,
    photo_agree?: boolean,
    video_agree?: boolean,
  },
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
  options: [{ id: keyof T, answer: string, 'ja-jp': string }],
}

export const LEVEL_LIST = {5539: 'beginner', 5540: 'intermediate', 5541: 'advanced'};
export const SPEAK_LANG_LIST = {5542: 'ja', 5543: 'en'};
export const SLIDE_LANG_LIST = {5544: 'ja', 5545: 'en'};