import HeroSection from '@/components/sections/HeroSection';
import NewsSection from '@/components/sections/NewsSection';
import OverviewSection from "@/components/sections/OverviewSection";
import ConferenceSection from "@/components/sections/ConferenceSection";

export const runtime = 'edge';

export default async function Home({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return (
    <main>
      <HeroSection lang={lang}/>
      <NewsSection lang={lang}/>
      <OverviewSection lang={lang}/>
      <ConferenceSection lang={lang}/>
      {/*<SponsorSection lang={lang}/>*/}
    </main>
  );
}
