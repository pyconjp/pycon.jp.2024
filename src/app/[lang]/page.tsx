import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import { getDictionary } from '@/dictionaries'

export const runtime = 'edge';

export default async function Home({ params: {lang} }: { params: {lang: 'ja' | 'en'} }) {
  const dictionary = await getDictionary(lang)

  return (
    <main className='w-10/12 mx-auto my-8'>
      <HeroSection lang={lang}/>
      <NewsSection/>
    </main>
  );
}
