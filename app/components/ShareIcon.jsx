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
      className="w-full px-4 hover:cursor-pointer"
    />
  )
}
