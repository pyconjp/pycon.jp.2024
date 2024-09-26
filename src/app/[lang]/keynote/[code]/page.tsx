import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import TimetableSection from "@/components/sections/TimetableSection";
import {redirect} from "next/navigation";
import {Metadata} from "next";
import {conferenceEvents} from "@/data/event";
import TimetableKeynoteModalSection from "@/components/sections/TimetableKeynoteModalSection";

export const runtime = 'edge';

export async function generateMetadata({params: {code, lang}}: {
  params: { code: 'keynote_day1' | 'keynote_day2', lang: 'ja' | 'en' }
},): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {title: `Keynote (${dictionary.conference[code].speaker})`};
}

export async function generateStaticParams() {
  return ['keynote_day1', 'keynote_day2']
    .map(code => [{lang: 'ja', code: code}, {lang: 'en', code: code}]).flat();
}

export default async function TimetableKeynote({params: {lang, code}}: {
  params: { lang: 'ja' | 'en', code: 'keynote_day1' | 'keynote_day2' }
}) {
  const dictionary = await getDictionary(lang);
  const keynote = conferenceEvents.find(event => event.is_keynote && event.code === code);

  if (!keynote || !keynote.is_keynote) {
    redirect('/404');
  }

  return <main>
    <PageTitle title={'Timetable'} subTitle={dictionary.menu.timetable}/>
    <TimetableSection lang={lang} date={keynote.date}/>
    <TimetableKeynoteModalSection lang={lang} keynote={keynote} speaker={dictionary.conference[keynote.code].speaker}/>
  </main>;
}