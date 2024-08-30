import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import TimetableSection from "@/components/sections/TimetableSection";

export const runtime = 'edge';

export async function generateStaticParams() {
  return [{date: 'day1'}, {date: 'day2'}];
}

export default async function Sponsors({params: {lang, date}}: {
  params: { lang: 'ja' | 'en', date: 'day1' | 'day2' }
}) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Timetable'} subTitle={dictionary.menu.timetable}/>
    <TimetableSection lang={lang} date={date}/>
  </main>;
}