import {getDictionary} from "@/lib/dictionaries";
import VenueCard from "@/components/elements/VenueCard";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

export default async function VenueAccessSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  return <section className='lg:mt-28 mt-20 lg:w-10/12 w-11/12 mx-auto lg:mb-20 mb-14'>
    <SectionSubTitle title={'Access'} subtitle={dictionary.venue.access}/>
    <div className='flex flex-col'>
      <VenueCard type={'conference'} heading={dictionary.venue.heading} venue={dictionary.venue.venue.conference}/>
      <VenueCard type={'sprint'} heading={dictionary.venue.heading} venue={dictionary.venue.venue.sprint}/>
    </div>
  </section>
}