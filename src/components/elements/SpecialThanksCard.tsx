import {SpecialThanks} from "@/types/SpecialThanks";
import ImageWithFallback from "@/components/elements/ImageWithFallback";
import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/20/solid";

export function SpecialThanksCard({specialThanks}: { specialThanks: SpecialThanks }) {
  return <div className='relative'>
    {[
      'top-0 left-0 border-t-4 border-l-4 border-secondary-500',
      'top-0 right-0 border-t-4 border-r-4 border-secondary-500',
      'bottom-0 left-0 border-b-4 border-l-4 border-secondary-500',
      'bottom-0 right-0 border-b-4 border-r-4 border-secondary-500',
    ].map(
      (className, index) => <div key={index} className={'lg:h-11 lg:w-11 h-7 w-7 border-solid absolute ' + className}/>
    )}
    <div
      className='mx-auto my-auto object-contain h-full w-full flex px-6 lg:px-8 py-10 lg:py-12 flex-col lg:flex-row gap-6 lg:items-center'>
      <div className='flex-1 lg:mx-auto mx-14'>
        <ImageWithFallback src={`/special-thanks/${specialThanks.image}`} alt={specialThanks.name}
                           width={160} height={160} className='aspect-square w-full m-auto object-contain inset-0'/>
      </div>
      <div className='flex-1 lg:flex-[2_2_0%] flex flex-col gap-5 items-center lg:items-start'>
        <div className='flex flex-col gap-0.5 items-center lg:items-start'>
          <div className='font-medium text-xl'>
            {specialThanks.name}
          </div>
          <div>
            {specialThanks.title}
          </div>
          <div>
            <Link href={specialThanks.url} target='_blank' rel="noopener noreferrer"
                  className='hover:opacity-80 text-primary-500 inline-flex items-center flex-row underline'>
              <div>プロフィールページ</div>
              <ArrowTopRightOnSquareIcon className='ml-1 min-h-5 min-w-5 max-h-5 max-w-5'/>
            </Link>
          </div>
        </div>
        <div className='p-2 bg-primary-50'>
          {specialThanks.contribution}
        </div>
      </div>
    </div>
  </div>
}