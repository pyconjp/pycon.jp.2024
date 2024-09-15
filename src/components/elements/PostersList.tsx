import {Poster} from "@/types/Talk";
import PosterCard from "@/components/elements/PosterCard";

export default async function PostersList({posters}: { posters: Poster[] }) {
  return <div
    className='lg:w-10/12 w-11/12 mx-auto lg:mt-10 lg:mb-[4.5rem] mt-6 mb-16 lg:gap-10 gap-8 grid lg:grid-cols-2 grid-cols-1'>
    {posters.map((poster, index) => <PosterCard key={index} poster={poster}/>)}
  </div>
}