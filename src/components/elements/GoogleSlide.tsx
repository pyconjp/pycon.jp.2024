import {IframeHTMLAttributes} from "react";

export default function GoogleSlide({slideId, ...props}: {
  slideId: string,
  props?: IframeHTMLAttributes<HTMLIFrameElement>
}) {
  return <iframe
    src={`https://docs.google.com/presentation/d/${slideId}/embed?start=false&loop=false&delayms=60000`}
    width="960" height="569" allowFullScreen
    className='w-full h-full'
    {...props}
  />
}