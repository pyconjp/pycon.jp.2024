import {getDictionary} from '@/lib/dictionaries'
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import {MapPinIcon} from "@heroicons/react/24/outline";

export default async function HeroSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className='w-full lg:my-20 my-7'>
    <div className='flex lg:flex-row flex-col mx-auto justify-center items-center lg:gap-20 gap-12'>
      <div className='lg:w-auto w-8/12'>
        <Image src={'/logo_main.svg'} alt={'main logo'} width={327} height={426}/>
      </div>
      <div className='flex flex-col gap-8 lg:gap-20 items-center'>
        <div className='flex flex-col font-manrope gap-5'>
          <div className='flex lg:items-end items-center lg:flex-row flex-col text-primary gap-3 lg:gap-0'>
            <div className='text-4xl font-bold'>
              2024
            </div>
            <div className='flex flex-row items-end gap-2.5'>
              <div className='flex flex-row gap-0.5 items-end'>
                <div className='text-[64px] leading-none'>
                  9.27
                </div>
                <div className='border-primary-500 border-solid text-[22px] leading-none border-2 p-2 rounded-lg'>
                  FRI
                </div>
              </div>
              <div className='flex flex-row gap-0.5 items-end'>
                <div className='text-[64px] leading-none'>
                  -29
                </div>
                <div className='border-primary-500 border-solid text-[22px] leading-none border-2 p-2 rounded-lg'>
                  SUN
                </div>
              </div>
            </div>
          </div>
          <div className='lg:inline-flex lg:items-center w-11/12 lg:w-auto mx-auto lg:mx-0'>
            <div className='inline-flex items-center'>
              <MapPinIcon className='h-6 w-6 text-primary-500'/>
              <span className='text-primary mr-2.5 text-xl font-noto'>{dictionary.hero.location}</span>
            </div>
            <Link href='https://toc-ariake.jp/access.html' className='inline-flex items-center text-tertiary underline ml-6 lg:ml-0'
                  target='_blank' rel="noopener noreferrer">
              {dictionary.menu.venue}<ArrowTopRightOnSquareIcon className='h-5 w-5'/>
            </Link>
          </div>
        </div>
        <Link href='https://pyconjp.connpass.com/event/324211/' target='_blank' rel="noopener noreferrer"
              className='lg:w-auto w-11/12 relative before:bg-secondary before:absolute before:w-full before:h-full before:-z-10 before:top-2.5 before:rounded-tr-3xl before:rounded-bl-3xl before:rounded-tl before:rounded-br'>
          <div
            className='bg-primary-500 text-white font-bold text-2xl py-5 lg:w-80 text-center rounded-tr-3xl rounded-bl-3xl rounded-tl rounded-br'>
            {dictionary.hero.ticket}
          </div>
        </Link>
      </div>
    </div>
  </section>
}
