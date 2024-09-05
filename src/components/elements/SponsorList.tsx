import {LocaledSpecialSponsor, LocaledSponsor, SpecialSponsor, Sponsor} from "@/types/Sponsors";
import SponsorTitle from "@/components/elements/SponsorTitle";
import SponsorCard from "@/components/elements/SponsorCard";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

export default function SponsorList({subtitles, localedSponsors, localedSpecialSponsors}: {
  subtitles: { [key in Sponsor['plan'] | SpecialSponsor['plan']]: string },
  localedSponsors: LocaledSponsor[]
  localedSpecialSponsors: LocaledSpecialSponsor[]
}) {
  const sponsorList: { [key in Sponsor['plan']]: LocaledSponsor[] } = localedSponsors.reduce(
    (acc: { [key in Sponsor['plan']]: LocaledSponsor[] }, sponsor) => {
      acc[sponsor.plan].push(sponsor);
      return acc;
    },
    {platinum: [], gold: [], silver: []}
  )

  const specialSponsorList: { [key in SpecialSponsor['plan']]: LocaledSpecialSponsor[] } = localedSpecialSponsors.reduce(
    (acc: { [key in SpecialSponsor['plan']]: LocaledSpecialSponsor[] }, sponsor) => {
      acc[sponsor.plan].push(sponsor);
      return acc;
    },
    {psf: [], advertising: [], special: []}
  )

  return (
    <>
      <div className='lg:w-10/12 w-11/12 mx-auto mt-16'>
        <SponsorTitle title={'Platinum'} subtitle={subtitles.platinum}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-2 grid-cols-1 gap-5'>
          {sponsorList.platinum.map((sponsor, index) => <SponsorCard key={`platinum_${index}`} {...sponsor}/>)}
        </div>

        <SponsorTitle title={'PSF'} subtitle={subtitles.psf}/>
        <div className='mx-auto mt-8 lg:w-1/2 grid grid-cols-1 lg:px-[0.3125rem]'>
          {specialSponsorList.psf.map((sponsor, index) =>
            <SponsorCard key={`psf_${index}`} {...sponsor} profile=''/>)}
        </div>

        <SponsorTitle title={'Gold'} subtitle={subtitles.gold}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-4 grid-cols-1 gap-5'>
          {sponsorList.gold.map((sponsor, index) => <SponsorCard key={`gold_${index}`} {...sponsor}/>)}
        </div>

        <SponsorTitle title={'Silver'} subtitle={subtitles.silver}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-5 grid-cols-1 gap-5'>
          {sponsorList.silver.map((sponsor, index) => <SponsorCard key={`sliver_${index}`} {...sponsor} profile=''/>)}
        </div>

        <SponsorTitle title={'Special'} subtitle={subtitles.special}/>
        <SectionSubTitle title={'Advertising Sponsor'} subtitle={subtitles.advertising}/>
        <div className='mx-auto mt-8 lg:w-1/4 grid-cols-1 gap-5 px-[0.46875rem]'>
          {specialSponsorList.advertising.map((sponsor, index) =>
            <SponsorCard key={`advertising_${index}`} {...sponsor} profile=''/>)}
        </div>

        <SectionSubTitle title={'Special'} subtitle={subtitles.special}/>
        <div className='mx-auto mt-8 grid lg:grid-cols-5 grid-cols-1 gap-5'>
          {specialSponsorList.special.map((sponsor, index) =>
            <SponsorCard key={`special_${index}`} {...sponsor} profile=''/>)}
        </div>
      </div>
    </>
  );
}