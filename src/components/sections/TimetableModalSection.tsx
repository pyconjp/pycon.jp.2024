import {XMarkIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Talk} from "@/types/Talk";
import {CalendarIcon, MapPinIcon} from "@heroicons/react/16/solid";
import {EVENT_START_DATETIME, TRACK_LIST} from "@/const/timetable";
import {addMinutes, format} from "date-fns";
import {MDXRemote} from 'next-mdx-remote/rsc'
import Image from "next/image";
import ImageWithFallback from "@/components/elements/ImageWithFallback";

export default async function TimetableModalSection({lang, talk}: { lang: 'ja' | 'en', talk: Talk }) {
  return <div
    className='fixed flex justify-center z-50 w-screen h-screen bg-black bg-opacity-30 top-0 left-0 overscroll-contain overflow-y-scroll'>
    <div className='flex flex-col w-11/12 gap-10 items-center'>
      <div
        className='relative flex flex-col gap-8 bg-white h-5/6 mt-28 w-full p-4 overflow-y-scroll rounded px-16 py-6'>
        <div className='sticky w-full lg:top-6 top-4'>
          <div className='flex justify-end'>
            <Link href={`/${lang}/timetable/${talk.date}`} className='block'>
              <button>
                <XMarkIcon className='w-10 h-10 fix'/>
              </button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='text-2xl font-bold'>{talk.title}</div>
          <div className='text-xl font-bold'>{talk.speakers.map(speaker => speaker.name).join(', ')}</div>
          <div className='flex flex-row gap-2'>
            <div className='flex flex-row gap-1 items-center'>
              <CalendarIcon className='w-4 h-4'/>
              <div>
                {format(addMinutes(new Date(EVENT_START_DATETIME[talk.date]), talk.start_minute), 'MM/dd HH:mm')} - {format(addMinutes(new Date(EVENT_START_DATETIME[talk.date]), talk.end_minute), 'HH:mm')} (Asia/Tokyo)
              </div>
            </div>
            <div className='flex flex-row gap-1 items-center'>
              <MapPinIcon className='w-4 h-4'/>
              <div>{TRACK_LIST[talk.slot.room_id].name}</div>
            </div>
          </div>
        </div>
        <div className='border-l-2 border-l-primary pl-4 prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
          <MDXRemote source={talk.abstract}/>
        </div>
        <div>
          {/* TODO 動画とスライドのリンク */}
        </div>
        <hr className='border-t-2 border-secondary'/>
        <div className='flex flex-row gap-4 items-center'>
          <Image src={'/headline_icon.svg'} alt={'description'} width={24} height={24} className='rounded'/>
          <div className='text-xl font-bold'>トーク詳細 / Description</div>
        </div>
        <div className='prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
          <MDXRemote source={talk.description}/>
        </div>
        <hr className='border-t-2 border-secondary'/>
        <div className='flex flex-col gap-4 shadow-lg'>
          {talk.speakers.map((speaker, index) => (
              <div key={index} className='p-4 flex gap-4 flex-row'>
                <ImageWithFallback src={speaker.avatar || '/no_image.jpg'} alt={speaker.name} width={128} height={128}
                                   className='lg:w-32 lg:h-32 w-20 h-20'/>
                <div className='flex flex-col gap-2'>
                  <div className='font-bold text-lg underline text-primary-500'>
                    {speaker.name}
                  </div>
                  <div className='text-sm prose prose-pre:bg-primary-50 prose-pre:rounded-none prose-pre:text-black max-w-full prose-li:marker:text-primary-500'>
                    <MDXRemote source={speaker.biography || ''}/>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
    <div className='h-[calc(100vh_+_1px)] w-0.5 bg-transparent'/>
  </div>
}