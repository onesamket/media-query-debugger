import type React from "react"

export interface Device {
  name: string
  width: number
  height: number
  category: "mobile" | "tablet" | "desktop"
  pixelRatio: number
  userAgent: string
}

export interface ResponsiveConfig {
  [key: string]: number
}

export interface ViewportInfo {
  width: number
  height: number
  aspectRatio: number
  devicePixelRatio: number
  orientation: "portrait" | "landscape"
}

export interface ResponsiveDebuggerProps {
  /**
   * Custom breakpoint configuration
   * @default { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }
   */
  breakpoints?: ResponsiveConfig

  /**
   * Custom device presets
   */
  devices?: Device[]

  /**
   * Initial position of the debugger
   * @default 'bottom-right'
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"

  /**
   * Theme configuration
   * @default 'dark'
   */
  theme?: "light" | "dark" | "auto"

  /**
   * Whether to show the debugger by default
   * @default false
   */
  defaultOpen?: boolean

  /**
   * Custom CSS class name
   */
  className?: string

  /**
   * Custom styles
   */
  style?: React.CSSProperties

  /**
   * Callback when breakpoint changes
   */
  onBreakpointChange?: (breakpoint: string) => void

  /**
   * Callback when viewport changes
   */
  onViewportChange?: (viewport: ViewportInfo) => void

  /**
   * Whether to enable keyboard shortcuts
   * @default true
   */
  enableKeyboardShortcuts?: boolean

  /**
   * Custom keyboard shortcuts
   */
  keyboardShortcuts?: {
    toggle?: string
    close?: string
  }
}

export interface DeviceMockupProps {
  device: Device
  scale?: number
  isRotated?: boolean
  url?: string
  onClose?: () => void
  onScaleChange?: (scale: number) => void
  onRotate?: (isRotated: boolean) => void
  className?: string
  style?: React.CSSProperties
}

export interface MediaQueryHookOptions {
  defaultMatches?: boolean
  matchMedia?: (query: string) => MediaQueryList
}

export interface BreakpointHookOptions {
  breakpoints?: ResponsiveConfig
  defaultBreakpoint?: string
}
