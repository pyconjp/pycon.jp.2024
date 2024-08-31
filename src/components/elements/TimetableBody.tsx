import {Category, ConferenceEvent, SPEAK_LANG_LIST, Talk} from "@/types/Talk";
import {addMinutes, format} from "date-fns";
import Link from "next/link";
import {ClockIcon, TagIcon} from "@heroicons/react/16/solid";

const eventStartDateTime = {
  day1: '2024-09-27T10:00:00+09:00',
  day2: '2024-09-28T10:00:00+09:00',
}

const colList = {
  3086: 2,
  3418: 3,
  3419: 4,
  3420: 5,
}

export default async function TimetableBody({lang, date, talks, events, categories}: {
  lang: 'ja' | 'en',
  date: 'day1' | 'day2',
  talks: Talk[],
  events: ConferenceEvent[],
  categories: Category,
}) {
  const floor20 = talks.filter(talk => [3086, 3418].includes(talk.slot.room_id));
  const floor4 = talks.filter(talk => [3419, 3420].includes(talk.slot.room_id));

  const floor20StartMinutes = [...new Set([...floor20, ...events].filter(talk => !talk.hide_start).map(talk => talk.start_minute))];
  const floor4StartMinutes = [...new Set([...floor4, ...events].filter(talk => !talk.hide_start).map(talk => talk.start_minute))];

  const floor20EndMinutes = [...new Set([...floor20, ...events].filter(talk => !talk.hide_end).map(talk => talk.end_minute))];
  const floor4EndMinutes = [...new Set([...floor4, ...events].filter(talk => !talk.hide_end).map(talk => talk.end_minute))];

  const gridRow = {
    day1: 'lg:grid-rows-[40px_repeat(18,_10px)_repeat(6,_60px)_repeat(12,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(8,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(3,_60px)_repeat(1,_10px)_repeat(3,_60px)_repeat(27,_10px)]',
    day2: 'lg:grid-rows-[40px_repeat(4,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(12,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(8,_10px)_repeat(6,_60px)_repeat(4,_10px)_repeat(6,_60px)_repeat(2,_10px)_repeat(3,_60px)_repeat(3,_10px)_repeat(18,_10px)]',
  };

  return <div
    className={'w-11/12 lg:w-10/12 mx-auto mt-7 text-sm lg:grid lg:grid-cols-[100px_repeat(4,_1fr)_100px] ' + gridRow[date]}>
    {['20F Track1', '20F Track2', '4F Track3', '4F Track4'].map((track, index) => (
      <div key={index}
           className={`text-lg hidden lg:flex items-center justify-center bg-tertiary-500 text-white m-0.5 col-span-1 lg:col-start-[${index + 2}]`}>
        <div>{track}</div>
      </div>
    ))}

    {
      [...talks, ...events]
        .sort((a, b) => a.start_minute === b.start_minute ? a.slot.room_id - b.slot.room_id : a.start_minute - b.start_minute)
        .map((talk, index) =>
          talk.is_event
            ? <div key={index}
                   className={`text-primary-500 font-bold bg-white flex items-center justify-center m-0.5 p-2 lg:col-span-4 lg:col-start-2 lg:row-start-[${(talk.start_minute / 5) + 2}] lg:row-span-${(talk.end_minute - talk.start_minute) / 5}`}>
              <div>{talk.title}</div>
            </div>
            : <Link key={index} href={`/${lang}/talk/${talk.code}`}
                    className={`m-0.5 p-2 bg-white shadow lg:col-start-[${colList[talk.slot.room_id as keyof typeof colList]}] lg:row-start-[${(talk.start_minute / 5) + 2}] lg:row-span-${talk.duration / 5}`}>
              <div className='flex justify-between flex-col h-full'>
                <div className='text-ellipsis font-bold text-primary-500'>
                  {talk.title}
                </div>
                <div className='flex flex-col gap-2'>
                  <div className='font-medium'>
                    {talk.speakers.map(speaker => speaker.name).join(', ')}
                  </div>
                  <div className='text-xs'>
                    <TagIcon className='w-3 h-3 inline-flex'/> {categories[talk.track_id]}
                  </div>
                  <div className='flex flex-row gap-2'>
                    <div
                      className={`rounded-xl px-2 ${talk.question_answers.speak_language === 5542 ? 'text-white bg-primary-400' : 'text-black bg-secondary-400'}`}>
                      {talk.question_answers.speak_language && SPEAK_LANG_LIST[talk.question_answers.speak_language]}
                    </div>
                    <div className='flex flex-row gap-0.5 items-center text-xs'>
                      <ClockIcon className='w-3 h-3'/>
                      <div>{talk.duration}min</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
        )
    }

    {floor20StartMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-t-[1px] border-t-primary-500 col-start-1 col-span-1 lg:row-start-[${(minute / 5) + 2}]`}>
        <div className='absolute top-0 right-0 left-0'>
          {format(addMinutes(new Date(eventStartDateTime[date]), minute), 'HH:mm')}
        </div>
      </div>
    ))}

    {floor4StartMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-t-[1px] border-t-primary-500 col-start-6 col-span-1 lg:row-start-[${(minute / 5) + 2}]`}>
        <div className='absolute top-0 right-0 left-0'>
          {format(addMinutes(new Date(eventStartDateTime[date]), minute), 'HH:mm')}
        </div>
      </div>
    ))}

    {floor20EndMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-b-[1px] border-b-primary-500 col-start-1 col-span-1 lg:row-start-[${(minute / 5) + 1}]`}>
        <div className='absolute bottom-0 right-0 left-0'>
          {format(addMinutes(new Date(eventStartDateTime[date]), minute), 'HH:mm')}
        </div>
      </div>
    ))}

    {floor4EndMinutes.map((minute, index) => (
      <div key={index}
           className={`hidden lg:block text-center relative border-b-[1px] border-b-primary-500 col-start-6 col-span-1 lg:row-start-[${(minute / 5) + 1}]`}>
        <div className='absolute bottom-0 right-0 left-0'>
          {format(addMinutes(new Date(eventStartDateTime[date]), minute), 'HH:mm')}
        </div>
      </div>
    ))}
  </div>;
}