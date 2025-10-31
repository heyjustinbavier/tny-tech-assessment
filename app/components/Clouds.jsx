"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useState, useRef } from "react"

import Cloud from "@/components/Cloud"
import { cloudDictionary } from "@/lib/cloudDictionary"

gsap.registerPlugin(ScrollTrigger)

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

    return () => {
      window.removeEventListener("resize", getSize)
    }
  }, [])

  useEffect(() => {
    const clouds = gsap.utils.toArray(".cloud-wrapper")
    const tweens = clouds.map((cloud, index) => {
      gsap.to(cloud, {
        yPercent: 45 - index,
        xPercent: index % 2 === 0 ? 5 : -5,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: () => `+=${parallaxRef.current.offsetHeight}`,
          scrub: true,
        },
      })
    })
    ScrollTrigger.refresh()

    return () => {
      // Clean up tweens
      tweens.forEach((t) => t && t.kill && t.kill())
    }
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
    <div
      ref={parallaxRef}
      className="absolute inset-0 top-0 m-auto h-full w-full max-w-[1200px]"
    >
      {renderClouds()}
    </div>
  )
}
