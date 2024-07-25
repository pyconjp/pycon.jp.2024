import Image from "next/image";
import {getDictionary} from "@/dictionaries";

export default async function OverviewSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section className="mt-20">
    <div className='text-white w-80 mx-auto flex items-center flex-col bg-primary-500 gap-2.5'>
      <h1 className='font-manrope text-5xl font-semibold'>
        Overview
      </h1>
      <p>
        {dictionary.overview.subtitle}
      </p>
    </div>
    <div className='text-white relative w-full bg-primary-500 after:bg-secondary after:absolute after:w-full after:h-full after:-z-10 after:top-2'>
      <div className='flex lg:flex-row flex-col gap-6 lg:gap-8 lg:w-9/12 w-11/12 mx-auto lg:py-6 py-8'>
        <div>
          <Image src='/overview.jpg' alt='overview' width={2048} height={1365}/>
        </div>
        <div>
          <h3 className='text-[32px] font-manrope'>
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