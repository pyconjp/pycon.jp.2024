import {ReactNode} from "react";

export default function SprintCard({children}: { children: ReactNode }) {
  return <div className='bg-primary-50 rounded px-8 py-5'>
    {children}
  </div>;
}