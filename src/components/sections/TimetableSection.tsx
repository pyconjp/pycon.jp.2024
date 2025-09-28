import TimetableToggleButton from "@/components/elements/TimetableToggleButton";
import TimetableBody from "@/components/elements/TimetableBody";

interface TimetableSectionProps {
  lang: 'ja' | 'en';
  date: 'day1' | 'day2';
  talks: any[];
  events: any[];
  categories: any[];
  keynoteSpeaker: any;
}

export default function TimetableSection({
                                           lang,
                                           date,
                                           talks,
                                           events,
                                           categories,
                                           keynoteSpeaker
                                         }: TimetableSectionProps) {

  return <section className="bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20">
    <TimetableToggleButton lang={lang} date={date}/>
    <TimetableBody lang={lang} date={date} talks={talks} events={events} categories={categories}
                   keynoteSpeaker={keynoteSpeaker}/>
  </section>
}