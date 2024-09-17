import {getDictionary} from "@/lib/dictionaries";
import VenueCard from "@/components/elements/VenueCard";

export default async function SprintVenueSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  return <section className='lg:mt-28 mt-20 lg:w-10/12 w-11/12 mx-auto'>
    <VenueCard type={'sprint'} heading={dictionary.venue.heading} venue={dictionary.venue.venue.sprint}/>
  </section>
}