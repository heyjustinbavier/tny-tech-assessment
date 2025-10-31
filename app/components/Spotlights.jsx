"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function Spotlights() {
  const parallaxRef = useRef()
  const leftSpotlight = useRef(null)
  const rightSpotlight = useRef(null)
  const [rotateStart, setRotateStart] = useState(-10)
  const [horizontalOffset, setHorizontalOffset] = useState(40)
  const [verticalOffset, setVerticalOffset] = useState(36)
  const [maxRotation, setMaxRotation] = useState(50)

  useEffect(() => {
    const setRotationSettings = () => {
      if (window.innerWidth >= 1440) {
        // Large desktop
        setHorizontalOffset(24)
        setVerticalOffset(38)
        setMaxRotation(55)
      } else if (window.innerWidth >= 1200 && window.innerWidth < 1440) {
        // Med-large desktop
        setHorizontalOffset(27)
        setVerticalOffset(32)
        setMaxRotation(50)
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1200) {
        // Med-small desktop
        setHorizontalOffset(40)
        setVerticalOffset(36)
        setMaxRotation(50)
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        // Tablet
        setHorizontalOffset(42)
        setVerticalOffset(30)
        setMaxRotation(47)
      } else if (window.innerWidth >= 500 && window.innerWidth < 768) {
        // Mobile - Tablet Inbetween
        setHorizontalOffset(42)
        setVerticalOffset(30)
        setMaxRotation(40)
      } else {
        // Mobile
        setHorizontalOffset(75)
        setVerticalOffset(45)
        setMaxRotation(35)
      }
    }
    setRotationSettings()
    window.addEventListener("resize", setRotationSettings)

    const tweens = []
    // Scroll Based Rotation Block
    const leftTween = gsap.fromTo(
      leftSpotlight.current,
      {
        rotate: maxRotation,
      },
      {
        rotate: rotateStart,
        yoyo: true,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "0%",
          end: "+=100%",
          scrub: true,
        },
      },
    )
    tweens.push(leftTween)
    const rightTween = gsap.fromTo(
      rightSpotlight.current,
      {
        rotate: -maxRotation,
      },
      {
        rotate: -rotateStart,
        yoyo: true,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "0%",
          end: "+=100%",
          scrub: true,
        },
      },
    )
    tweens.push(rightTween)
    // End Scroll Based Rotation Block

    // Automatic Looping Rotation Block
    // Leaving this in here for now in case feedback requests for the spotlights to be animated on a loop independent of scroll
    // const leftTween = gsap.fromTo(
    //   leftSpotlight.current,
    //   {
    //     rotate: rotateStart,
    //   },
    //   {
    //     rotate: maxRotation,
    //     yoyo: true,
    //     duration: rotateDur,
    //     repeat: -1,
    //   },
    // )
    // tweens.push(leftTween)
    // const rightTween = gsap.fromTo(
    //   rightSpotlight.current,
    //   {
    //     rotate: -rotateStart,
    //   },
    //   {
    //     rotate: -maxRotation,
    //     yoyo: true,
    //     duration: rotateDur,
    //     repeat: -1,
    //   },
    // )
    // tweens.push(rightTween)
    // End Automatic Looping Rotation Block

    return () => {
      window.removeEventListener("resize", setRotationSettings)
      // Clean up tweens
      tweens.forEach((t) => t && t.kill && t.kill())
    }
  }, [maxRotation])

  return (
    <div
      ref={parallaxRef}
      className="absolute inset-0 top-0 h-full w-full overflow-hidden"
    >
      <Image
        ref={leftSpotlight}
        alt="Left Spotlight"
        className="absolute origin-bottom"
        style={{
          left: "-" + horizontalOffset + "%",
          bottom: "-" + verticalOffset + "%",
          transform: `rotate(${maxRotation}deg)`,
        }}
        src="./images/animation/light.webp"
        width={277}
        height={2000}
      />
      <Image
        ref={rightSpotlight}
        alt="Right Spotlight"
        className="absolute origin-bottom"
        style={{
          right: "-" + horizontalOffset + "%",
          bottom: "-" + verticalOffset + "%",
          transform: `rotate(-${maxRotation}deg)`,
        }}
        src="./images/animation/light.webp"
        width={277}
        height={2000}
      />
    </div>
  )
}
