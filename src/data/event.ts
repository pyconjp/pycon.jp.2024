import {ConferenceEvent} from '@/types/Talk';
import {boolean} from "property-information/lib/util/types";

export const events: ConferenceEvent[] = [
  {
    code: 'opening1',
    speakers: [],
    slot: {
      room_id: 0,
      start: '2024-09-27T10:00:00+09:00',
      end: '2024-09-27T10:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
  },
  {
    code: 'keynote1',
    speakers: [],
    slot: {
      room_id: 0,
      start: '2024-09-27T10:30:00+09:00',
      end: '2024-09-27T11:20:00+09:00',
    },
    date: 'day1',
    is_event: true,
  },
  {
    code: 'lunch1',
    speakers: [],
    slot: {
      room_id: 0,
      start: '2024-09-27T12:00:00+09:00',
      end: '2024-09-27T13:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
  },
  {
    code: 'coffee_break1',
    speakers: [],
    slot: {
      room_id: 0,
      start: '2024-09-27T15:00:00+09:00',
      end: '2024-09-27T15:50:00+09:00',
    },
    date: 'day1',
    is_event: true,
  },
  {
    code: 'lt1',
    speakers: [],
    slot: {
      room_id: 0,
      start: '2024-09-27T17:30:00+09:00',
      end: '2024-09-27T18:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
  },
  {
    code: 'party',
    speakers: [],
    slot: {
      room_id: 0,
      start: '2024-09-27T18:30:00+09:00',
      end: '2024-09-27T20:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_end: true,
  },
];