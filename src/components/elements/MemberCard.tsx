import {Organizer} from "@/types/Organizer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import ImageWithFallback from "@/components/elements/ImageWithFallback";

export default async function MemberCard({member, lang}: { member: Organizer, lang: 'ja' | 'en' }) {
  return <div className='flex flex-row gap-2 items-center'>
    <ImageWithFallback src={member.image ? `/organizers/${member.image}` : '/no_image.jpg'}
                       alt={lang === 'ja' ? member.name_ja : member.name_en}
                       className='rounded-tr-2xl rounded-bl-2xl w-20 h-20' width={80} height={80}/>
    <div className={'flex flex-col gap-2'}>
      <div className='text-lg'>
        {lang === 'ja' ? member.name_ja : member.name_en}
      </div>
      <div className='flex flex-row gap-1 h-6'>
        {
          member.twitter
            ?
            <Link href={`https://x.com/${member.twitter}`} target='_blank' rel='noopener noreferrer'
                  className='cursor-pointer'>
              <FontAwesomeIcon icon={faXTwitter} className='w-6 h-6' fixedWidth/>
            </Link>
            : <></>
        }
        {
          member.facebook
            ? <Link href={`https://www.facebook.com/${member.facebook}`} target='_blank' rel='noopener noreferrer'
                    className='cursor-pointer'>
              <FontAwesomeIcon icon={faFacebook} className='w-6 h-6' fixedWidth/>
            </Link>
            : <></>
        }
        {
          member.github
            ? <Link href={`https://github.com/${member.github}`} className='hover:opacity-50' target='_blank'
                    rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faGithub} className='w-6 h-6' fixedWidth/>
            </Link>
            : <></>
        }
      </div>
    </div>
  </div>
}