import {Patron} from "@/types/Sponsors";
import ImageWithFallback from "@/components/elements/ImageWithFallback";

export function PatronCard({patron}: { patron: Patron }) {
  return <div className='flex flex-col gap-3 items-center'>
    <div
      className='lg:max-w-[30%] max-w-[60%] aspect-square relative after:bg-secondary after:absolute after:w-full after:h-full after:z-0 after:top-1 after:left-1 after:rounded-tl-3xl after:rounded-br-3xl'>
      <ImageWithFallback src={`/patrons/${patron.image}`} alt={patron.name}
                         className='relative rounded-tl-3xl rounded-br-3xl z-10 bg-white' width={160} height={160}/>
    </div>
    <div className='text-lg font-bold text-center'>
      {patron.name}
    </div>
  </div>
}