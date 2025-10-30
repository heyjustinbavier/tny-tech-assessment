"use client"

import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useState, useRef } from "react"

import { cloudDictionary } from "@/lib/cloudDictionary"

gsap.registerPlugin(ScrollTrigger)
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
      className="cloud-wrapper absolute opacity-0"
      style={{
        left: offset[offsetIndex].x + "%",
        top: offset[offsetIndex].y + "%",
        scale: offset[offsetIndex].scale,
      }}
    />
  )
}
export default function Clouds() {
  const parallaxRef = useRef()
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

  useEffect(() => {
    const clouds = gsap.utils.toArray(".cloud-wrapper")
    const created = clouds.map((cloud, index) =>
      gsap.to(cloud, {
        yPercent: -20 - index,
        scale: 1,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }),
    )
    ScrollTrigger.refresh()

    return () => {
      created.forEach((t) => t && t.kill && t.kill())
      ScrollTrigger.getAll().forEach((st) => st && st.kill && st.kill())
    }
  }, [offsetIndex])

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
    <div
      ref={parallaxRef}
      className="absolute inset-0 top-0 m-auto h-full w-full max-w-[1200px] overflow-hidden"
    >
      {renderClouds()}
    </div>
  )
}
