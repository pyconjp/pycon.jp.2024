import {Organizer} from "@/types/Organizer";
import ImageWithFallback from "@/components/elements/ImageWithFallback";
import SnsLinks from "@/components/elements/SnsLinks";

export default async function MemberCard({member, lang}: { member: Organizer, lang: 'ja' | 'en' }) {
  return <div className='flex flex-row gap-2 items-center'>
    <ImageWithFallback src={member.image ? `/organizers/${member.image}` : '/no_image.jpg'}
                       alt={lang === 'ja' ? member.name_ja : member.name_en}
                       className='rounded-tr-2xl rounded-bl-2xl w-20 h-20' width={80} height={80}/>
    <div className={'flex flex-col gap-2 text-right'}>
      <div className='text-lg'>
        {lang === 'ja' ? member.name_ja : member.name_en}
      </div>
      <SnsLinks member={member}/>
    </div>
  </div>
}