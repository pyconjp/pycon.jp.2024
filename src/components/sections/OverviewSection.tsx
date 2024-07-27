import Image from "next/image";
import {getDictionary} from "@/dictionaries";
import SectionTitle from "@/components/elements/SectionTitle";

export default async function OverviewSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className="mt-20">
    <SectionTitle title={'Overview'} subtitle={dictionary.overview.subtitle}/>
    <div
      className='text-white relative w-full bg-primary-500 after:bg-secondary after:absolute after:w-full after:h-full after:-z-10 after:top-2'>
      <div className='flex lg:flex-row flex-col gap-6 lg:gap-8 lg:w-9/12 w-11/12 mx-auto lg:py-6 py-8'>
        <div>
          <Image src='/overview.jpg' alt='overview' width={2048} height={1365}/>
        </div>
        <div>
          <h3 className="text-[32px] font-manrope before:content-[url('/ellipse.svg')] before:pr-1.5">
            What is PyCon JP
          </h3>
          <div className='font-noto mt-3'>
            {dictionary.overview.description}
          </div>
        </div>
      </div>
    </div>
  </section>
}