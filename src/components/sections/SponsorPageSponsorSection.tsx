import {getDictionary} from "@/lib/dictionaries";
import {getLocaledSpecialSponsors, getLocaledSponsors, getSponsors} from "@/lib/sponsors";
import SponsorList from "@/components/elements/SponsorList";
import {patrons} from "@/data/patrons";

export default async function SponsorPageSponsorSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)
  const sponsors = await getSponsors();
  const localedSponsors = getLocaledSponsors(sponsors, lang);
  const localedSpecialSponsors = await getLocaledSpecialSponsors(lang);

  return <section className='bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20'>
    <SponsorList subtitles={{
      platinum: dictionary.sponsor.subtitle_platinum,
      gold: dictionary.sponsor.subtitle_gold,
      silver: dictionary.sponsor.subtitle_silver,
      psf: dictionary.sponsor.subtitle_psf,
      advertising: dictionary.sponsor.subtitle_advertising,
      patron: dictionary.sponsor.subtitle_patron,
      special: dictionary.sponsor.subtitle_special,
    }} localedSponsors={localedSponsors} localedSpecialSponsors={localedSpecialSponsors} patrons={patrons}/>
  </section>
}