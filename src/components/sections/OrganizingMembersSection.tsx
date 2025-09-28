import MemberCard from "@/components/elements/MemberCard";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

interface OrganizingMembersSectionProps {
  lang: 'ja' | 'en';
  dictionary: any;
  organizers: any[];
}

export default function OrganizingMembersSection({lang, dictionary, organizers}: OrganizingMembersSectionProps) {

  return <section className="my-20 mx-auto lg:w-10/12 w-8/12">
    <SectionSubTitle title={'Organizing Members'} subtitle={dictionary.organizers.organizing_members}/>
    <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-y-10 gap-y-5'>
      {
        organizers.map((organizer, index) => (
          <MemberCard member={organizer} lang={lang} key={index}/>
        ))
      }
    </div>
  </section>
}