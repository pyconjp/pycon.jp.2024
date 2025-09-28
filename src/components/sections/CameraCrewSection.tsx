import SectionSubTitle from "@/components/elements/SectionSubTitle";

interface CameraCrewSectionProps {
  lang: 'ja' | 'en';
  dictionary: any;
  cameraCrews: any[];
}

export default function CameraCrewSection({lang, dictionary, cameraCrews}: CameraCrewSectionProps) {

  return <section className="my-20 mx-auto lg:w-10/12 w-8/12">
    <SectionSubTitle title={'Camera Crews'} subtitle={dictionary.organizers.camera_crews}/>
    <div className='grid lg:grid-cols-5 grid-cols-1 lg:gap-y-10 gap-y-5 text-center'>
      {
        cameraCrews.map((reviewer, index) => (
          <div key={index}>
            {lang === 'ja' ? reviewer.name_ja || reviewer.name_en : reviewer.name_en || reviewer.name_ja}
          </div>
        ))
      }
    </div>
  </section>
}