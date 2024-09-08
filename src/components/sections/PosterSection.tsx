import {getPosters} from "@/lib/posters";
import SectionSubTitle from "@/components/elements/SectionSubTitle";
import {getDictionary} from "@/lib/dictionaries";
import PostersList from "@/components/elements/PostersList";

export default async function PosterSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);
  const posters = await getPosters();

  return <section className='bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20'>
    <SectionSubTitle title='General' subtitle={dictionary.posters.general}/>
    <PostersList posters={posters.general}/>
    <SectionSubTitle title='Community' subtitle={dictionary.posters.community}/>
    <PostersList posters={posters.community}/>
  </section>
}