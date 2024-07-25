export default function SponsorTitle({title, subtitle}: { title: string, subtitle: string }) {
  return <div className="py-5 flex flex-col items-center bg-[url('/sponsor_title_bg.svg')]">
    <h2 className="text-4xl font-manrope font-bold text-primary">
      {title}
    </h2>
    <div className='text-black'>
      {subtitle}
    </div>
  </div>;
}