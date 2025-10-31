"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import Image from "next/image"

export default function Cloud({
  imgSrc,
  height,
  width,
  alt,
  mobileEnabled,
  desktopEnabled,
  offset,
  offsetIndex,
  animationOffset,
}) {
  const [isHidden, setIsHidden] = useState(true)
  const cloudRef = useRef()

  // Fade in clouds
  useEffect(() => {
    gsap.to(cloudRef.current, {
      autoAlpha: 1,
      delay: animationOffset * 0.1,
      duration: 3,
    })
  }, [animationOffset])

  // Determine whether cloud should be visible based on device size
  useEffect(() => {
    if (offsetIndex === 0 || offsetIndex === 1) {
      if (desktopEnabled) {
        setIsHidden(false)
      } else {
        setIsHidden(true)
      }
    } else {
      if (mobileEnabled) {
        setIsHidden(false)
      } else {
        setIsHidden(true)
      }
    }
  }, [offsetIndex, desktopEnabled, mobileEnabled])
  return (
    <Image
      ref={cloudRef}
      src={"./images/animation/clouds/" + imgSrc}
      height={height}
      width={width}
      alt={alt}
      hidden={isHidden}
      loading="eager"
      className="cloud-wrapper absolute opacity-0"
      style={{
        left: offset[offsetIndex].x + "%",
        top: offset[offsetIndex].y + "%",
        scale: offset[offsetIndex].scale,
      }}
    />
  )
}
