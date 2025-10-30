"use client"

import Image from "next/image"
import { gsap } from "gsap"
import { useEffect, useState, useRef } from "react"

import { cloudDictionary } from "@/lib/cloudDictionary"

function Cloud({
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

  useEffect(() => {
    gsap.to(cloudRef.current, {
      autoAlpha: 1,
      delay: animationOffset * 0.1,
      duration: 3,
    })
  }, [])
  useEffect(() => {
    if (offsetIndex === 0 || offsetIndex === 1) {
      if (desktopEnabled) {
        setIsHidden(false)
      }
    } else {
      if (mobileEnabled) {
        setIsHidden(false)
      }
    }
  }, [offsetIndex])
  return (
    <Image
      ref={cloudRef}
      src={"./images/animation/clouds/" + imgSrc}
      height={height}
      width={width}
      alt={alt}
      hidden={isHidden}
      className="absolute opacity-0"
      style={{
        left: offset[offsetIndex].x + "%",
        top: offset[offsetIndex].y + "%",
        scale: offset[offsetIndex].scale,
      }}
    />
  )
}
export default function Clouds() {
  const [device, setDevice] = useState("desktop")
  const [offsetIndex, setOffsetIndex] = useState(0)

  useEffect(() => {
    const getSize = () => {
      if (window.innerWidth >= 1024) {
        setDevice("desktop")
        setOffsetIndex(0)
      } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
        setDevice("tablet")
        setOffsetIndex(1)
      } else {
        setDevice("mobile")
        setOffsetIndex(2)
      }
    }
    window.addEventListener("resize", getSize)
    getSize()
  }, [])
  const renderClouds = () => {
    return cloudDictionary.map((cloud, index) => {
      return (
        <Cloud
          key={index}
          imgSrc={cloud.imgSrc}
          height={cloud.height}
          width={cloud.width}
          mobileEnabled={cloud.mobileEnabled}
          desktopEnabled={cloud.desktopEnabled}
          offset={cloud.offset}
          offsetIndex={offsetIndex}
          animationOffset={cloud.animationOffset}
          device={device}
          alt="Cloud"
        />
      )
    })
  }
  return (
    <div className="absolute inset-0 top-0 h-full w-full overflow-hidden">
      {renderClouds()}
    </div>
  )
}
