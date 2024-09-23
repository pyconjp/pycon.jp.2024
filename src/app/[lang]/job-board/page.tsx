import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import {Metadata} from "next";
import JobBoardSection from "@/components/sections/JobBoardSection";

export const runtime = 'edge';
export const revalidate = 3600;

export async function generateMetadata(
  {params: {lang}}: { params: { lang: 'ja' | 'en' } },
): Promise<Metadata> {
  const dictionary = await getDictionary(lang)
  return {title: dictionary.menu.job_board};
}

export default async function JobBoard({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Job Board'} subTitle={dictionary.menu.job_board}/>
    <JobBoardSection lang={lang}/>
  </main>;
}