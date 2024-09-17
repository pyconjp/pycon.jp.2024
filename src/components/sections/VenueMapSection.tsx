import {getDictionary} from "@/lib/dictionaries";
import SectionSubTitle from "@/components/elements/SectionSubTitle";
import Image from "next/image";
import Link from "next/link";

export default async function VenueMapSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  return <section className='lg:mt-28 mt-20 lg:w-10/12 w-11/12 mx-auto'>
    <SectionSubTitle title={'Map'} subtitle={dictionary.venue.map}/>
    <div className='flex flex-col gap-10 items-center'>
      {['4F', '20F'].map((floor, index) =>
        <div key={index} className='flex flex-col items-center'>
          <h3 className='font-bold text-3xl font-manrope text-primary-500'>
            {floor}
          </h3>
          <Link href={`/${floor}_map_rotated.png`} className='hover:opacity-80' target='_blank'>
            <Image src={`/${floor}_map.svg`} alt={`${floor} map`} width={1200} height={1200}/>
          </Link>
        </div>
      )}
    </div>
  </section>
}