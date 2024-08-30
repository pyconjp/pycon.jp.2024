import Link from "next/link";
import {ReactNode} from "react";

export default function TimetableToggleButton({lang, date}: { lang: 'ja' | 'en', date: 'day1' | 'day2' }) {
  const DateButton = ({buttonDate, children}: { buttonDate: 'day1' | 'day2', children: ReactNode }) => (
    <Link href={`/${lang}/timetable/${buttonDate}`}
          className={'font-montserrat text-lg flex-1 border-2 py-2 lg:py-6 border-primary-500 font-bold tracking-wide ' + (buttonDate === date ? 'bg-primary-500 text-white' : 'bg-white text-primary-500')}>
      {children}
    </Link>
  )

  return <div className="w-11/12 lg:w-10/12 mx-auto flex lg:gap-2.5 gap-3.5 flex-row mt-16">
    <DateButton buttonDate={'day1'}>
      <div className='flex flex-col lg:flex-row mx-auto lg:gap-1 justify-center items-center'>
        <div>DAY1</div>
        <div className='hidden lg:block'>-</div>
        <div>9.27(Fri.)</div>
      </div>
    </DateButton>
    <DateButton buttonDate={'day2'}>
      <div className='flex flex-col lg:flex-row mx-auto lg:gap-1 justify-center items-center'>
        <div>DAY2</div>
        <div className='hidden lg:block'>-</div>
        <div>9.28(Sat.)</div>
      </div>
    </DateButton>
  </div>;
}