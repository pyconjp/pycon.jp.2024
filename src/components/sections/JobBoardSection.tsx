import JobBoardList from "@/components/elements/JobBoardList";

interface JobBoardSectionProps {
  lang: 'ja' | 'en';
  localedSponsors: any[];
}

export default function JobBoardSection({lang, localedSponsors}: JobBoardSectionProps) {

  return <section className='bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20'>
    <JobBoardList localedSponsors={localedSponsors}/>
  </section>
}