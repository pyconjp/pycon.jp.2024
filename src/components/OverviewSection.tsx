import Image from "next/image";
import {getDictionary} from "@/dictionaries";
import ConferenceCard from "@/components/ConferenceCard";

export default async function OverviewSection({lang}: { lang: 'ja' | 'en' }) {
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
    <div className='flex lg:flex-row flex-col gap-8'>
      <div className='flex-1'>
        <Image src='/overview.jpg' alt='overview' width={2048} height={1365}/>
      </div>
      <div className={'flex-1'}>
        <h3>
          What is PyCon JP
        </h3>
        <div>
          {dictionary.overview.description}
        </div>
      </div>
    </div>
  </section>
}