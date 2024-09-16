import {IframeHTMLAttributes} from "react";

export default function GoogleMap({url, ...props}: {
  url: string,
  props?: IframeHTMLAttributes<HTMLIFrameElement>
}) {
  return <iframe
    src={url}
    loading={"lazy"}
    allowFullScreen
    width="100%"
    height="100%"
    {...props}
  />
}