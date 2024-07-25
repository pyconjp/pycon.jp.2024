import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import {getDictionary} from '@/dictionaries'
import OverviewSection from "@/components/OverviewSection";
import ConferenceSection from "@/components/ConferenceSection";
import SponsorSection from "@/components/SponsorSection";

export const runtime = 'edge';

export default async function Home({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang)

  return (
    <main className='my-8'>
      <HeroSection lang={lang}/>
      <NewsSection/>
      <OverviewSection lang={lang}/>
      <ConferenceSection lang={lang}/>
      <SponsorSection lang={lang}/>
    </main>
  );
}
