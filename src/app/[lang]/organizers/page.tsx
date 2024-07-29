import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import CoreMemberSection from "@/components/sections/CoreMemberSection";

export const runtime = 'edge';

export default async function Organizers({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Organizer Members'} subTitle={dictionary.menu.organizer}/>
    <CoreMemberSection lang={lang}/>
  </main>;
}