import PageTitle from "@/components/elements/PageTitle";
import SprintVenueSection from "@/components/sections/SprintVenueSection";
import SprintSection from "@/components/sections/SprintSection";
import AnnounceSection from "@/components/sections/AnnounceSection";
import {announce} from "@/data/announce";
import {Metadata} from "next";
import {getDictionary} from "@/lib/dictionaries";
import SprintOutPutSection from "@/components/sections/SprintOutPutSection";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.sprint};
}

export default async function Sprint({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Sprint'} subTitle={dictionary.menu.sprint}/>
    <AnnounceSection announce={announce} lang={lang}/>
    <SprintVenueSection lang={lang}/>
    <SprintSection lang={lang}/>
    <SprintOutPutSection lang={lang}/>
  </main>
}