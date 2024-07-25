export default function ConferenceCard({name, description, date}: { name: string, description: string, date: string }) {
  return <div>
    <div className='flex lg:flex-row flex-col gap-8'>
      <div className='flex-1 bg-secondary'>
      </div>
      <div className='flex-1'>
        <p className='text-tertiary-400'>
          {date}
        </p>
        <h4>
          {name}
        </h4>
        <p>
          {description}
        </p>
      </div>
    </div>
  </div>
}