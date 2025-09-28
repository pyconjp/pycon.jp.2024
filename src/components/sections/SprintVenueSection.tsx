import VenueCard from "@/components/elements/VenueCard";

interface SprintVenueSectionProps {
  lang: 'ja' | 'en';
  dictionary: any;
}

export default function SprintVenueSection({lang, dictionary}: SprintVenueSectionProps) {

  return <section className='lg:mt-28 mt-20 lg:w-10/12 w-11/12 mx-auto'>
    <VenueCard type={'sprint'} heading={dictionary.venue.heading} venue={dictionary.venue.venue.sprint}/>
  </section>
}