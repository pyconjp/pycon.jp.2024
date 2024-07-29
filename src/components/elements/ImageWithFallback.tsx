"use client"

import Image from "next/image";
import {ComponentProps, useState} from "react";

export default function ImageWithFallback({...props}: ComponentProps<typeof Image>) {
  const [isError, setIsError] = useState(false)

  return (
    <Image
      {...props}
      alt={props.alt}
      onError={() => setIsError(true)}
      src={isError ? '/no_image.jpg' : props.src}
    />
  )
}