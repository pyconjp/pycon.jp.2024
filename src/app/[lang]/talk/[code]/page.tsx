import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import TimetableSection from "@/components/sections/TimetableSection";
import {getTalk, getTalks} from "@/lib/timetable";
import {Talk} from "@/types/Talk";
import {redirect} from "next/navigation";
import TimetableModalSection from "@/components/sections/TimetableModalSection";
import {Metadata} from "next";

export const runtime = 'edge';

export async function generateMetadata({params: {code}}: { params: { code: Talk['code'] } },): Promise<Metadata> {
  const talk = await getTalk(code);
  return {title: talk?.title};
}

export async function generateStaticParams() {
  const talks1 = await getTalks('day1');
  const talks2 = await getTalks('day2');

  return [...talks1, ...talks2].map(talk => [{lang: 'ja', code: talk.code}, {lang: 'en', code: talk.code}]).flat();
}

export default async function TimetableTalk({params: {lang, code}}: {
  params: { lang: 'ja' | 'en', code: Talk['code'] }
}) {
  const dictionary = await getDictionary(lang);
  const talk = await getTalk(code);

  if (!talk) {
    redirect('/404');
  }

  return <main>
    <PageTitle title={'Timetable'} subTitle={dictionary.menu.timetable}/>
    <TimetableSection lang={lang} date={talk.date}/>
    <TimetableModalSection lang={lang} talk={talk}/>
  </main>;
}