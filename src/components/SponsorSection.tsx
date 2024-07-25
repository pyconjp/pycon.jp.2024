import {getDictionary} from "@/dictionaries";

export default async function SponsorSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang)

  return <section>
    <div className='w-full flex items-center flex-col'>
      <h1>
        Sponsor
      </h1>
      <p>
        {dictionary.overview.subtitle}
      </p>
    </div>
    <div>
      <h2>
        Diamond
      </h2>
      <div>
        {dictionary.sponsor.subtitle_diamond}
      </div>
    </div>
    <div>
      <h2>
        Platinum
      </h2>
      <div>
        {dictionary.sponsor.subtitle_platinum}
      </div>
    </div>
    <div>
      <h2>
        Gold
      </h2>
      <div>
        {dictionary.sponsor.subtitle_gold}
      </div>
    </div>
    <div>
      <h2>
        Silver
      </h2>
      <div>
        {dictionary.sponsor.subtitle_silver}
      </div>
    </div>
  </section>
}