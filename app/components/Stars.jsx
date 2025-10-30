"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Stars() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const starsImageRef = useRef(null)
  const noiseMapRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d", { willReadFrequently: true })

    // Loader function for individual images
    const loadImage = async (src) => {
      const res = await fetch(src) // fetch uses same-origin
      const blob = await res.blob()
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = URL.createObjectURL(blob) // now same-origin for canvas
      })
    }

    // Draw images onto canvas, create mask, and animate the mask
    const loadAllImages = async () => {
      try {
        // Wait for the stars and noisemap images to laod
        const [starsImage, noiseMap] = await Promise.all([
          loadImage("/images/animation/stars.png"),
          loadImage("/images/animation/noisemap.png"),
        ])

        // Store images to refs
        starsImageRef.current = starsImage
        noiseMapRef.current = noiseMap

        // Set canvas size to stars image
        const setCanvasSize = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        // Create patterns
        const starsPattern = ctx.createPattern(starsImage, "repeat")
        const noisePattern = ctx.createPattern(noiseMap, "repeat")

        // Animation variables
        const offset = { x: 0, y: 0 }

        const animate = () => {
          // Draw the stars image onto the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = starsPattern
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Store the stars image data
          const starsData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const starsPixels = starsData.data

          // Draw tiled noise map with offset
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.save()
          ctx.translate(offset.x, offset.y)
          ctx.fillStyle = noisePattern
          ctx.fillRect(-offset.x, -offset.y, canvas.width, canvas.height)
          ctx.restore()

          // Get the noisemap data
          const noiesData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const noisePixels = noiesData.data

          // Apply noise map as alpha mask to stars
          for (let i = 0; i < starsPixels.length; i += 4) {
            const alpha = noisePixels[i] / 255
            starsPixels[i + 3] = starsPixels[i + 3] * alpha
          }

          // Draw the masked result to the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.putImageData(starsData, 0, 0)

          // Run every frame
          animationRef.current = requestAnimationFrame(animate)
        }

        setCanvasSize()

        window.addEventListener("resize", setCanvasSize)

        // Animate the offset for the noise map
        gsap.to(offset, {
          x: noiseMap.width,
          y: -noiseMap.height,
          duration: 40,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            // Wrap around
            if (offset.x <= -noiseMap.width) offset.x = 0
            if (offset.y <= -noiseMap.height) offset.y = 0
          },
        })
        // Draw stars
        animate()

        return () => {
          window.removeEventListener("resize", setCanvasSize)
        }
      } catch (error) {
        console.error("Error loading images:", error)
      }
    }

    loadAllImages()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 top-0 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
