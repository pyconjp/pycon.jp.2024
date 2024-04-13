import { getDictionary } from '@/dictionaries'

import Link from 'next/link';
import LangButton from './LangButton';

export default async function Header({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return (
    <header className="sticky z-40 shadow-md">
      <div className="mx-auto h-12 w-11/12 flex items-center justify-between gap-10">
        <div className='bg-blue-300 px-8 py-2'>
          ロゴ
        </div>
        <div className='hidden lg:block flex-1'>
          <nav>
            <ul className="flex gap-4 flex-row justify-between">
              <li>
                {dictionary.menu.about}
              </li>
              <li>
                {dictionary.menu.events}
              </li>
              <li>
                {dictionary.menu.sponsor}
              </li>
              <li>
                {dictionary.menu.contents}
              </li>
              <li>
                {dictionary.menu.organizers}
              </li>
            </ul>
          </nav>
        </div>
        <div className='hidden lg:block'>
          <LangButton lang={lang} />
        </div>
      </div>
    </header>
  );
}
