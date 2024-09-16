import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import {Metadata} from "next";
import SpecialThanksSection from "@/components/sections/SpecialThanksSection";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.special_thanks};
}

export default async function SpecialThanks({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Special Thanks'} subTitle={dictionary.menu.special_thanks}/>
    <SpecialThanksSection lang={lang}/>
  </main>;
}