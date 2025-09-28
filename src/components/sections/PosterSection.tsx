import SectionSubTitle from "@/components/elements/SectionSubTitle";
import PostersList from "@/components/elements/PostersList";

interface PosterSectionProps {
  lang: 'ja' | 'en';
  dictionary: any;
  posters: any;
}

export default function PosterSection({lang, dictionary, posters}: PosterSectionProps) {

  return <section className='bg-primary-50 -mt-20 lg:pt-32 pt-28 pb-20'>
    <SectionSubTitle title='General' subtitle={dictionary.posters.general}/>
    <PostersList posters={posters.general}/>
    <SectionSubTitle title='Community' subtitle={dictionary.posters.community}/>
    <PostersList posters={posters.community}/>
  </section>
}