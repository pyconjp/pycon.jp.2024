import Image from "next/image";

export default function ConferenceCard({name, description, date, image}: {
  name: string,
  description: string,
  date: string,
  image: string
}) {
  return <div>
    <div className='flex lg:flex-row flex-col gap-6 w-7/12 mx-auto'>
      <div
        className='relative after:bg-secondary after:absolute after:w-full after:h-full after:-z-10 after:top-2 after:left-2 after:rounded-tl-3xl after:rounded-br-3xl'>
        <Image src={image} alt={name} width={350} height={350}
               className='relative rounded-tl-3xl rounded-br-3xl'/>
      </div>
      <div className='flex-1 flex flex-col gap-4'>
        <p className='text-tertiary-400'>
          {date}
        </p>
        <h4 className='text-2xl font-bold'>
          {name}
        </h4>
        <p className='text-tertiary-500'>
          {description}
        </p>
      </div>
    </div>
  </div>
}