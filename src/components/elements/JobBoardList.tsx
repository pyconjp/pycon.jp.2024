import {LocaledSponsor} from "@/types/Sponsors";
import SponsorCard from "@/components/elements/SponsorCard";

const SportPriority = {
  platinum: 1,
  gold: 2,
  silver: 3,
}

export default function JobBoardList({localedSponsors}: {
  localedSponsors: LocaledSponsor[]
}) {
  const sponsorList: LocaledSponsor[] = localedSponsors
    .sort((a, b) => SportPriority[a.plan] - SportPriority[b.plan])
    .filter(sponsor => sponsor.job_board !== '');

  return (
    <>
      <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
        <div className='mx-auto my-8 grid lg:grid-cols-4 grid-cols-1 gap-5'>
          {sponsorList.map((sponsor, index) =>
            <SponsorCard key={`gold_${index}`} {...sponsor} profile={sponsor.job_board}/>)}
        </div>
      </div>
    </>
  );
}