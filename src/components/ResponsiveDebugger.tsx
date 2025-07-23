"use client"

import { useState, useEffect } from "react"
import { Monitor } from "lucide-react"
import type { ResponsiveDebuggerProps } from "../types"
import { useViewport } from "../hooks/useViewport"
import { useBreakpoint } from "../hooks/useBreakpoint"
import { DEFAULT_BREAKPOINTS, DEFAULT_DEVICES, KEYBOARD_SHORTCUTS } from "../constants"
import { cn } from "../lib/utils"
import { DebuggerPanel } from "./DebuggerPanel"
import { ErrorBoundary } from "./ErrorBoundary"

export function ResponsiveDebugger({
  breakpoints = DEFAULT_BREAKPOINTS,
  devices = DEFAULT_DEVICES,
  position = "bottom-right",
  theme = "dark",
  defaultOpen = false,
  className,
  style,
  onBreakpointChange,
  onViewportChange,
  enableKeyboardShortcuts = true,
  keyboardShortcuts = KEYBOARD_SHORTCUTS,
}: ResponsiveDebuggerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [isMinimized, setIsMinimized] = useState(false)

  const viewport = useViewport()
  const breakpoint = useBreakpoint({ breakpoints })

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return

    const handleKeyDown = (event: KeyboardEvent) => {
      const { toggle, close } = keyboardShortcuts

      if (event.key === "Escape" && close === "escape" && isOpen) {
        setIsOpen(false)
        return
      }

      // Handle toggle shortcut (cmd+shift+d by default)
      if (toggle === "cmd+shift+d" && event.metaKey && event.shiftKey && event.key === "D") {
        event.preventDefault()
        setIsOpen(!isOpen)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [enableKeyboardShortcuts, keyboardShortcuts, isOpen])

  // Notify parent components of changes
  useEffect(() => {
    onBreakpointChange?.(breakpoint.current)
  }, [breakpoint.current, onBreakpointChange])

  useEffect(() => {
    onViewportChange?.(viewport)
  }, [viewport, onViewportChange])

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-6 left-6"
      case "top-right":
        return "top-6 right-6"
      case "bottom-left":
        return "bottom-6 left-6"
      case "bottom-right":
      default:
        return "bottom-6 right-6"
    }
  }

  const getBadgePosition = () => {
    switch (position) {
      case "top-left":
        return "top-24 left-6"
      case "top-right":
        return "top-24 right-6"
      case "bottom-left":
        return "bottom-24 left-6"
      case "bottom-right":
      default:
        return "bottom-24 right-6"
    }
  }

  if (!isOpen) {
    return (
      <ErrorBoundary>
        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "fixed z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-200 hover:scale-105",
            "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700",
            "border border-slate-600/50 backdrop-blur-sm",
            "flex items-center justify-center",
            getPositionClasses(),
            className,
          )}
          style={style}
          title="Open Breakpoint Debugger (⌘⇧D)"
        >
          <Monitor className="w-7 h-7 text-slate-200" />
        </button>

        {/* Mini Status Badge */}
        <div className={cn("fixed z-50", getBadgePosition())}>
          <div className="bg-slate-900/90 text-slate-200 backdrop-blur-sm border border-slate-700/50 px-3 py-1 rounded-full text-sm font-mono">
            {breakpoint.current.toUpperCase()} • {viewport.width}×{viewport.height}
          </div>
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className={cn("fixed z-50", getPositionClasses(), className)} style={style}>
        <DebuggerPanel
          breakpoints={breakpoints}
          devices={devices}
          viewport={viewport}
          breakpoint={breakpoint}
          theme={theme}
          isMinimized={isMinimized}
          onMinimize={setIsMinimized}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </ErrorBoundary>
  )
}
