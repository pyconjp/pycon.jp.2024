import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/20/solid";
import ImageWithFallback from "@/components/elements/ImageWithFallback";

export default async function SponsorCard({name, profile, logo_image, url, title}: {
  name: string,
  url: string
  profile: string,
  logo_image: string,
  title?: string,
}) {
  return <div className='flex flex-col items-center lg:gap-4 gap-2'>
    <div className='relative bg-white w-full aspect-[2_/_1]'>
      {[
        'top-0 left-0 border-t-4 border-l-4 border-secondary-500',
        'top-0 right-0 border-t-4 border-r-4 border-secondary-500',
        'bottom-0 left-0 border-b-4 border-l-4 border-secondary-500',
        'bottom-0 right-0 border-b-4 border-r-4 border-secondary-500',
      ].map(
        (className, index) => <div key={index} className={'w-1/6 h-1/4 border-solid absolute ' + className}/>
      )}
      <ImageWithFallback src={logo_image ? `/sponsors/${logo_image}` : '/no_image_sponsor.jpg'}
                         fallback={'/no_image_sponsor.jpg'} alt={name} width={400} height={400}
                         className='mx-auto my-auto object-contain h-full w-full inset-0 absolute p-5'/>
    </div>
    <div>
      <Link href={url} target='_blank' rel="noopener noreferrer"
            className='text-primary-500 text-lg items-center inline-flex font-bold hover:opacity-80'>
        <div className="underline">{name}</div>
        <ArrowTopRightOnSquareIcon className='ml-1 min-h-6 min-w-6 max-h-6 max-w-6'/>
      </Link>
    </div>
    <div className={'text-center ' + (title ? '' : 'hidden')}>
      {title}
    </div>
    <p className='whitespace-pre-line'>
      {profile}
    </p>
  </div>
}