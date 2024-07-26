import Link from "next/link";
import Image from "next/image";
import menu from "@/data/menu";
import {getDictionary} from "@/dictionaries";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import {ArrowRightIcon} from "@heroicons/react/20/solid";

export default async function Footer({lang}: { lang: 'ja' | 'en' }) {
  const dictionary = await getDictionary(lang);

  return (
    <footer>
      <div className='bg-primary-600 w-full'>
        <div className='w-11/12 lg:w-10/12 flex mx-auto py-12 flex-col'>
          <Image src='/logo_footer.svg' alt='logo' width={317} height={68}/>
          <div className='grid mt-11 grid-cols-none grid-rows-4 gap-10 lg:grid-cols-4 lg:grid-rows-none lg:gap-0'>
            {menu.map((item, index) =>
              <div key={index} className='flex flex-col gap-4'>
                <h4 className='text-white font-bold text-lg'>
                  {dictionary.menu[item.title as keyof typeof dictionary.menu]}
                </h4>
                <ul className='flex flex-col gap-2'>
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>
                      {
                        child.isComingSoon ?
                          <div className='text-secondary-700'>
                            {dictionary.menu[child.title as keyof typeof dictionary.menu]}<br/>{dictionary.menu.coming_soon}
                          </div> :
                          <Link href={child.url} className='text-secondary-500 text-sm'>
                            {dictionary.menu[child.title as keyof typeof dictionary.menu]}
                          </Link>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <hr className='border-white lg:mt-20 mt-10'/>
          <div className='flex flex-col gap-3 mt-4'>
            <div className='grid grid-cols-2 w-64 gap-4'>
              <div className='text-white'>
                Follow Us!
              </div>
              <div className=''>
                <Link href='https://twitter.com/pyconjapan' target='_blank' rel="noopener noreferrer"
                      className='text-secondary-500 inline-flex items-center justify-between'>
                  @pyconjapan
                  <FontAwesomeIcon icon={faXTwitter} fixedWidth className='w-6 h-6 text-white'/>
                </Link>
              </div>
              <div>
              </div>
              <div className='inline-flex items-center justify-between'>
                <Link href='https://www.facebook.com/PyConJP/' target='_blank' rel="noopener noreferrer"
                      className='text-secondary-500'>
                  @PyConJP
                </Link>
                <FontAwesomeIcon icon={faFacebook} fixedWidth className='w-6 h-6 text-white'/>
              </div>
            </div>
            <div className='text-white'>
              {dictionary.footer.contact_us} : <Link href='mailto:pyconjp@pycon.jp'
                                                     className='text-secondary-500'>pyconjp@pycon.jp</Link>
            </div>
          </div>
          <div className='text-white mt-3 whitespace-pre-line break-words'>
            {dictionary.footer.description}
          </div>
          <div className='inline-flex justify-end mt-8 lg:mt-0 underline'>
            <Link href='https://www.pycon.jp/organizer/index.html' rel='noopener noreferrer' target='_blank'
                  className='text-secondary-300'>
              {dictionary.footer.past_events}
            </Link>
            <ArrowRightIcon className='h-6 text-secondary-300'/>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row gap-2 bg-white lg:gap-10 lg:max-w-[653px] items-center p-10">
          <Link href="https://www.pycon.jp/" target="_blank" rel="noopener noreferrer">
            <Image
              src='/logo_association.svg'
              alt="Pycon JP Association Logo"
              height={143}
              width={85}
              className="lg:w-64 w-32 p-2"
            />
          </Link>
          <div className="text-black">
            主催: 一般社団法人PyCon JP Association PyCon JP 2024 is a production
            of the PyCon JP Association
          </div>
        </div>
      </div>
    </footer>
  );
}
