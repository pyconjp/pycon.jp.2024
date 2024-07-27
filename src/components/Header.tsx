import {getDictionary} from '@/dictionaries'
import LangButton from '@/components/elements/LangButton';
import Image from "next/image";
import menu, {Menu} from "@/data/menu";
import HeaderMenu from "@/components/elements/HeaderMenu";
import Link from "next/link";
import MobileMenu from "@/components/elements/MobileMenu";

export default async function Header({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  const translatedMenu: Menu[] = menu.map((m) => ({
    title: dictionary.menu[m.title as keyof typeof dictionary.menu],
    children: m.children.map((c) => ({
      title: dictionary.menu[c.title as keyof typeof dictionary.menu],
      url: `/${lang}${c.url}`,
      isComingSoon: c.isComingSoon,
    }))
  }));

  return (
    <header className="sticky z-40 border-b-2 border-secondary top-0 bg-white">
      <div className="mx-auto w-11/12 lg:w-10/12 flex items-center justify-between gap-12">
        <div>
          <Link href={'/' + lang}>
            <Image src={'/logo_header.svg'} alt={'logo'} width={201} height={43} className='py-6'/>
          </Link>
        </div>
        <div className='hidden lg:block flex-1'>
          <nav>
            <ul className="flex flex-row justify-between mx-auto items-center">
              {
                translatedMenu.map((m, index) => (
                  <li className='flex-1' key={index}>
                    <HeaderMenu
                      menu={m}
                      comingSoon={dictionary.menu.coming_soon}
                    />
                  </li>
                ))
              }
            </ul>
          </nav>
        </div>
        <div className='hidden lg:block'>
          <LangButton lang={lang}/>
        </div>
        <div className='lg:hidden'>
          <MobileMenu menu={translatedMenu} lang={lang} comingSoon={dictionary.menu.coming_soon}/>
        </div>
      </div>
    </header>
  );
}
