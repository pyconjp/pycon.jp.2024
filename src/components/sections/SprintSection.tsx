import {getSprints} from "@/lib/sprints";
import SprintCard from "@/components/elements/SprintCard";

export default async function SprintSection() {
  const sprints = await getSprints();

  return <section className='lg:mt-8 mt-6 lg:mb-20 mb-14'>
    <div className="flex flex-col gap-6 mx-auto lg:w-10/12 w-11/12">
      {
        sprints.map(
          (sprint, index) => <SprintCard key={index}>
            <div className="flex flex-col gap-2 text-lg">
              <div>{sprint.leader}</div>
              <div className="whitespace-pre-line break-all">{sprint.description}</div>
            </div>
          </SprintCard>
        )
      }
    </div>
  </section>
}