import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import SponsorPageSponsorSection from "@/components/sections/SponsorPageSponsorSection";
import {Metadata} from "next";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.sponsor};
}

export default async function Sponsors({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Sponsors'} subTitle={dictionary.menu.sponsor_list}/>
    <SponsorPageSponsorSection lang={lang}/>
  </main>;
}