import {redirect} from "next/navigation";
import {Metadata} from "next";
import {getDictionary} from "@/lib/dictionaries";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.timetable};
}

export default async function Timetable({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return redirect(`/${lang}/timetable/day1`);
}