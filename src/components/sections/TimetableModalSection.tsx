import {ArrowTopRightOnSquareIcon, XMarkIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Talk} from "@/types/Talk";
import {CalendarIcon, MapPinIcon} from "@heroicons/react/16/solid";
import {EVENT_START_DATETIME, TRACK_LIST} from "@/const/timetable";
import {addMinutes} from "date-fns";
import Image from "next/image";
import ImageWithFallback from "@/components/elements/ImageWithFallback";
import dynamic from "next/dynamic";
import {formatInTimeZone} from "date-fns-tz";

export default async function TimetableModalSection({lang, talk}: { lang: 'ja' | 'en', talk: Talk }) {
  const Description = dynamic(() => import(`@/cache/talks/description_${talk.code}.mdx`), {ssr: true});
  const Abstract = dynamic(() => import(`@/cache/talks/abstract_${talk.code}.mdx`), {ssr: true});
  const SpeakersBiographies = talk.speakers.map((speaker) => dynamic(() => import(`@/cache/speakers/biography_${speaker.code}.mdx`), {ssr: true}));

  return <div
    className='fixed flex justify-center z-50 w-screen h-screen bg-black bg-opacity-30 top-0 left-0 overscroll-contain overflow-y-scroll'>
    <div className='flex flex-col w-11/12 gap-10 items-center'>
      <div
        className='relative flex flex-col gap-8 bg-white h-5/6 mt-28 w-full p-4 overflow-y-scroll rounded lg:px-16 px-4 pb-12'>
        <div className='sticky w-full lg:top-6 top-4'>
          <div className='flex justify-end'>
            <Link href={`/${lang}/timetable/${talk.date}#${talk.code}`} className='block'>
              <button>
                <XMarkIcon className='w-10 h-10 fix'/>
              </button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-2xl font-bold'>{talk.title}</div>
          <div className='text-xl font-bold'>{talk.speakers.map(speaker => speaker.name).join(', ')}</div>
          <div className='flex lg:flex-row flex-col gap-2'>
            <div className='flex flex-row gap-1 items-center'>
              <CalendarIcon className='w-4 h-4'/>
              <div>
                {formatInTimeZone(addMinutes(new Date(EVENT_START_DATETIME[talk.date]), talk.start_minute), 'Asia/Tokyo', 'MM/dd HH:mm')} - {formatInTimeZone(addMinutes(new Date(EVENT_START_DATETIME[talk.date]), talk.end_minute), 'Asia/Tokyo', 'HH:mm')} (Asia/Tokyo)
              </div>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <MapPinIcon className='w-4 h-4'/>
              <div>{TRACK_LIST[talk.slot.room_id].name}</div>
            </div>
          </div>
        </div>
        <div
          className='border-l-2 border-l-primary pl-4 prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
          <Abstract/>
        </div>
        <hr className='border-t-2 border-secondary'/>
        <div className={'flex flex-col gap-8' + (talk.description ? '' : ' hidden')}>
          <div className='flex flex-row gap-4 items-center'>
            <Image src={'/headline_icon.svg'} alt={'description'} width={24} height={24} className='rounded'/>
            <div className='text-xl font-bold'>トーク詳細 / Description</div>
          </div>
          <div
            className='prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
            <Description/>
            <div className='flex gap-4'>
              {
                talk.resources.map((resource, index) => <Link key={index} href={resource.resource}
                                                              className='inline-flex gap-1 text-primary-500 items-center underline hover:opacity-80 w-auto'
                                                              target='_blank' rel='noopener noreferrer'>
                    <ArrowTopRightOnSquareIcon className='h-6 w-6'/>
                    <div>{resource.description}</div>
                  </Link>
                )
              }
            </div>
          </div>
          <hr className='border-t-2 border-secondary'/>
        </div>
        <div className='flex flex-col gap-4 shadow-lg'>
          {
            talk.speakers.map((speaker, index) => {
                const Biography = SpeakersBiographies[index];

                return <div key={index} className='p-4 flex gap-4 flex-row'>
                  <ImageWithFallback src={speaker.avatar || '/no_image.jpg'} alt={speaker.name} width={128} height={128}
                                     className='lg:w-32 lg:h-32 w-20 h-20'/>
                  <div className='flex flex-col gap-2'>
                    <div className='font-bold text-lg underline text-primary-500'>
                      {speaker.name}
                    </div>
                    <div
                      className='text-sm prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
                      <Biography/>
                    </div>
                  </div>
                </div>
              }
            )
          }
        </div>
      </div>
    </div>
    <div className='h-[calc(100vh_+_1px)] w-0.5 bg-transparent'/>
  </div>
}