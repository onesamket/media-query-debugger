"use client"

import { useState, useEffect } from "react"
import type { MediaQueryHookOptions } from "../types"

export function useMediaQuery(query: string, options: MediaQueryHookOptions = {}): boolean {
  const { defaultMatches = false, matchMedia } = options

  const [matches, setMatches] = useState(defaultMatches)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQueryList = (matchMedia || window.matchMedia)(query)

    const updateMatches = () => setMatches(mediaQueryList.matches)

    // Set initial value
    updateMatches()

    // Listen for changes
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", updateMatches)
      return () => mediaQueryList.removeEventListener("change", updateMatches)
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(updateMatches)
      return () => mediaQueryList.removeListener(updateMatches)
    }
  }, [query, matchMedia])

  return matches
}
