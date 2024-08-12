import {announce} from "@/data/announce";
import {MegaphoneIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {getDictionary} from "@/lib/dictionaries";

export default async function AnnounceSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  return (
    <section className='mt-20'>
      <div className="lg:w-8/12 w-11/12 mx-auto">
        {announce.map(({name, url}, index) => (
          <Link key={index} href={url} rel='noopener noreferrer' target='_blank'>
            <div className="flex gap-6 bg-primary-500 text-white rounded-tr-3xl rounded-bl-3xl items-center p-4">
              <MegaphoneIcon className="min-h-6 min-w-6 max-h-6 max-w-6"/>
              <div className="flex flex-col gap-2 justify-items-center">
                <div className="text-2xl">
                  {dictionary.announce[name as keyof typeof dictionary.announce].title}
                </div>
                <div className="xl:whitespace-normal lg:whitespace-pre-line hidden lg:block">
                  {dictionary.announce[name as keyof typeof dictionary.announce].description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}