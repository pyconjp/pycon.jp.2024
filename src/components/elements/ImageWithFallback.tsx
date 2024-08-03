"use client"

import Image from "next/image";
import {ComponentProps, useState} from "react";

export default function ImageWithFallback({fallbackSrc = '/no_image.jpg', ...props}: ComponentProps<typeof Image> & {fallbackSrc ?: string}) {
  const [isError, setIsError] = useState(false)

  return (
    <Image
      {...props}
      alt={props.alt}
      onError={() => setIsError(true)}
      src={isError ? fallbackSrc : props.src}
    />
  )
}