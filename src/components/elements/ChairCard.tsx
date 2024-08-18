import {Chair} from "@/types/Organizer";
import Image from "next/image";
import SnsLinks from "@/components/elements/SnsLinks";
import dynamic from "next/dynamic";

export default function ChairCard({chair, filename}: { chair: Chair, filename: string }) {
  const ChairContents = dynamic(() => import(`@/components/markdown/${filename}.mdx`), {ssr: true});

  return <div className='flex flex-col gap-4 lg:items-start items-center'>
    <div
      className='relative after:bg-secondary after:absolute after:w-full after:h-full after:-z-10 after:top-2 after:left-2 after:rounded-tl-2xl after:rounded-br-2xl max-w-7/12 lg:w-auto mx-auto'>
      <Image src={chair.image} alt={chair.name} width={300} height={300} className='rounded-tl-2xl rounded-br-2xl'/>
    </div>
    <h3 className='text-3xl text-black text-center w-full'>
      {chair.name}
    </h3>
    <SnsLinks member={chair}/>
    <div className='prose prose-a:text-primary-500'>
      <ChairContents/>
    </div>
  </div>;
}