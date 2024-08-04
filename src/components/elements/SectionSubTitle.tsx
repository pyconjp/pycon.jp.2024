export default function SectionSubTitle({title, subtitle}: { title: string, subtitle: string }) {
  return <div className='w-full flex items-center flex-col my-10 gap-2.5'>
    <h2 className='text-3xl font-manrope text-primary font-bold'>{title}</h2>
    <p>{subtitle}</p>
  </div>;
}