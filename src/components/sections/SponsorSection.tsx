import {getDictionary} from "@/lib/dictionaries";
import SectionTitle from "@/components/elements/SectionTitle";
import {getLocaledSponsors, getSponsors} from "@/lib/sponsors";
import SponsorList from "@/components/elements/SponsorList";

export default async function SponsorSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)
  const sponsors = await getSponsors();
  const localedSponsors = getLocaledSponsors(sponsors, lang);

  return <section className='bg-primary-50 mt-20 pb-20'>
    <SectionTitle title={'Sponsors'} subtitle={dictionary.sponsor.subtitle} direction={'down'}/>
    <SponsorList subtitles={{
      platinum: dictionary.sponsor.subtitle_platinum,
      gold: dictionary.sponsor.subtitle_gold,
      silver: dictionary.sponsor.subtitle_silver
    }} localedSponsors={localedSponsors}/>
  </section>
}