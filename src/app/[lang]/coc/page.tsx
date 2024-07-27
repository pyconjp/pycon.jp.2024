import PageTitle from "@/components/elements/PageTitle";
import {getDictionary} from "@/dictionaries";
import Image from "next/image";
import CocSection from "@/components/sections/CocSection";

export const runtime = 'edge';

export default async function CoC({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main>
      <PageTitle title={'Code of Conduct'} subTitle={dictionary.menu.coc}/>
      <CocSection lang={lang}/>
    </main>
  );
}
