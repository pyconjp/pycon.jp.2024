import {LocaledSponsor, Sponsor} from "@/types/Sponsors";
import SponsorTitle from "@/components/elements/SponsorTitle";
import SponsorCard from "@/components/elements/SponsorCard";

const emptySponsorList: { [key in Sponsor['plan']]: LocaledSponsor[] } = {platinum: [], gold: [], silver: []};

export default function SponsorList({subtitles, localedSponsors}: {
  subtitles: { [key in Sponsor['plan']]: string },
  localedSponsors: LocaledSponsor[]
}) {
  const sponsorList: { [key in Sponsor['plan']]: LocaledSponsor[] } = localedSponsors.reduce((acc, sponsor) => {
      acc[sponsor.plan].push(sponsor);
      return acc;
    },
    emptySponsorList
  )

  return (
    <>
      <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
        <SponsorTitle title={'Platinum'} subtitle={subtitles.platinum}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-3 grid-cols-1 gap-5'>
          {sponsorList.platinum.map((sponsor, index) => <SponsorCard key={index} {...sponsor}/>)}
        </div>
      </div>

      <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
        <SponsorTitle title={'Gold'} subtitle={subtitles.gold}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-4 grid-cols-1 gap-5'>
          {sponsorList.gold.map((sponsor, index) => <SponsorCard key={index} {...sponsor}/>)}
        </div>
      </div>

      <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
        <SponsorTitle title={'Silver'} subtitle={subtitles.silver}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-5 grid-cols-1 gap-5'>
          {sponsorList.silver.map((sponsor, index) => <SponsorCard key={index} {...sponsor} profile=''/>)}
        </div>
      </div>
    </>
  );
}