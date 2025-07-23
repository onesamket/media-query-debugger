"use client"

import { useState, useRef } from "react"
import { X, Maximize2, Minimize2, RotateCcw } from "lucide-react"
import type { DeviceMockupProps } from "../types"
import { cn } from "../lib/utils"

export function DeviceMockup({
  device,
  scale = 0.5,
  isRotated = false,
  url,
  onClose,
  onScaleChange,
  onRotate,
  className,
  style,
}: DeviceMockupProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const currentWidth = isRotated ? device.height : device.width
  const currentHeight = isRotated ? device.width : device.height
  const currentUrl = url || (typeof window !== "undefined" ? window.location.origin : "")

  const handleRotate = () => {
    const newRotated = !isRotated
    onRotate?.(newRotated)
  }

  const handleScaleChange = (newScale: number) => {
    onScaleChange?.(newScale)
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4",
        isFullscreen && "p-0",
        className,
      )}
      style={style}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-60 flex items-center gap-2">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50">
          <div className="flex items-center gap-2 text-sm text-slate-300 mb-2">
            <span>{device.name}</span>
            <span className="text-slate-500">•</span>
            <span className="font-mono text-xs">
              {currentWidth}×{currentHeight}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRotate}
              className="text-slate-400 hover:text-slate-200 h-8 w-8 p-0 flex items-center justify-center rounded hover:bg-slate-700/50 transition-colors"
              title="Rotate device"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-slate-400 hover:text-slate-200 h-8 w-8 p-0 flex items-center justify-center rounded hover:bg-slate-700/50 transition-colors"
              title="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 h-8 w-8 p-0 flex items-center justify-center rounded hover:bg-slate-700/50 transition-colors"
              title="Close mockup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Device Frame */}
      <div className="transition-all duration-300">
        {device.category === "mobile" && (
          <div
            className="relative bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-slate-800"
            style={{
              width: (currentWidth + 40) * scale,
              height: (currentHeight + 80) * scale,
            }}
          >
            {/* Screen */}
            <div
              className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative"
              style={{
                width: currentWidth * scale,
                height: currentHeight * scale,
              }}
            >
              <iframe
                ref={iframeRef}
                src={currentUrl}
                className="w-full h-full border-none"
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  width: `${100 / scale}%`,
                  height: `${100 / scale}%`,
                }}
                title={`${device.name} Mockup`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
