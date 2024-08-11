import Image from "next/image";

export default function SectionTitle({title, subtitle, direction = 'up', color = 'primary'}: {
  title: string,
  subtitle: string,
  direction?: 'up' | 'down',
  color?: 'primary' | 'secondary',
}) {
  return <div
    className={'w-80 lg:w-auto relative text-white mx-auto flex items-center flex-col gap-2.5 ' + (direction === 'up' ? ' lg:mt-32 mt-16' : 'lg:mb-32 mb-16')}>
    <h1
      className={'font-manrope text-[2.375rem] leading-[2.5rem] lg:text-5xl font-semibold z-10 tracking-widest' + (direction === 'down' ? ' pt-6' : '')}>
      {title}
    </h1>
    <p className='z-10'>
      {subtitle}
    </p>
    <Image src={`/circle_${direction}_${color}.svg`} alt={title + ' background'}
           className={'absolute ' + (direction === 'up' ? '-bottom-0.5' : 'top-0')} width={428} height={172}/>
  </div>
}