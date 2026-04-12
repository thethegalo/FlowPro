"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface PulseMarker {
  id: string
  location: [number, number]
  delay: number
}

interface GlobePulseProps {
  markers?: PulseMarker[]
  className?: string
  speed?: number
  dark?: number
}

const defaultMarkers: PulseMarker[] = [
  { id: "pulse-1", location: [51.51, -0.13], delay: 0 },
  { id: "pulse-2", location: [40.71, -74.01], delay: 0.5 },
  { id: "pulse-3", location: [35.68, 139.65], delay: 1 },
  { id: "pulse-4", location: [-33.87, 151.21], delay: 1.5 },
  { id: "pulse-5", location: [-23.55, -46.63], delay: 2.0 },
]

export function GlobePulse({
  markers = defaultMarkers,
  className = "",
  speed = 0.008,
  dark = 1,
}: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const globeRef = useRef<any>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 200,
          theta: (e.clientY - pointerInteracting.current.y) / 500,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let phi = 0
    let animationId: number

    const init = () => {
      const width = canvas.offsetWidth
      if (width === 0) return
      
      if (globeRef.current) {
        globeRef.current.destroy()
      }

      const dpr = window.devicePixelRatio || 1

      try {
        globeRef.current = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: width, // O COBE usa width e height lógicos e dpr separadamente
          height: width,
          phi: 0,
          theta: 0.15,
          dark,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.1, 0.1, 0.2],
          markerColor: [124/255, 58/255, 237/255],
          glowColor: [0.15, 0.15, 0.2],
          markerElevation: 0.05,
          markers: markers.map((m) => ({ location: m.location, size: 0.08 })),
          onRender: (state) => {
            if (!isPausedRef.current) {
              phi += speed
            }
            state.phi = phi + phiOffsetRef.current + dragOffset.current.phi
            state.theta = 0.15 + thetaOffsetRef.current + dragOffset.current.theta
          },
        })
        
        canvas.style.opacity = "1"
      } catch (e) {
        console.error("Globe Error:", e)
      }
    }

    // Inicialização segura com ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width > 0) {
        init()
      }
    })
    
    resizeObserver.observe(canvas)

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }
      resizeObserver.disconnect()
    }
  }, [markers, speed, dark])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="w-full h-full opacity-0 transition-opacity duration-1000 cursor-grab"
        style={{ touchAction: "none" }}
      />
    </div>
  )
}
