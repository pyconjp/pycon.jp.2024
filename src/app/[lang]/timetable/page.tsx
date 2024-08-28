import {getTalks} from "@/lib/pretalx";

export const runtime = 'edge';

export default async function Sponsors({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const talks = await getTalks();

  return <main>
    {JSON.stringify(talks)}
  </main>;
}