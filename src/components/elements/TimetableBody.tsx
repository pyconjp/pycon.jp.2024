import {Category, ConferenceEvent, Talk} from "@/types/Talk";
import {addMinutes, parseISO} from "date-fns";
import Link from "next/link";
import {ClockIcon, MapPinIcon, TagIcon} from "@heroicons/react/16/solid";
import {EVENT_START_DATETIME, EVENT_TRACK_LIST, SPEAK_LANG_LIST, TRACK_LIST} from "@/const/timetable";
import {formatInTimeZone} from "date-fns-tz";

export default async function TimetableBody({lang, date, talks, events, categories, keynoteSpeaker}: {
  lang: 'ja' | 'en',
  date: 'day1' | 'day2',
  talks: Talk[],
  events: ConferenceEvent[],
  categories: Category,
  keynoteSpeaker: { keynote_day1: string, keynote_day2: string },
}) {
  const floor20 = [...talks, ...events].filter(talk => [3086, 3418, 1, 2].includes(talk.slot.room_id));
  const floor4 = [...talks, ...events].filter(talk => [3419, 3420, 1, 4].includes(talk.slot.room_id));

  const floor20StartMinutes = [...new Set(floor20.filter(talk => !talk.hide_start).map(talk => talk.start_minute))];
  const floor4StartMinutes = [...new Set(floor4.filter(talk => !talk.hide_start).map(talk => talk.start_minute))];
  const floor20EndMinutes = [...new Set(floor20.filter(talk => !talk.hide_end).map(talk => talk.end_minute))];
  const floor4EndMinutes = [...new Set(floor4.filter(talk => !talk.hide_end).map(talk => talk.end_minute))];

  const gridRow = {
    day1: 'lg:grid-rows-[40px_repeat(18,_10px)_repeat(6,_60px)_repeat(12,_15px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(8,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(3,_60px)_repeat(1,_10px)_repeat(3,_60px)_repeat(11,_10px)_repeat(2,_25px)_repeat(14,_10px)]',
    day2: 'lg:grid-rows-[40px_repeat(4,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(12,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(8,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(2,_10px)_repeat(3,_60px)_repeat(14,_10px)_repeat(7,_20px)]',
  };

  let previousStartMinute: number | null = null;

  return <div
    className={'w-11/12 lg:w-10/12 mx-auto mt-7 text-sm lg:grid lg:grid-cols-[100px_repeat(4,_1fr)_100px] ' + gridRow[date]}>
    {
      Object.keys(TRACK_LIST)
        .map((key) => TRACK_LIST[Number(key) as keyof typeof TRACK_LIST].name)
        .map((track, index) => (
          <div key={index}
               className={`text-lg hidden lg:flex items-center justify-center bg-tertiary-500 text-white m-0.5 col-span-1 lg:col-start-[${index + 2}]`}>
            <div>{track}</div>
          </div>
        ))
    }
    {
      [...talks, ...events]
        .sort((a, b) => a.start_minute === b.start_minute ? a.slot.room_id - b.slot.room_id : a.start_minute - b.start_minute)
        .map((talk, index) => {
            let displayTime = false;
            if (previousStartMinute !== talk.start_minute) {
              displayTime = true;
              previousStartMinute = talk.start_minute;
            }

            return <>
              {
                displayTime && !talk.hide_start &&
                <div className='lg:hidden my-2 font-medium'>
                  {formatInTimeZone(addMinutes(parseISO(EVENT_START_DATETIME[date]), talk.start_minute), 'Asia/Tokyo', 'HH:mm')}
                </div>
              }
              {
                talk.is_event
                  ? (
                    talk.is_keynote
                      ? <Link key={index} id={talk.code} href={`/${lang}/keynote/${talk.code}`}
                              className={`scroll-mt-32 lg:text-base text-primary-500 bg-white flex items-center justify-center text-center flex-col gap-1 my-2 mx-0.5 lg:my-0.5 px-2 py-4 ${EVENT_TRACK_LIST[talk.slot.room_id].class} lg:row-start-[${(talk.start_minute / 5) + 2}] lg:row-span-${(talk.end_minute - talk.start_minute) / 5}`}>
                        <div className='font-bold'>{`Keynote (${keynoteSpeaker[talk.code]})`}</div>
                        <div className='flex lg:hidden flex-row gap-0.5 items-center text-xs'>
                          <MapPinIcon className='w-3 h-3'/>
                          <div>{EVENT_TRACK_LIST[talk.slot.room_id].name}</div>
                        </div>
                      </Link>
                      : <div key={index}
                             className={`lg:text-base bg-secondary-50 flex items-center justify-center text-center flex-col gap-1 my-2 mx-0.5 lg:my-0.5 px-2 py-4 ${EVENT_TRACK_LIST[talk.slot.room_id].class} lg:row-start-[${(talk.start_minute / 5) + 2}] lg:row-span-${(talk.end_minute - talk.start_minute) / 5}`}>
                        <div className='font-bold'>{talk.title}</div>
                        <div className='flex lg:hidden flex-row gap-0.5 items-center text-xs'>
                          <MapPinIcon className='w-3 h-3'/>
                          <div>{EVENT_TRACK_LIST[talk.slot.room_id].name}</div>
                        </div>
                      </div>
                  )
                  : <Link key={index} id={talk.code} href={`/${lang}/talk/${talk.code}`}
                          className={`scroll-mt-32 block my-2 mx-0.5 lg:my-0.5 ${TRACK_LIST[talk.slot.room_id].class} lg:row-start-[${(talk.start_minute / 5) + 2}] lg:row-span-${talk.duration / 5}`}>
                    <div className='flex shadow flex-row h-full'>
                      <div className='flex items-center justify-center flex-col lg:hidden w-20 bg-primary-500 text-white'>
                        <div>
                          {formatInTimeZone(addMinutes(parseISO(EVENT_START_DATETIME[date]), talk.start_minute), 'Asia/Tokyo', 'HH:mm')}
                        </div>
                        <div>
                          {talk.duration}min
                        </div>
                      </div>
                      <div className='flex justify-between flex-col bg-white flex-1 p-2'>
                        <div className='text-ellipsis font-bold text-primary-500'>
                          {talk.title}
                        </div>
                        <div className='flex flex-col gap-2'>
                          <div className='font-medium'>
                            {talk.speakers.map(speaker => speaker.name).join(', ')}
                          </div>
                          <div className={'text-xs' + (talk.track_id ? '' : ' hidden')}>
                            <TagIcon className='w-3 h-3 inline-flex'/> {categories[talk.track_id]}
                          </div>
                          <div className='flex flex-row gap-2'>
                            <div
                              className={`rounded-xl px-2 ${talk.question_answers.speak_language === 5542 ? 'text-white bg-primary-400' : 'text-black bg-secondary-400'}`}>
                              {talk.question_answers.speak_language && SPEAK_LANG_LIST[talk.question_answers.speak_language]}
                            </div>
                            <div className='hidden lg:flex flex-row gap-0.5 items-center text-xs'>
                              <ClockIcon className='w-3 h-3'/>
                              <div>{talk.duration}min</div>
                            </div>
                            <div className='flex lg:hidden flex-row gap-0.5 items-center text-xs'>
                              <MapPinIcon className='w-3 h-3'/>
                              <div>{TRACK_LIST[talk.slot.room_id].name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
              }
            </>
          }
        )
    }

    {floor20StartMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-t-[1px] border-t-primary-500 col-start-1 col-span-1 lg:row-start-[${(minute / 5) + 2}]`}>
        <div className='absolute top-0 right-0 left-0 font-medium'>
          {formatInTimeZone(addMinutes(parseISO(EVENT_START_DATETIME[date]), minute), 'Asia/Tokyo', 'HH:mm')}
        </div>
      </div>
    ))}

    {floor4StartMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-t-[1px] border-t-primary-500 col-start-6 col-span-1 lg:row-start-[${(minute / 5) + 2}]`}>
        <div className='absolute top-0 right-0 left-0 font-medium'>
          {formatInTimeZone(addMinutes(parseISO(EVENT_START_DATETIME[date]), minute), 'Asia/Tokyo', 'HH:mm')}
        </div>
      </div>
    ))}

    {floor20EndMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-b-[1px] border-b-primary-500 col-start-1 col-span-1 lg:row-start-[${(minute / 5) + 1}]`}>
        <div className='absolute bottom-0 right-0 left-0 font-medium'>
          {formatInTimeZone(addMinutes(parseISO(EVENT_START_DATETIME[date]), minute), 'Asia/Tokyo', 'HH:mm')}
        </div>
      </div>
    ))}

    {floor4EndMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-b-[1px] border-b-primary-500 col-start-6 col-span-1 lg:row-start-[${(minute / 5) + 1}]`}>
        <div className='absolute bottom-0 right-0 left-0 font-medium'>
          {formatInTimeZone(addMinutes(parseISO(EVENT_START_DATETIME[date]), minute), 'Asia/Tokyo', 'HH:mm')}
        </div>
      </div>
    ))}
  </div>;
}