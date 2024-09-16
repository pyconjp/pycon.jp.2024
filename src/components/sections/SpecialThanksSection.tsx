import {getDictionary} from "@/lib/dictionaries";
import {getSpecialThanks} from "@/lib/special-thanks";
import {SpecialThanksCard} from "@/components/elements/SpecialThanksCard";

export default async function SpecialThanksSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);
  const specialThanks = await getSpecialThanks();

  return <section className="my-20 mx-auto lg:w-10/12 w-11/12">
    <div className='w-full text-center text-primary-500 font-bold lg:text-xl text-xl'>
      {dictionary.special_thanks.description}
    </div>

    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-x-16 lg:gap-y-8 gap-10 mt-10 lg:mt-14 '>
      {
        specialThanks.map((specialThanks, index) => <SpecialThanksCard key={index} specialThanks={specialThanks}/>)
      }
    </div>
  </section>
}