"use client"

import { useState, useEffect } from "react"
import type { ViewportInfo } from "../types"

export function useViewport(): ViewportInfo {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    aspectRatio: 0,
    devicePixelRatio: 1,
    orientation: "portrait",
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setViewport({
        width,
        height,
        aspectRatio: width / height,
        devicePixelRatio: window.devicePixelRatio || 1,
        orientation: width > height ? "landscape" : "portrait",
      })
    }

    // Set initial value
    updateViewport()

    // Listen for resize events
    window.addEventListener("resize", updateViewport)
    window.addEventListener("orientationchange", updateViewport)

    return () => {
      window.removeEventListener("resize", updateViewport)
      window.removeEventListener("orientationchange", updateViewport)
    }
  }, [])

  return viewport
}
