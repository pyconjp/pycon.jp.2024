import SectionSubTitle from "@/components/elements/SectionSubTitle";

interface ReviewersSectionProps {
  lang: 'ja' | 'en';
  dictionary: any;
  reviewers: any[];
}

export default function ReviewersSection({lang, dictionary, reviewers}: ReviewersSectionProps) {

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