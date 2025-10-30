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
  const [rotateDur, setRotateDur] = useState(3)
  const [horizontalOffset, setHorizontalOffset] = useState(30)
  const [verticalOffset, setVerticalOffset] = useState(18)
  const [maxRotation, setMaxRotation] = useState(55)

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
      } else {
        // Mobile
        setHorizontalOffset(35)
        setVerticalOffset(42)
        setMaxRotation(22)
      }
    }
    window.addEventListener("resize", setRotationSettings)
    setRotationSettings()
    // Scroll based rotate
    gsap.fromTo(
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
          //   markers: true,
        },
      },
    )
    gsap.fromTo(
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
          //   markers: true,
        },
      },
    )
    // Auto rotate
    // gsap.fromTo(
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
    // gsap.fromTo(
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
  }, [maxRotation])

  return (
    <div
      ref={parallaxRef}
      className="absolute inset-0 top-0 h-full w-full overflow-hidden"
    >
      <Image
        ref={leftSpotlight}
        alt="Left Spotlight"
        src="./images/animation/light.webp"
        style={{
          left: "-" + horizontalOffset + "%",
          bottom: "-" + verticalOffset + "%",
          transform: `rotate(${maxRotation}deg)`,
        }}
        className="absolute origin-bottom"
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
