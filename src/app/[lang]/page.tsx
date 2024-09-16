import HeroSection from '@/components/sections/HeroSection';
import NewsSection from '@/components/sections/NewsSection';
import OverviewSection from "@/components/sections/OverviewSection";
import ConferenceSection from "@/components/sections/ConferenceSection";
import SponsorSection from "@/components/sections/SponsorSection";
import AnnounceSection from "@/components/sections/AnnounceSection";
import {announce} from "@/data/announce";

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Home({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return (
    <main>
      <HeroSection lang={lang}/>
      <NewsSection lang={lang}/>
      <AnnounceSection announce={announce} lang={lang}/>
      <OverviewSection lang={lang}/>
      <ConferenceSection lang={lang}/>
      <SponsorSection lang={lang}/>
    </main>
  );
}
