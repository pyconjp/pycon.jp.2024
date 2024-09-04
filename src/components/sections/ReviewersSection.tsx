import {getDictionary} from "@/lib/dictionaries";
import {getReviewers} from "@/lib/organizers";
import SectionSubTitle from "@/components/elements/SectionSubTitle";

export default async function ReviewersSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);
  const reviewers = await getReviewers();

  return <section className="my-20 mx-auto lg:w-10/12 w-8/12">
    <SectionSubTitle title={'Reviewers'} subtitle={dictionary.organizers.reviewers}/>
    <div className='grid lg:grid-cols-5 grid-cols-1 lg:gap-y-10 gap-y-5 text-center'>
      {
        reviewers.map((reviewer, index) => (
          <div key={index}>
            {lang === 'ja' ? reviewer.name_ja || reviewer.name_en : reviewer.name_en || reviewer.name_ja}
          </div>
        ))
      }
    </div>
  </section>
}