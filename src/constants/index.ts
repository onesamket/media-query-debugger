import type { ResponsiveConfig, Device } from "../types"

export const DEFAULT_BREAKPOINTS: ResponsiveConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export const DEFAULT_DEVICES: Device[] = [
  {
    name: "iPhone 14 Pro",
    width: 393,
    height: 852,
    category: "mobile",
    pixelRatio: 3,
    userAgent: "iPhone",
  },
  {
    name: "iPhone SE",
    width: 375,
    height: 667,
    category: "mobile",
    pixelRatio: 2,
    userAgent: "iPhone",
  },
  {
    name: "Samsung Galaxy S23",
    width: 384,
    height: 854,
    category: "mobile",
    pixelRatio: 3,
    userAgent: "Android",
  },
  {
    name: "iPad Air",
    width: 820,
    height: 1180,
    category: "tablet",
    pixelRatio: 2,
    userAgent: "iPad",
  },
  {
    name: "iPad Pro 12.9",
    width: 1024,
    height: 1366,
    category: "tablet",
    pixelRatio: 2,
    userAgent: "iPad",
  },
  {
    name: "MacBook Air",
    width: 1440,
    height: 900,
    category: "desktop",
    pixelRatio: 2,
    userAgent: "MacOS",
  },
  {
    name: "MacBook Pro 16",
    width: 1728,
    height: 1117,
    category: "desktop",
    pixelRatio: 2,
    userAgent: "MacOS",
  },
  {
    name: "Desktop 1080p",
    width: 1920,
    height: 1080,
    category: "desktop",
    pixelRatio: 1,
    userAgent: "Desktop",
  },
  {
    name: "Desktop 4K",
    width: 3840,
    height: 2160,
    category: "desktop",
    pixelRatio: 2,
    userAgent: "Desktop",
  },
]

export const KEYBOARD_SHORTCUTS = {
  toggle: "cmd+shift+d",
  close: "escape",
}
