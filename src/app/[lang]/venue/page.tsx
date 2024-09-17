import PageTitle from "@/components/elements/PageTitle";
import {Metadata} from "next";
import {getDictionary} from "@/lib/dictionaries";
import VenueAccessSection from "@/components/sections/VenueAccessSection";
import VenueMapSection from "@/components/sections/VenueMapSection";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.venue};
}

export default async function Venue({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Venue'} subTitle={dictionary.menu.venue}/>
    <VenueMapSection lang={lang}/>
    <VenueAccessSection lang={lang}/>
  </main>
}