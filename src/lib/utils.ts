import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatViewportSize(width: number, height: number): string {
  return `${width} × ${height}`
}

export function getDeviceCategory(width: number): "mobile" | "tablet" | "desktop" {
  if (width < 768) return "mobile"
  if (width < 1024) return "tablet"
  return "desktop"
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
