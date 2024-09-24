import SectionSubTitle from "@/components/elements/SectionSubTitle";
import {getContents} from "@/lib/contents";
import Image from "next/image";
import {getDictionary} from "@/lib/dictionaries";
import Link from "next/link";

export default async function ContentsSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);
  const contents = await getContents(lang);

  return <>
    {contents.map(
      (content, index) => <section key={index}
                                   className='even:bg-white odd:bg-primary-50 lg:pt-16 lg:pb-20 pt-14 pb-16'>
        <SectionSubTitle title={content.headline} subtitle={content.title}/>
        <div className='lg:w-8/12 w-11/12 mx-auto flex lg:flex-row flex-col lg:gap-12 gap-8'>
          <div
            className='flex-[2_2_0%] relative after:bg-secondary after:absolute after:w-full after:h-full after:top-2 after:left-2 after:rounded-tl-3xl after:rounded-br-3xl self-start'>
            <Image src={`/contents/${content.image}`} alt={content.title} width={800} height={534}
                   className='relative rounded-tl-3xl rounded-br-3xl z-10'/>
          </div>
          <div className='flex-[3_3_0%] flex flex-col justify-between gap-6 self-stretch'>
            <div className='flex flex-col gap-1.5'>
              <div className='flex flex-row gap-4 items-center'>
                <Image src={'/headline_icon.svg'} alt={content.title} width={24} height={24} className='rounded'/>
                <div className='text-xl font-bold'>{content.title}</div>
              </div>
              <div className='whitespace-pre-line'>
                {content.description}
              </div>
            </div>
            <div className='flex justify-center pb-4 w-full'>
              <Link href={content.url} target='_blank' rel='noopener noreferrer'>
                <button
                  className='text-center bg-primary-500 text-white font-manrope font-bold text-xl py-2 px-8 hover:opacity-80'>
                  {dictionary.contents.see_more}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )}
  </>
}