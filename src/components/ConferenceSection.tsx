import {getDictionary} from "@/dictionaries";
import ConferenceCard from "@/components/ConferenceCard";

export default async function ConferenceSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className="mt-20">
    <div className='w-80 mx-auto flex items-center flex-col bg-secondary gap-2.5 text-white'>
      <h1 className='font-manrope text-5xl font-semibold'>
        Conference
      </h1>
      <p>
        {dictionary.conference.subtitle}
      </p>
    </div>
    <div className='w-full flex items-center flex-col my-10 gap-2.5'>
      <h2 className='text-3xl font-manrope text-primary font-bold'>
        Keynote
      </h2>
      <p>
        {dictionary.conference.subtitle_keynote}
      </p>
    </div>
    <div className='flex gap-7 flex-col'>
      <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.27(Fri)'} image={'/coming_soon.jpg'}/>
      <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.28(Sat)'} image={'/coming_soon.jpg'}/>
    </div>
    <div className='w-full flex items-center flex-col my-10 gap-2.5'>
      <h2 className='text-3xl font-manrope text-primary font-bold'>
        Invited talk
      </h2>
      <p>
        {dictionary.conference.subtitle_invited_talk}
      </p>
    </div>
    <div className='flex gap-7 flex-col'>
      <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.27(Fri)'} image={'/coming_soon.jpg'}/>
      <ConferenceCard name={'ダミー ダミー'} description={'text'} date={'2024.9.28(Sat)'} image={'/coming_soon.jpg'}/>
    </div>
  </section>
}