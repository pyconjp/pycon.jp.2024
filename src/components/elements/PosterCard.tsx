import {Poster} from "@/types/Talk";
import dynamic from "next/dynamic";
import {MapPinIcon} from "@heroicons/react/16/solid";
import {locations} from "@/data/posters";

export default async function PosterCard({poster}: { poster: Poster }) {
  const Abstract = dynamic(() => import(`@/cache/posters/abstract_${poster.code}.mdx`), {ssr: true});

  return <div className='bg-white shadow px-[1.125rem] py-8'>
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='font-medium inline-flex items-center gap-0.5'><MapPinIcon
          className='w-5 h-5'/>{locations[poster.code]}</div>
        <div className='font-bold text-2xl text-primary-500'>{poster.title}</div>
        <div className='font-bold text-lg'>{poster.speakers.map(speaker => speaker.name).join(', ')}</div>
      </div>
      <div className='prose max-w-full prose-li:marker:text-primary-500'>
        <Abstract/>
      </div>
    </div>
  </div>
}