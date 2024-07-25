import {getDictionary} from "@/dictionaries";
import Image from "next/image";
import ConferenceCard from "@/components/ConferenceCard";

export default async function ConferenceSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section>
    <div className='w-full flex items-center flex-col'>
      <h1>
        Overview
      </h1>
      <p>
        {dictionary.overview.subtitle}
      </p>
    </div>
    <div className='w-full flex items-center flex-col'>
      <h2>
        Keynote
      </h2>
      <p>
        {dictionary.conference.subtitle_keynote}
      </p>
    </div>
    <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.27(Fri)'}/>
    <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.28(Sat)'}/>
    <div className='w-full flex items-center flex-col'>
      <h2>
        Invited talk
      </h2>
      <p>
        {dictionary.conference.subtitle_invited_talk}
      </p>
    </div>
    <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.27(Fri)'}/>
    <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.28(Sat)'}/>
  </section>;
}