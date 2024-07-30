import {Chair, Organizer} from "@/types/Organizer";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faXTwitter} from "@fortawesome/free-brands-svg-icons";

export default function SnsLinks({member}: { member: Organizer | Chair }) {
  return <div className='flex flex-row gap-4 h-6'>
    {
      member.twitter
        ?
        <Link href={`https://x.com/${member.twitter}`} target='_blank' rel='noopener noreferrer'
              className='cursor-pointer hover:opacity-50'>
          <FontAwesomeIcon icon={faXTwitter} className='w-6 h-6' fixedWidth/>
        </Link>
        : <></>
    }
    {
      member.facebook
        ? <Link href={`https://www.facebook.com/${member.facebook}`} target='_blank' rel='noopener noreferrer'
                className='cursor-pointer hover:opacity-50'>
          <FontAwesomeIcon icon={faFacebook} className='w-6 h-6' fixedWidth/>
        </Link>
        : <></>
    }
    {
      member.github
        ? <Link href={`https://github.com/${member.github}`} target='_blank' rel='noopener noreferrer'
                className='cursor-pointer hover:opacity-50'>
          <FontAwesomeIcon icon={faGithub} className='w-6 h-6' fixedWidth/>
        </Link>
        : <></>
    }
  </div>
}