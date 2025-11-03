"use client"

import Image from "next/image"

export default function ShareIcon({
  height,
  width,
  imgSrc,
  altText,
  shareLink,
  shareLabel,
}) {
  return (
    <a href={shareLink} aria-label={shareLabel}>
      <Image
        src={imgSrc}
        onClick={() => {
          window.open(shareLink, "_blank")
        }}
        width={width}
        height={height}
        alt={altText}
        className="w-full scale-70 px-3 pt-4 hover:cursor-pointer md:scale-100 md:px-4"
      />
    </a>
  )
}
