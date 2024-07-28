import {getDictionary} from "@/lib/dictionaries";
import SponsorTitle from "@/components/elements/SponsorTitle";
import SectionTitle from "@/components/elements/SectionTitle";

export default async function SponsorSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className='bg-primary-50 mt-20 pb-20'>
    <SectionTitle title={'Sponsors'} subtitle={dictionary.sponsor.subtitle} direction={'down'}/>

    <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
      <SponsorTitle title={'Diamond'} subtitle={dictionary.sponsor.subtitle_diamond}/>
    </div>

    <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
      <SponsorTitle title={'Platinum'} subtitle={dictionary.sponsor.subtitle_platinum}/>
    </div>

    <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
      <SponsorTitle title={'Gold'} subtitle={dictionary.sponsor.subtitle_gold}/>
    </div>

    <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
      <SponsorTitle title={'Silver'} subtitle={dictionary.sponsor.subtitle_silver}/>
    </div>
  </section>
}