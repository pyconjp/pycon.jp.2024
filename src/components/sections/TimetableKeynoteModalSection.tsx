import {XMarkIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Keynote} from "@/types/Talk";
import {CalendarIcon, MapPinIcon} from "@heroicons/react/16/solid";
import {EVENT_START_DATETIME, EVENT_TRACK_LIST} from "@/const/timetable";
import {addMinutes} from "date-fns";
import ImageWithFallback from "@/components/elements/ImageWithFallback";
import dynamic from "next/dynamic";
import {formatInTimeZone} from "date-fns-tz";

export default async function TimetableKeynoteModalSection({lang, keynote, speaker}: {
  lang: 'ja' | 'en',
  keynote: Keynote,
  speaker: string
}) {
  const SpeakersBiography = dynamic(() => import(`@/components/markdown/${keynote.code}_${lang}.mdx`), {ssr: true});

  return <div
    className='fixed flex justify-center z-50 w-screen h-screen bg-black bg-opacity-30 top-0 left-0 overscroll-contain overflow-y-scroll'>
    <div className='flex flex-col w-11/12 gap-10 items-center'>
      <div
        className='relative flex flex-col gap-8 bg-white mt-28 w-full p-4 overflow-y-scroll rounded lg:px-16 px-4 pb-12'>
        <div className='sticky w-full lg:top-6 top-4'>
          <div className='flex justify-end'>
            <Link href={`/${lang}/timetable/${keynote.date}#${keynote.code}`} className='block'>
              <button>
                <XMarkIcon className='w-10 h-10 fix'/>
              </button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-2xl font-bold'>{`Keynote (${speaker})`}</div>
          <div className='text-xl font-bold'>{speaker}</div>
          <div className='flex lg:flex-row flex-col gap-2'>
            <div className='flex flex-row gap-1 items-center'>
              <CalendarIcon className='w-4 h-4'/>
              <div>
                {formatInTimeZone(addMinutes(new Date(EVENT_START_DATETIME[keynote.date]), keynote.start_minute), 'Asia/Tokyo', 'MM/dd HH:mm')} - {formatInTimeZone(addMinutes(new Date(EVENT_START_DATETIME[keynote.date]), keynote.end_minute), 'Asia/Tokyo', 'HH:mm')} (Asia/Tokyo)
              </div>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <MapPinIcon className='w-4 h-4'/>
              <div>{EVENT_TRACK_LIST[keynote.slot.room_id].name}</div>
            </div>
          </div>
        </div>
        <hr className='border-t-2 border-secondary'/>
        <div className='flex flex-col gap-4 shadow-lg'>
          <div className='p-4 flex gap-4 flex-row'>
            <ImageWithFallback src={`/conference/${keynote.code}.png` || '/no_image.jpg'}
                               alt={speaker} width={128} height={128} className='lg:w-32 lg:h-32 w-20 h-20'/>
            <div className='flex flex-col gap-2'>
              <div className='font-bold text-lg underline text-primary-500'>
                {speaker}
              </div>
              <div
                className='text-sm prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
                <SpeakersBiography/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='h-[calc(100vh_+_1px)] w-0.5 bg-transparent'/>
  </div>
}