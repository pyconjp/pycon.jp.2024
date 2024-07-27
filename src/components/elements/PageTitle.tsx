import Image from "next/image";

export default function PageTitle({title, subTitle}: { title: string, subTitle: string }) {
  return <div
    className='relative w-full bg-secondary-50 text-primary-500 flex flex-col justify-center items-center lg:h-40 h-52 gap-2'>
    <h1
      className='text-4xl lg:text-5xl font-manrope tracking-widest text-center leading-normal font-semibold'>{title}</h1>
    <div className='text-sm lg:text-base'>{subTitle}</div>
    <Image src={'/circle_down_primary.svg'} alt={title + ' background1'}
           className={'absolute top-0 left-1.5 lg:left-28 h-12 lg:h-20 w-auto'}
           width={192} height={77}/>
    <Image src={'/title_bg_pc_up.svg'} alt={title + ' background2'}
           className={'hidden lg:block absolute bottom-0 right-0 h-24 w-auto'}
           width={215} height={99}/>
    <Image src={'/title_bg_sp_up.svg'} alt={title + ' background3'}
           className={'lg:hidden block absolute bottom-0 right-0 h-16 w-auto'}
           width={110} height={72}/>
    <Image src={'/title_bg_pc_down.svg'} alt={title + ' background4'}
           className={'hidden lg:block absolute -bottom-24 right-0 h-24 w-auto'}
           width={215} height={99}/>
    <Image src={'/title_bg_sp_down.svg'} alt={title + ' background3'}
           className={'lg:hidden block absolute -bottom-16 right-0 h-16 w-auto'}
           width={110} height={72}/>
  </div>
}