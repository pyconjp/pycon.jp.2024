import {getSprints} from "@/lib/sprints";
import SprintCard from "@/components/elements/SprintCard";
import SectionSubTitle from "@/components/elements/SectionSubTitle";
import {getDictionary} from "@/lib/dictionaries";

export default async function SprintSection({lang}: { lang: 'ja' | 'en' }) {
  const sprints = await getSprints();
  const dictionary = await getDictionary(lang);

  return <section className='lg:mt-8 mt-6 lg:mb-20 mb-14'>
    <div className="flex flex-col gap-6 mx-auto lg:w-10/12 w-11/12">
      <SectionSubTitle title={'List of Submitted Themes'} subtitle={dictionary.sprint.themes}/>
      {
        sprints.map(
          (sprint, index) => <SprintCard key={index}>
            <div className="flex flex-col gap-3 text-lg">
              <div className="whitespace-pre-line break-all">{sprint.title}</div>
              <div className="text-primary-600 text-sm">{sprint.leader}</div>
            </div>
          </SprintCard>
        )
      }
    </div>
  </section>
}