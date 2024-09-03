import Link from "next/link";
import Image from "next/image";
import menu from "@/data/menu";
import {getDictionary} from "@/lib/dictionaries";
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
                            <div>{dictionary.menu[child.title as keyof typeof dictionary.menu]}
                              <span className='text-sm'>{' ' + dictionary.menu.coming_soon}</span>
                            </div>
                          </div> :
                          <Link href={child.isExternal ? child.url : `/${lang}${child.url}`} className='text-secondary-500 hover:opacity-80'>
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
              <Link href='https://twitter.com/pyconjapan' target='_blank' rel="noopener noreferrer"
                    className='text-secondary-500 inline-flex items-center justify-between hover:opacity-80'>
                @pyconjapan
                <FontAwesomeIcon icon={faXTwitter} fixedWidth className='w-6 h-6 text-white'/>
              </Link>
              <div>
              </div>
              <Link href='https://www.facebook.com/PyConJP/' target='_blank' rel="noopener noreferrer"
                    className='text-secondary-500 inline-flex items-center justify-between hover:opacity-80'>
                @PyConJP
                <FontAwesomeIcon icon={faFacebook} fixedWidth className='w-6 h-6 text-white'/>
              </Link>
            </div>
            <div className='text-white'>
              {dictionary.footer.contact_us} : <Link href='mailto:2024-inquiry@pyconjp.atlassian.net'
                                                     className='text-secondary-500 hover:opacity-80'>2024-inquiry@pyconjp.atlassian.net</Link>
            </div>
          </div>
          <div className='text-white mt-3 whitespace-pre-line break-words'>
            {dictionary.footer.description}
          </div>
          <div className='inline-flex justify-end mt-8 lg:mt-0 underline'>
            <Link href='https://www.pycon.jp/organizer/index.html' rel='noopener noreferrer' target='_blank'
                  className='text-secondary-300 hover:opacity-80'>
              {dictionary.footer.past_events}
            </Link>
            <ArrowRightIcon className='h-6 text-secondary-300'/>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row gap-2 bg-white lg:gap-10 lg:max-w-[653px] items-center p-10">
          <Link href="https://www.pycon.jp/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
            <Image
              src='/logo_association.svg'
              alt="Pycon JP Association Logo"
              height={143}
              width={85}
              className="lg:w-64 w-32 p-2"
            />
          </Link>
          <div>
            <div className="text-black">
              主催: 一般社団法人PyCon JP Association PyCon JP 2024 is a production
              of the PyCon JP Association
            </div>
            <Link href='https://www.pycon.jp/policies/privacy-policy.html' target='_blank' rel='noopener noreferrer'
                  className='text-primary-300 underline text-sm hover:opacity-80'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
