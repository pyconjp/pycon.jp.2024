import {getDictionary} from "@/lib/dictionaries";
import ConferenceCard from "@/components/elements/ConferenceCard";
import SectionTitle from "@/components/elements/SectionTitle";
import dynamic from "next/dynamic";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

export default async function ConferenceSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  const Keynote1 = dynamic(() => import('@/components/markdown/keynote_day1_' + lang + '.mdx'), {ssr: false});
  const Keynote2 = dynamic(() => import('@/components/markdown/keynote_day2_' + lang + '.mdx'), {ssr: false});
  const InvitationTalk = dynamic(() => import('@/components/markdown/invitation_talk_' + lang + '.mdx'), {ssr: false});

  return <section className="my-20">
    <SectionTitle title={'Conference'} subtitle={dictionary.conference.subtitle} direction={'down'}
                  color={'secondary'}/>
    <SectionSubTitle title={'Keynote'} subtitle={dictionary.conference.subtitle_keynote}/>
    <div className='flex lg:gap-7 gap-8 flex-col'>
      <ConferenceCard name={dictionary.conference.keynote_day1.speaker}
                      date={dictionary.conference.keynote_day1.date} image={'/conference/keynote_day1.png'}>
        <Keynote1/>
      </ConferenceCard>

      <ConferenceCard name={dictionary.conference.keynote_day2.speaker}
                      date={dictionary.conference.keynote_day2.date} image={'/conference/keynote_day2.png'}>
        <Keynote2/>
      </ConferenceCard>
    </div>
    <SectionSubTitle title={'Invited talk'} subtitle={dictionary.conference.subtitle_invited_talk}/>
    <div className='flex lg:gap-7 gap-8 flex-col'>
      <ConferenceCard name={dictionary.conference.invited_talk.speaker}
                      date={dictionary.conference.invited_talk.date} image={'/conference/invitation_talk.png'}>
        <InvitationTalk/>
      </ConferenceCard>
    </div>
  </section>
}