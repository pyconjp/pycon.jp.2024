"use client"

import {usePathname} from 'next/navigation'
import Link from 'next/link';

export default function LangButton({lang}: { lang: 'ja' | 'en' }) {
  const pathname = usePathname()

  return <>
    {
      lang !== "ja"
        ? <>
          EN
          {" / "}
          <Link href={pathname.replace(/^\/en/g, '/ja')}>
            <span className='text-blue-400'>日本語</span>
          </Link>
        </>
        : <>
          <Link href={pathname.replace(/^\/ja/g, '/en')}>
            <span className='text-blue-400'>EN</span>
          </Link>
          {" / "}
          日本語
        </>
    }
  </>
}