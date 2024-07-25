import Link from "next/link";
import Image from "next/image";

export default async function SponsorCard({name, description, img, url}: {
  name: string,
  description: string,
  img: string,
  url: string
}) {
  return <div className='flex flex-col items-center'>
    <div>
      <Image src={img} alt={name} width={200} height={200}/>
    </div>
    <div>
      <Link href={url}>{name}</Link>
    </div>
    <p>
      {description}
    </p>
  </div>
}