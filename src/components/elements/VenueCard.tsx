import GoogleMap from "@/components/elements/GoogleMap";
import {googleMapUrl} from "@/data/venue";
import Image from "next/image";

export default function VenueCard({type, heading, venue}: {
  type: "conference" | "sprint",
  heading: { location: string, address: string, access: string },
  venue: { location: string, address: string, access: string, date: string }
}) {
  const keys = ['location', 'address', 'access'] as const;

  return <div className='relative bg-white mt-16'>
    {[
      'top-0 left-0 border-t-4 border-l-4 border-secondary-500',
      'top-0 right-0 border-t-4 border-r-4 border-secondary-500',
      'bottom-0 left-0 border-b-4 border-l-4 border-secondary-500',
      'bottom-0 right-0 border-b-4 border-r-4 border-secondary-500',
    ].map(
      (className, index) => <div key={index} className={'lg:h-11 lg:w-11 h-7 w-7 border-solid absolute ' + className}/>
    )}
    <div className='mx-auto my-auto object-contain h-full w-full flex lg:px-8 py-10 flex-col gap-6'>
      <div className='w-full text-center'>
        <h3 className="font-bold font-manrope text-[2rem] leading-10">
          {type === "conference" ? "Conference" : "Sprint"}
        </h3>
        <h4 className='font-bold text-primary-400 text-lg'>
          {venue.date}
        </h4>
      </div>
      <div className='flex lg:flex-row flex-col gap-7'>
        <div className="lg:flex-[2_2_0%] lg:aspect-auto aspect-[2_/_1]">
          <GoogleMap url={googleMapUrl[type]}/>
        </div>
        <div className="lg:flex-[3_3_0%] flex flex-col lg:gap-8 gap-6">
          {keys.map((key, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <div className='flex flex-row gap-4 items-center'>
                <Image src={'/headline_icon.svg'} alt={key} width={24} height={24}/>
                <div className='text-xl font-bold'>{heading[key]}</div>
              </div>
              <p className='whitespace-break-spaces'>{venue[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}