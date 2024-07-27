'use client';

import {useState} from "react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/20/solid";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      {isOpen
        ? <>
          <div
            className='fixed flex justify-center z-30 w-screen h-screen bg-white top-0 left-0 overscroll-contain overflow-y-scroll'>
            <button className='fixed top-4 right-3 p-2 bg-primary-500 rounded-tr-2xl rounded-bl-2xl'
                    onClick={close}>
              <XMarkIcon className='w-10 h-10 text-secondary-500 fix'/>
            </button>
            <div className='w-11/12 mt-28 bg-primary-50 h-4/6'>

            </div>
            <div className='h-[calc(100vh_+_1px)] w-0.5 bg-transparent'/>
          </div>
        </>
        : <button className='fixed top-4 right-3 p-2 bg-primary-500 rounded-tr-2xl rounded-bl-2xl' onClick={open}>
          <Bars3Icon className='w-10 h-10 text-secondary-500'/>
        </button>
      }
    </>
  );
}