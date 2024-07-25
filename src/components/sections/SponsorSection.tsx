import {getDictionary} from "@/dictionaries";
import SponsorTitle from "@/components/elements/SponsorTitle";

export default async function SponsorSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className='bg-primary-50 mt-20'>
    <div className='text-white w-80 mx-auto flex items-center flex-col bg-primary-500 gap-2.5'>
      <h1 className='font-manrope text-5xl font-semibold'>
        Sponsor
      </h1>
      <p>
        {dictionary.sponsor.subtitle}
      </p>
    </div>

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