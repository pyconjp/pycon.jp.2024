import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import SprintVenueSection from "@/components/sections/SprintVenueSection";
import SprintSection from "@/components/sections/SprintSection";
import AnnounceSection from "@/components/sections/AnnounceSection";
import {sprintAnnounce} from "@/data/announce";

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Sprint({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Sprint'} subTitle={dictionary.menu.sprint}/>
    <AnnounceSection announce={sprintAnnounce} lang={lang}/>
    <SprintVenueSection lang={lang}/>
    <SprintSection/>
  </main>
}