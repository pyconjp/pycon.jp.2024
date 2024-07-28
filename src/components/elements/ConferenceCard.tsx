import Image from "next/image";
import {ReactNode} from "react";

export default function ConferenceCard({name, date, image, children}: {
  name: string,
  date: string,
  image: string,
  children: ReactNode,
}) {
  return <div>
    <div className='flex lg:flex-row flex-col gap-6 lg:w-7/12 mx-auto items-center lg:items-start'>
      <div
        className='relative after:bg-secondary after:absolute after:w-full after:h-full after:-z-10 after:top-2 after:left-2 after:rounded-tl-3xl after:rounded-br-3xl max-w-7/12 lg:w-auto'>
        <Image src={image} alt={name} width={350} height={350}
               className='relative rounded-tl-3xl rounded-br-3xl'/>
      </div>
      <div className='flex-1 flex flex-col gap-2 lg:gap-4 w-11/12 lg:w-auto'>
        <p className='text-tertiary-400'>
          {date}
        </p>
        <h4 className='text-2xl font-bold'>
          {name}
        </h4>
        <p className='text-tertiary-500'>
          {children}
        </p>
      </div>
    </div>
  </div>
}