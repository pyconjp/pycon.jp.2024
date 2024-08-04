import {getDictionary} from "@/lib/dictionaries";
import ChairCard from "@/components/elements/ChairCard";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

export default async function ChairsSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className="my-20 mx-auto lg:w-10/12 w-11/12">
    <SectionSubTitle title={'Co-Chairs'} subtitle={dictionary.organizers.subtitle_chairs}/>
    <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-x-7 gap-20'>
      <ChairCard chair={{...dictionary.organizers.chairs.takanory, image: '/organizers/chairs/takanory.jpg'}}
                 filename={`takanory_${lang}`}/>
      <ChairCard chair={{...dictionary.organizers.chairs.yoshida, image: '/organizers/chairs/yoshida.jpg'}}
                 filename={`yoshida_${lang}`}/>
      <ChairCard chair={{...dictionary.organizers.chairs.terada, image: '/organizers/chairs/terada.jpeg'}}
                 filename={`terada_${lang}`}/>
    </div>
  </section>
}