import {getDictionary} from "@/lib/dictionaries";
import PageTitle from "@/components/elements/PageTitle";
import PosterSection from "@/components/sections/PosterSection";

export default async function Posters({params: {lang}}: { params: { lang: 'ja' | 'en' } }) {
  const dictionary = await getDictionary(lang);

  return <main>
    <PageTitle title={'Poster Session'} subTitle={dictionary.menu.posters}/>
    <PosterSection lang={lang}/>
  </main>;
}