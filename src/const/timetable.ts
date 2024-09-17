import {ConferenceEvent, Talk} from "@/types/Talk";

export const EVENT_START_DATETIME = {
  day1: '2024-09-27T10:00:00+09:00',
  day2: '2024-09-28T10:00:00+09:00',
}

export const TRACK_LIST: { [k: Talk['slot']['room_id']]: { name: string, class: string } } = {
  3086: {name: '20F #pyconjp_1', class: 'lg:col-start-[2] lg:col-span-1'},
  3418: {name: '20F #pyconjp_2', class: 'lg:col-start-[3] lg:col-span-1'},
  3419: {name: '4F #pyconjp_3', class: 'lg:col-start-[4] lg:col-span-1'},
  3420: {name: '4F #pyconjp_4', class: 'lg:col-start-[5] lg:col-span-1'},
}

export const EVENT_TRACK_LIST: { [k: ConferenceEvent['slot']['room_id']]: { name: string, class: string } } = ({
  ...TRACK_LIST,
  1: {name: '20F, 4F Track 1~4', class: 'lg:col-start-[2] lg:col-span-4'},
  2: {name: '20F Track 1~2', class: 'lg:col-start-[2] lg:col-span-2'},
  3: {name: '20F, 4F Track 3~4', class: 'lg:col-start-[3] lg:col-span-3'}
})

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