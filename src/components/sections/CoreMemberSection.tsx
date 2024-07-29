import {getDictionary} from "@/lib/dictionaries";
import {getOrganizers} from "@/lib/organizers";
import MemberCard from "@/components/elements/MemberCard";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

export default async function CoreMemberSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);
  const organizers = await getOrganizers();

  return <section className="my-20 mx-auto lg:w-10/12 w-8/12">
    <SectionSubTitle title={'Core Members'} subtitle={dictionary.organizers.subtitle_core_members}/>
    <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-y-10 gap-y-5'>
      {
        organizers.map((organizer, index) => (
          <MemberCard member={organizer} lang={lang} key={index}/>
        ))
      }
    </div>
  </section>
}