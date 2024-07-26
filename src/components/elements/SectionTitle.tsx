import Image from "next/image";

export default function SectionTitle({title, subtitle, direction = 'up', color = 'primary', className = ''}: {
  title: string,
  subtitle: string,
  direction?: 'up' | 'down',
  color?: 'primary' | 'secondary',
  className?: string,
}) {
  return <div className={'relative text-white w-80 mx-auto flex items-center flex-col gap-2.5 ' + className}>
    <h1 className='font-manrope text-5xl font-semibold z-10'>
      {title}
    </h1>
    <p className='z-10'>
      {subtitle}
    </p>
    <Image src={`/title_${direction}_${color}.svg`} alt={title + ' background'}
           className={'absolute ' + (direction === 'up' ? '-bottom-0.5' : 'top-0')} width={428}
           height={172}/>
  </div>
}