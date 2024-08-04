import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import OrganizingMembersSection from "@/components/sections/OrganizingMembersSection";
import ChairsSection from "@/components/sections/ChairsSection";

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Organizers({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Organizing Members'} subTitle={dictionary.menu.organizer}/>
    <ChairsSection lang={lang}/>
    <OrganizingMembersSection lang={lang}/>
  </main>;
}