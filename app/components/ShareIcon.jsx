"use client"

import Image from "next/image"

export default function ShareIcon({
  height,
  width,
  imgSrc,
  altText,
  shareLink,
}) {
  return (
    <Image
      src={imgSrc}
      onClick={() => {
        window.open(shareLink, "_blank")
      }}
      width={width}
      height={height}
      alt={altText}
      className="w-full scale-80 px-3 hover:cursor-pointer md:scale-100 md:px-4"
    />
  )
}
