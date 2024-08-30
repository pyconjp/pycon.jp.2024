import {getTalks} from "@/lib/pretalx";
import TimetableToggleButton from "@/components/elements/TimetableToggleButton";

const EVENT_START_TIME = {
  day1: [
    "2024-09-27T10:00:00+09:00",
    "2024-09-27T10:30:00+09:00",
    "2024-09-27T12:00:00+09:00",
    "2024-09-27T15:10:00+09:00",
    "2024-09-27T15:10:00+09:00",
  ],
  day2: [

  ],
}

export default async function TimetableSection({lang, date}: { lang: 'ja' | 'en', date: 'day1' | 'day2' }) {
  const talks = getTalks();

  return <section className="bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20">
    <TimetableToggleButton lang={lang} date={date}/>
  </section>
}