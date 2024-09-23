import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import OrganizingMembersSection from "@/components/sections/OrganizingMembersSection";
import ChairsSection from "@/components/sections/ChairsSection";
import ReviewersSection from "@/components/sections/ReviewersSection";
import {Metadata} from "next";
import CameraCrewSection from "@/components/sections/CameraCrewSection";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.organizer};
}

export default async function Organizers({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Organizing Members'} subTitle={dictionary.menu.organizer}/>
    <ChairsSection lang={lang}/>
    <OrganizingMembersSection lang={lang}/>
    <ReviewersSection lang={lang}/>
    <CameraCrewSection lang={lang}/>
  </main>;
}