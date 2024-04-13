import HeroSection from '@/components/HeroSection';
import { getDictionary } from '@/dictionaries'

export default async function Home({ params: {lang} }: { params: {lang: 'ja' | 'en'} }) {
  const dictionary = await getDictionary(lang)

  return (
    <main className='w-10/12 mx-auto my-8'>
      <HeroSection lang={lang}/>
    </main>
  );
}
