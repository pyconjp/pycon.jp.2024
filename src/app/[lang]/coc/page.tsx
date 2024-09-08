import PageTitle from "@/components/elements/PageTitle";
import {getDictionary} from "@/lib/dictionaries";
import CocSection from "@/components/sections/CocSection";
import {Metadata} from "next";

export const runtime = 'edge';

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.coc};
}

export default async function CoC({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main>
      <PageTitle title={'Code of Conduct'} subTitle={dictionary.menu.coc}/>
      <CocSection lang={lang}/>
    </main>
  );
}
