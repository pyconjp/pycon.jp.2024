import {getCategories, getEvents, getTalks} from "@/lib/timetable";
import TimetableToggleButton from "@/components/elements/TimetableToggleButton";
import TimetableBody from "@/components/elements/TimetableBody";

export default async function TimetableSection({lang, date}: { lang: 'ja' | 'en', date: 'day1' | 'day2' }) {
  const talks = await getTalks(date);
  const events = await getEvents(date);
  const categories = await getCategories(lang);

  return <section className="bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20">
    <TimetableToggleButton lang={lang} date={date}/>
    <TimetableBody lang={lang} date={date} talks={talks} events={events} categories={categories}/>
  </section>
}