import {MegaphoneIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {getDictionary} from "@/lib/dictionaries";
import {Announce} from "@/types/Announce";

export default async function AnnounceSection({announce, lang}: { announce: Announce[], lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  return (
    <section className='mt-20'>
      <div className="lg:w-8/12 w-11/12 mx-auto flex flex-col gap-6">
        {announce.map(({name, url}, index) => (
          <Link key={index} href={url} rel='noopener noreferrer' target='_blank' className='hover:opacity-80'>
            <div
              className="flex gap-6 bg-primary-500 text-white rounded-tr-[3rem] rounded-bl-[3rem] items-center py-4 lg:px-12 px-8 relative after:bg-secondary after:absolute after:w-full after:h-full after:-z-10 after:left-0 after:top-2.5 after:rounded-tr-[3rem] after:rounded-bl-[3rem]">
              <MegaphoneIcon className="min-h-6 min-w-6 max-h-6 max-w-6 hidden lg:block"/>
              <div className="flex flex-col gap-2 justify-items-center">
                <div className="text-2xl">
                  <div className='flex flex-row gap-2 items-center justify-center lg:justify-start'>
                    <MegaphoneIcon className="h-6 w-6 lg:hidden inline-flex"/>
                    <div>
                      {dictionary.announce[name as keyof typeof dictionary.announce].title}
                    </div>
                  </div>
                </div>
                <div className="xl:whitespace-normal lg:whitespace-pre-line">
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