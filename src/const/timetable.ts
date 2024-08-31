import {Talk} from "@/types/Talk";

export const EVENT_START_DATETIME = {
  day1: '2024-09-27T10:00:00+09:00',
  day2: '2024-09-28T10:00:00+09:00',
}

export const TRACK_LIST: { [k: Talk['slot']['room_id']]: { name: string, col: number } } = {
  3086: {name: '20F Track1', col: 2},
  3418: {name: '20F Track2', col: 3},
  3419: {name: '4F Track3', col: 4},
  3420: {name: '4F Track4', col: 5},
}

export const LEVEL_LIST: { [k: Exclude<Talk['question_answers']['level'], undefined>]: string } = {
  5539: 'beginner',
  5540: 'intermediate',
  5541: 'advanced'
};

export const SPEAK_LANG_LIST: {
  [k: Exclude<Talk['question_answers']['speak_language'], undefined>]: string
} = {5542: '日本語', 5543: 'EN'};

export const SLIDE_LANG_LIST: {
  [k: Exclude<Talk['question_answers']['slide_language'], undefined>]: string
} = {5544: '日本語', 5545: 'EN'};