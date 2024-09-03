import {redirect} from "next/navigation";

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Timetable({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  return redirect(`/${lang}/timetable/day1`);
}