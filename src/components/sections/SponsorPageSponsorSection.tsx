import SponsorList from "@/components/elements/SponsorList";
import {patrons} from "@/data/patrons";

interface SponsorPageSponsorSectionProps {
  lang: 'ja' | 'en';
  dictionary: any;
  localedSponsors: any[];
  localedSpecialSponsors: any[];
}

export default function SponsorPageSponsorSection({
                                                    lang,
                                                    dictionary,
                                                    localedSponsors,
                                                    localedSpecialSponsors
                                                  }: SponsorPageSponsorSectionProps) {

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