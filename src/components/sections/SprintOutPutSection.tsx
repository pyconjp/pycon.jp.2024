import {getSprints} from "@/lib/sprints";
import SectionSubTitle from "@/components/elements/SectionSubTitle";
import {getDictionary} from "@/lib/dictionaries";
import GoogleSlide from "@/components/elements/GoogleSlide";

export default async function SprintOutPutSection({lang}: { lang: 'ja' | 'en' }) {
  const sprints = await getSprints();
  const dictionary = await getDictionary(lang);

  return <section className='lg:mt-8 mt-6 lg:mb-20 mb-14'>
    <SectionSubTitle title={'Sprint Output'} subtitle={dictionary.sprint.output}/>
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-16 mx-auto lg:w-10/12 w-11/12">
      {
        sprints
          .filter(sprint => sprint.slideId)
          .map(
            (sprint, index) => <div key={index} className="flex flex-col gap-2 text-lg">
              <div className='w-full aspect-video'>
                <GoogleSlide slideId={sprint.slideId}/>
              </div>
              <div className={'text-center'}>
                <div>{sprint.title}</div>
                <div className='text-primary-600 text-sm'>{sprint.leader}</div>
              </div>
            </div>
          )
      }
    </div>
  </section>
}