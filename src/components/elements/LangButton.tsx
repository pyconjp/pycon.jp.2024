"use client"

import {usePathname} from 'next/navigation'
import Link from 'next/link';
import {GlobeAltIcon} from "@heroicons/react/20/solid";

export default function LangButton({lang}: { lang: 'ja' | 'en' }) {
  const pathname = usePathname()

  return <div className='py-2 px-3 bg-primary-500 text-white flex flex-row gap-3 items-center'>
    <GlobeAltIcon className='h-6 w-6'/>
    <div>
      {
        lang !== "ja"
          ? <>
            EN
            {" / "}
            <Link href={pathname.replace(/^\/en/g, '/ja')} className="hover:opacity-80">
              <span className='underline'>日本語</span>
            </Link>
          </>
          : <>
            <Link href={pathname.replace(/^\/ja/g, '/en')} className="hover:opacity-80">
              <span className='underline'>EN</span>
            </Link>
            {" / "}
            日本語
          </>
      }
    </div>
  </div>
}