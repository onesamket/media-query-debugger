"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "./useMediaQuery"
import type { BreakpointHookOptions } from "../types"
import { DEFAULT_BREAKPOINTS } from "../constants"

export function useBreakpoint(options: BreakpointHookOptions = {}) {
  const { breakpoints = DEFAULT_BREAKPOINTS, defaultBreakpoint = "xs" } = options

  const [currentBreakpoint, setCurrentBreakpoint] = useState(defaultBreakpoint)
  const breakpointQueries = Object.entries(breakpoints).map(([name, width]) => ({
    name,
    width,
  }))

  const queries = breakpointQueries.map((bp) => useMediaQuery(`(min-width: ${bp.width}px)`))

  useEffect(() => {
    // Find the largest matching breakpoint
    const matchingBreakpoints = breakpointQueries
      .filter((bp, index) => queries[index])
      .sort((a, b) => b.width - a.width)

    const newBreakpoint = matchingBreakpoints.length > 0 ? matchingBreakpoints[0].name : defaultBreakpoint

    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint)
    }
  }, [queries.join(","), currentBreakpoint, defaultBreakpoint])

  return {
    current: currentBreakpoint,
    breakpoints: breakpointQueries.reduce(
      (acc, bp, index) => ({
        ...acc,
        [bp.name]: queries[index],
      }),
      {} as Record<string, boolean>,
    ),
    isAbove: (breakpoint: string) => {
      const targetWidth = breakpoints[breakpoint]
      if (!targetWidth) return false
      return breakpointQueries.some((bp, index) => bp.width >= targetWidth && queries[index])
    },
    isBelow: (breakpoint: string) => {
      const targetWidth = breakpoints[breakpoint]
      if (!targetWidth) return false
      return !breakpointQueries.some((bp, index) => bp.width >= targetWidth && queries[index])
    },
  }
}
