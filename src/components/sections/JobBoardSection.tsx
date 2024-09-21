import {getLocaledSponsors, getSponsors} from "@/lib/sponsors";
import JobBoardList from "@/components/elements/JobBoardList";

export default async function JobBoardSection({lang}: { lang: 'ja' | 'en' }) {
  const sponsors = await getSponsors();
  const localedSponsors = getLocaledSponsors(sponsors, lang);

  return <section className='bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20'>
    <JobBoardList localedSponsors={localedSponsors}/>
  </section>
}