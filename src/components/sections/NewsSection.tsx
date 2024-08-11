import Link from "next/link";
import {parseISO, format} from 'date-fns'
import {getDictionary} from "@/lib/dictionaries";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {getBlogs} from "@/lib/blogger";


export default async function NewsSection({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);
  const blogs = await getBlogs();
  return <section className="mt-20">
    <div className='relative lg:w-8/12 w-11/12 mx-auto bg-primary-50 lg:px-8 px-4 py-8 rounded-tr-3xl rounded-bl-3xl'>
      <h1 className='absolute text-5xl left-0 -top-8 font-manrope text-primary'>News</h1>
      <div className="flex flex-col text-tertiary gap-2.5">
        {blogs.map((blog) => (
          <div key={blog.url} className="flex lg:flex-row flex-col text-lg">
            <div className="lg:w-32 inline-flex gap-1.5">
              <div className='h-4 w-4 bg-white mt-1.5 rounded-full'/>
              <div>
                {parseDate(blog.published)}
              </div>
            </div>
            <div className="flex-1">
              <Link href={blog.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                {blog.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='text-right'>
        <Link href='https://pyconjp.blogspot.com/'
              className='inline-flex items-center text-primary-600 text-lg underline pt-3 hover:opacity-80' target='_blank'
              rel="noopener noreferrer">
          {dictionary.news.read_more}<ArrowRightIcon className='w-4 h-4'/>
        </Link>
      </div>
    </div>
  </section>
}

function parseDate(dateString: string) {
  const date = parseISO(dateString);
  return format(date, 'yyyy.MM.dd');
}
