export default function SectionSubTitle({title, subtitle}: { title: string, subtitle: string }) {
  return <div className='w-full flex items-center flex-col my-10 gap-2.5'>
    <h2 className='lg:text-4xl text-[1.75rem] leading-8 font-manrope text-primary font-bold'>{title}</h2>
    <p>{subtitle}</p>
  </div>;
}