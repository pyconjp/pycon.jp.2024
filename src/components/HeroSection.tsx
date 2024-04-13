import { getDictionary } from '@/dictionaries'

export default async function HeroSection({ lang }: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

return <div>
    <h1>{dictionary.conference.name}</h1>
    <p>{dictionary.conference.date}</p>
    <p>{dictionary.conference.location}</p>
  </div>
}
