import {ChevronDownIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {Menu} from "@/data/menu";

type Props = {
  menu: Menu;
  comingSoon: string;
}

const HeaderMenu = ({menu, comingSoon}: Props) => {
  return (
    <div className='relative'>
      <div className='peer text-black font-bold py-auto cursor-pointer flex items-center flex-col xl:flex-row' suppressHydrationWarning>
        <span>{menu.title}</span><ChevronDownIcon className='w-5 h-5 inline-block text-primary-200'/>
      </div>
      <div className='invisible hover:visible peer-hover:visible absolute -left-5'>
        <div className='flex flex-col bg-secondary-50 w-[246px] shadow rounded'>
          {
            menu.children.map(({title, url, isComingSoon}, index) =>
              <div key={index}>
                {
                  !isComingSoon
                    ? <Link href={url}>
                      <div className='hover:bg-primary-100 bg-primary-50 flex items-center py-2'>
                        <ChevronRightIcon className='w-5 h-5 ml-6 text-primary-400'/>
                        <span className='ml-2 text-alt-black' suppressHydrationWarning>{title}</span>
                      </div>
                    </Link>
                    : <div className='flex items-center py-2 opacity-75 bg-primary-50'>
                      <ChevronRightIcon className='w-5 h-5 ml-6 text-primary-400'/>
                      <span className='ml-2 text-alt-black' suppressHydrationWarning>
                        {title}
                        <br/>
                        <span className='text-sm'>{comingSoon}</span>
                      </span>
                    </div>
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default HeaderMenu;