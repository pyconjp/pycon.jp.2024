import {ConferenceEvent} from '@/types/Talk';

export const conferenceEvents: ConferenceEvent[] = [
  {
    code: 'opening1',
    speakers: [],
    title: 'Opening',
    slot: {
      room_id: 2,
      start: '2024-09-27T10:00:00+09:00',
      end: '2024-09-27T10:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_end: true,
    start_minute: 0,
    end_minute: 30,
  },
  {
    code: 'opening1_relay1',
    speakers: [],
    title: 'Opening Relay',
    slot: {
      room_id: 3419,
      start: '2024-09-27T10:00:00+09:00',
      end: '2024-09-27T10:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_end: true,
    start_minute: 0,
    end_minute: 30,
  },
  {
    code: 'opening1_relay2',
    speakers: [],
    title: 'Opening Relay',
    slot: {
      room_id: 3420,
      start: '2024-09-27T10:00:00+09:00',
      end: '2024-09-27T10:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_end: true,
    start_minute: 0,
    end_minute: 30,
  },
  {
    code: 'keynote1',
    speakers: [],
    title: 'Keynote (James Powell)',
    slot: {
      room_id: 2,
      start: '2024-09-27T10:30:00+09:00',
      end: '2024-09-27T11:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_start: true,
    start_minute: 30,
    end_minute: 90,
  },
  {
    code: 'keynote1_relay1',
    speakers: [],
    title: 'Keynote Relay',
    slot: {
      room_id: 3419,
      start: '2024-09-27T10:30:00+09:00',
      end: '2024-09-27T11:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_start: true,
    start_minute: 30,
    end_minute: 90,
  },
  {
    code: 'keynote1_relay2',
    speakers: [],
    title: 'Keynote Relay',
    slot: {
      room_id: 3420,
      start: '2024-09-27T10:30:00+09:00',
      end: '2024-09-27T11:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_start: true,
    start_minute: 30,
    end_minute: 90,
  },
  {
    code: 'association_meeting',
    speakers: [],
    title: 'PyCon JP Association Meeting',
    slot: {
      room_id: 3086,
      start: '2024-09-27T12:00:00+09:00',
      end: '2024-09-27T12:45:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 120,
    end_minute: 165,
  },
  {
    code: 'lunch1_1',
    speakers: [],
    title: 'Lunch Break',
    slot: {
      room_id: 3086,
      start: '2024-09-27T12:45:00+09:00',
      end: '2024-09-27T13:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_start: true,
    start_minute: 165,
    end_minute: 180,
  },
  {
    code: 'lunch1_2',
    speakers: [],
    title: 'Lunch Break',
    slot: {
      room_id: 3,
      start: '2024-09-27T12:00:00+09:00',
      end: '2024-09-27T13:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 120,
    end_minute: 180,
  },
  {
    code: 'coffee_break1',
    speakers: [],
    title: 'Coffee Break',
    slot: {
      room_id: 1,
      start: '2024-09-27T15:10:00+09:00',
      end: '2024-09-27T15:50:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 310,
    end_minute: 350,
  },
  {
    code: 'lt1',
    speakers: [],
    title: 'Lightning Talks',
    slot: {
      room_id: 3086,
      start: '2024-09-27T17:30:00+09:00',
      end: '2024-09-27T18:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 450,
    end_minute: 480,
  },
  {
    code: 'lt1_relay1',
    speakers: [],
    title: 'Lightning Talks Relay',
    slot: {
      room_id: 3418,
      start: '2024-09-27T17:30:00+09:00',
      end: '2024-09-27T18:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 450,
    end_minute: 480,
  },
  {
    code: 'lt1_relay2',
    speakers: [],
    title: 'Lightning Talks Relay',
    slot: {
      room_id: 3419,
      start: '2024-09-27T17:30:00+09:00',
      end: '2024-09-27T18:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 450,
    end_minute: 480,
  },
  {
    code: 'lt1_relay3',
    speakers: [],
    title: 'Lightning Talks Relay',
    slot: {
      room_id: 3420,
      start: '2024-09-27T17:30:00+09:00',
      end: '2024-09-27T18:00:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 450,
    end_minute: 480,
  },
  {
    code: 'closing1',
    speakers: [],
    title: 'Closing',
    slot: {
      room_id: 3086,
      start: '2024-09-27T18:00:00+09:00',
      end: '2024-09-27T18:10:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 480,
    end_minute: 490,
  },
  {
    code: 'closing1_relay1',
    speakers: [],
    title: 'Closing Relay',
    slot: {
      room_id: 3418,
      start: '2024-09-27T18:00:00+09:00',
      end: '2024-09-27T18:10:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 480,
    end_minute: 490,
  },
  {
    code: 'closing1_relay1',
    speakers: [],
    title: 'Closing Relay',
    slot: {
      room_id: 3419,
      start: '2024-09-27T18:00:00+09:00',
      end: '2024-09-27T18:10:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 480,
    end_minute: 490,
  },
  {
    code: 'closing1_relay1',
    speakers: [],
    title: 'Closing Relay',
    slot: {
      room_id: 3420,
      start: '2024-09-27T18:00:00+09:00',
      end: '2024-09-27T18:10:00+09:00',
    },
    date: 'day1',
    is_event: true,
    start_minute: 480,
    end_minute: 490,
  },
  {
    code: 'party',
    speakers: [],
    title: 'Party',
    slot: {
      room_id: 1,
      start: '2024-09-27T18:30:00+09:00',
      end: '2024-09-27T19:30:00+09:00',
    },
    date: 'day1',
    is_event: true,
    hide_end: true,
    start_minute: 510,
    end_minute: 570,
  },
  {
    code: 'opening2',
    speakers: [],
    title: 'Opening',
    slot: {
      room_id: 3086,
      start: '2024-09-28T10:00:00+09:00',
      end: '2024-09-28T10:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 0,
    end_minute: 20,
  },
  {
    code: 'opening2_relay1',
    speakers: [],
    title: 'Opening Relay',
    slot: {
      room_id: 3418,
      start: '2024-09-28T10:00:00+09:00',
      end: '2024-09-28T10:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 0,
    end_minute: 20,
  },
  {
    code: 'opening2_relay2',
    speakers: [],
    title: 'Opening Relay',
    slot: {
      room_id: 3419,
      start: '2024-09-28T10:00:00+09:00',
      end: '2024-09-28T10:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 0,
    end_minute: 20,
  },
  {
    code: 'opening2_relay3',
    speakers: [],
    title: 'Opening Relay',
    slot: {
      room_id: 3420,
      start: '2024-09-28T10:00:00+09:00',
      end: '2024-09-28T10:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 0,
    end_minute: 20,
  },
  {
    code: 'lunch2',
    speakers: [],
    title: 'Lunch Break',
    slot: {
      room_id: 1,
      start: '2024-09-28T11:40:00+09:00',
      end: '2024-09-28T12:40:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 100,
    end_minute: 160,
  },
  {
    code: 'coffee_break2',
    speakers: [],
    title: 'Coffee Break',
    slot: {
      room_id: 1,
      start: '2024-09-28T14:50:00+09:00',
      end: '2024-09-28T15:30:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 290,
    end_minute: 330,
  },
  {
    code: 'keynote2',
    speakers: [],
    title: 'Keynote (Atsuo Ishimoto)',
    slot: {
      room_id: 2,
      start: '2024-09-28T17:30:00+09:00',
      end: '2024-09-28T18:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 450,
    end_minute: 500,
  },
  {
    code: 'keynote2_relay1',
    speakers: [],
    title: 'Keynote Relay',
    slot: {
      room_id: 3419,
      start: '2024-09-28T17:30:00+09:00',
      end: '2024-09-28T18:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 450,
    end_minute: 500,
  },
  {
    code: 'keynote2_relay2',
    speakers: [],
    title: 'Keynote Relay',
    slot: {
      room_id: 3420,
      start: '2024-09-28T17:30:00+09:00',
      end: '2024-09-28T18:20:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 450,
    end_minute: 500,
  },
  {
    code: 'pyconjp_association',
    speakers: [],
    title: 'PyCon JP Association',
    slot: {
      room_id: 2,
      start: '2024-09-28T18:20:00+09:00',
      end: '2024-09-28T18:40:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 500,
    end_minute: 520,
  },
  {
    code: 'closing2',
    speakers: [],
    title: 'Closing',
    slot: {
      room_id: 2,
      start: '2024-09-28T18:40:00+09:00',
      end: '2024-09-28T19:00:00+09:00',
    },
    date: 'day2',
    is_event: true,
    start_minute: 520,
    end_minute: 540,
  }
];