import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import OverviewSection from "@/components/OverviewSection";
import ConferenceSection from "@/components/ConferenceSection";
import SponsorSection from "@/components/SponsorSection";

export const runtime = 'edge';

export default async function Home({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return (
    <main className='my-8'>
      <HeroSection lang={lang}/>
      <NewsSection lang={lang}/>
      <OverviewSection lang={lang}/>
      <ConferenceSection lang={lang}/>
      <SponsorSection lang={lang}/>
    </main>
  );
}
