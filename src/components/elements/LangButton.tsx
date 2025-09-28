"use client"

import {useRouter} from 'next/router'
import Link from 'next/link';
import {GlobeAltIcon} from "@heroicons/react/20/solid";

export default function LangButton({lang}: { lang: 'ja' | 'en' }) {
  const router = useRouter()
  const pathname = router.pathname
  const query = router.query

  // Build the alternate language path
  const getAltLangPath = (targetLang: 'ja' | 'en') => {
    const newQuery = {...query, lang: targetLang}
    return {pathname, query: newQuery}
  }

  return <div className='py-2 px-3 bg-primary-500 text-white flex flex-row gap-3 items-center'>
    <GlobeAltIcon className='h-6 w-6'/>
    <div>
      {
        lang !== "ja"
          ? <>
            EN
            {" / "}
            <Link href={getAltLangPath('ja')} className="hover:opacity-80">
              <span className='underline'>日本語</span>
            </Link>
          </>
          : <>
            <Link href={getAltLangPath('en')} className="hover:opacity-80">
              <span className='underline'>EN</span>
            </Link>
            {" / "}
            日本語
          </>
      }
    </div>
  </div>
}