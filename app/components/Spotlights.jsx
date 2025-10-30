"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import Image from "next/image"
import { clsx } from "clsx"

export default function Spotlights() {
  const leftSpotlight = useRef(null)
  const rightSpotlight = useRef(null)
  const [rotateStart, setRotateStart] = useState(-10)
  const [rotateDur, setRotateDur] = useState(3)
  const [horizontalOffset, setHoriztonalOffset] = useState(30)
  const [verticalOffset, setVerticalOffset] = useState(18)
  const [maxRotation, setMaxRotation] = useState(50)

  useEffect(() => {
    const setRotationSettings = () => {
      if (window.innerWidth >= 1440) {
        // Large desktop
        setHoriztonalOffset(24)
        setVerticalOffset(23)
        setMaxRotation(50)
      } else if (window.innerWidth >= 1200 && window.innerWidth < 1440) {
        // Med-large desktop
        setHoriztonalOffset(47)
        setVerticalOffset(32)
        setMaxRotation(50)
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1200) {
        // Med-small desktop
        setHoriztonalOffset(60)
        setVerticalOffset(36)
        setMaxRotation(50)
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        // Tablet
        setHoriztonalOffset(62)
        setVerticalOffset(30)
        setMaxRotation(47)
      } else {
        // Mobile
        setHoriztonalOffset(25)
        setVerticalOffset(20)
        setMaxRotation(20)
      }
    }
    window.addEventListener("resize", setRotationSettings)
    setRotationSettings()
    // Rotate animation for left spotlight
    gsap.fromTo(
      leftSpotlight.current,
      {
        rotate: rotateStart,
      },
      {
        rotate: maxRotation,
        yoyo: true,
        duration: rotateDur,
        repeat: -1,
      },
    )

    // Rotation animation for right spotlight
    gsap.fromTo(
      rightSpotlight.current,
      {
        rotate: -rotateStart,
      },
      {
        rotate: -maxRotation,
        yoyo: true,
        duration: rotateDur,
        repeat: -1,
      },
    )
  })
  //   useEffect(() => {
  // Set canvas size to stars image
  //     const setRotationSettings = () => {
  //       if (window.innerWidth >= 1024) {
  //         // Desktop
  //         setRotateDur(3)
  //         setRotateStart(-10)
  //         setRotateEnd(45)
  //       } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
  //         // Tablet
  //         setRotateDur(3)
  //         setRotateStart(-10)
  //         setRotateEnd(40)
  //       } else {
  //         // Mobile
  //         setRotateDur(3)
  //         setRotateStart(-10)
  //         setRotateEnd(35)
  //       }
  //     }
  //     window.addEventListener("resize", setRotationSettings)
  //     setRotationSettings()

  //
  //   })
  return (
    <div className="absolute inset-0 top-0 h-full w-full overflow-hidden">
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
