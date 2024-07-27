'use client';

import {useState} from "react";
import {ArrowRightIcon, Bars3Icon, ChevronRightIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {Menu} from "@/data/menu";
import LangButton from "@/components/elements/LangButton";
import Link from "next/link";

type Props = {
  menu: Menu[],
  lang: 'ja' | 'en',
  comingSoon: string,
}

export default function MobileMenu({menu, lang, comingSoon}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      {isOpen
        ? <>
          <div
            className='fixed flex justify-center z-30 w-screen h-screen bg-white top-0 left-0 overscroll-contain overflow-y-scroll'>
            <button className='fixed top-5 right-4 p-2 bg-primary-500 rounded-tr-2xl rounded-bl-2xl'
                    onClick={close}>
              <XMarkIcon className='w-10 h-10 text-secondary-500 fix'/>
            </button>
            <div className='flex flex-col w-11/12 gap-10 items-center'>
              <div className='flex flex-col gap-4 bg-primary-50 h-4/6 mt-28 w-full p-4 overflow-y-scroll'>
                {
                  menu.map((m, index) =>
                    <div key={index} className='flex flex-col gap-2'>
                      <div className='text-primary-500 font-bold text-lg'>{m.title}</div>
                      <div className='flex flex-col gap-3 text-primary-500'>
                        {
                          m.children.map(({title, url, isComingSoon}, index) =>
                            <div key={index} className='flex flex-row items-center'>
                              {
                                !isComingSoon
                                  ? <>
                                    <ChevronRightIcon className='h-5 w-5 mr-3'/>
                                    <Link href={url} onClick={close}>{title}</Link>
                                  </>
                                  : <>
                                    <ChevronRightIcon className='h-5 w-5 mr-3 text-primary-300'/>
                                    <div className='text-primary-300'>{title} <span className='text-sm'>{' ' + comingSoon}</span></div>
                                  </>
                              }
                            </div>
                          )
                        }
                      </div>
                    </div>
                  )
                }
              </div>
              <LangButton lang={lang}/>
            </div>
            <div className='h-[calc(100vh_+_1px)] w-0.5 bg-transparent'/>
          </div>
        </>
        : <button className='p-2 bg-primary-500 rounded-tr-2xl rounded-bl-2xl' onClick={open}>
          <Bars3Icon className='w-10 h-10 text-secondary-500'/>
        </button>
      }
    </>
  );
}