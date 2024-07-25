import {getDictionary} from '@/dictionaries'
import LangButton from '@/components/elements/LangButton';
import Image from "next/image";

export default async function Header({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return (
    <header className="sticky z-40 border-b-2 border-secondary">
      <div className="mx-auto w-10/12 flex items-center justify-between gap-12">
        <div>
          <Image src={'/logo_header.svg'} alt={'logo'} width={201} height={43} className='py-6'/>
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
          <LangButton lang={lang}/>
        </div>
      </div>
    </header>
  );
}
