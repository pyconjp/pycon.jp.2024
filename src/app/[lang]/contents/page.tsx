import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import {Metadata} from "next";
import ContentsSection from "@/components/sections/ContentsSection";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.contents};
}

export default async function Contents({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Contents of the Day'} subTitle={dictionary.menu.contents}/>
    <ContentsSection lang={lang}/>
  </main>;
}