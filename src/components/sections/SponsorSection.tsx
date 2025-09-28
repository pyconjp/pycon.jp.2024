import SectionTitle from "@/components/elements/SectionTitle";
import SponsorList from "@/components/elements/SponsorList";
import {patrons} from "@/data/patrons";
import {LocaledSpecialSponsor, LocaledSponsor} from "@/types/Sponsors";

type SponsorSectionProps = {
  sponsors: LocaledSponsor[]
  dictionary: any
  specialSponsors?: LocaledSpecialSponsor[]
}

export default function SponsorSection({sponsors, dictionary, specialSponsors = []}: SponsorSectionProps) {
  return <section className='bg-primary-50 mt-20 pb-20'>
    <SectionTitle title={'Sponsors'} subtitle={dictionary.sponsor.subtitle} direction={'down'}/>
    <SponsorList subtitles={{
      platinum: dictionary.sponsor.subtitle_platinum,
      gold: dictionary.sponsor.subtitle_gold,
      silver: dictionary.sponsor.subtitle_silver,
      psf: dictionary.sponsor.subtitle_psf,
      advertising: dictionary.sponsor.subtitle_advertising,
      patron: dictionary.sponsor.subtitle_patron,
      special: dictionary.sponsor.subtitle_special,
    }} localedSponsors={sponsors} localedSpecialSponsors={specialSponsors} patrons={patrons}/>
  </section>
}