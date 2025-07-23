"use client"

import { useState } from "react"
import { Monitor, ChevronDown, ChevronUp, X, Zap, Smartphone, Eye, Settings } from "lucide-react"
import type { Device, ResponsiveConfig, ViewportInfo } from "../types"
import { cn } from "../lib/utils"

interface DebuggerPanelProps {
  breakpoints: ResponsiveConfig
  devices: Device[]
  viewport: ViewportInfo
  breakpoint: any
  theme: "light" | "dark" | "auto"
  isMinimized: boolean
  onMinimize: (minimized: boolean) => void
  onClose: () => void
}

export function DebuggerPanel({
  breakpoints,
  devices,
  viewport,
  breakpoint,
  theme,
  isMinimized,
  onMinimize,
  onClose,
}: DebuggerPanelProps) {
  const [activeTab, setActiveTab] = useState("breakpoints")

  return (
    <div className="w-[420px] max-h-[85vh] overflow-hidden">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-lg">
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                <Monitor className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Breakpoint Debugger</h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onMinimize(!isMinimized)}
                className="w-8 h-8 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded flex items-center justify-center transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 px-2 py-1 rounded text-sm">
                {breakpoint.current.toUpperCase()}
              </div>
              <span className="text-sm font-mono text-slate-400">
                {viewport.width} × {viewport.height}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-slate-400">Live</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-0">
            {/* Tabs */}
            <div className="grid grid-cols-4 bg-slate-800/50 border-b border-slate-700/50">
              {[
                { id: "breakpoints", label: "Breakpoints", icon: Zap },
                { id: "devices", label: "Devices", icon: Smartphone },
                { id: "mockups", label: "Mockups", icon: Eye },
                { id: "tools", label: "Tools", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center justify-center gap-1 px-3 py-2 text-xs transition-colors",
                      activeTab === tab.id
                        ? "bg-slate-700 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="max-h-96 overflow-y-auto p-4">
              {activeTab === "breakpoints" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-200">Current Breakpoint</h4>
                    <div className="flex items-center gap-1 h-4">
                      {Object.entries(breakpoints).map(([name, width]) => (
                        <div
                          key={name}
                          className={cn(
                            "h-full flex-1 rounded-sm transition-all duration-300",
                            breakpoint.current === name
                              ? "bg-gradient-to-r from-blue-500 to-purple-500"
                              : "bg-slate-600",
                          )}
                          title={`${name}: ${width}px`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>xs</span>
                      {Object.keys(breakpoints).map((name) => (
                        <span key={name}>{name}</span>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-slate-700/50" />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-200">Media Query Status</h4>
                    <div className="space-y-2">
                      {Object.entries(breakpoints).map(([name, width]) => (
                        <div key={name} className="flex items-center justify-between">
                          <code className="text-xs bg-slate-800/50 text-slate-300 px-2 py-1 rounded border border-slate-700/50">
                            (min-width: {width}px)
                          </code>
                          <div
                            className={cn(
                              "text-xs px-2 py-1 rounded",
                              breakpoint.breakpoints[name]
                                ? "bg-green-600/20 border border-green-500/30 text-green-300"
                                : "bg-slate-700/50 border border-slate-600/50 text-slate-400",
                            )}
                          >
                            {breakpoint.breakpoints[name] ? "Active" : "Inactive"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "devices" && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-slate-200">Device Presets</h4>
                  <div className="grid gap-2">
                    {devices.map((device) => (
                      <div
                        key={device.name}
                        className="flex items-center justify-between p-3 rounded-lg border bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              device.category === "mobile"
                                ? "bg-green-600/20"
                                : device.category === "tablet"
                                  ? "bg-blue-600/20"
                                  : "bg-purple-600/20",
                            )}
                          >
                            <Smartphone
                              className={cn(
                                "w-4 h-4",
                                device.category === "mobile"
                                  ? "text-green-400"
                                  : device.category === "tablet"
                                    ? "text-blue-400"
                                    : "text-purple-400",
                              )}
                            />
                          </div>
                          <div>
                            <span className="text-sm font-medium text-slate-200">{device.name}</span>
                            <div className="text-xs text-slate-400">{device.userAgent}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-slate-400">
                            {device.width}×{device.height}
                          </span>
                          <div className="text-xs text-slate-500">{device.pixelRatio}x DPR</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add other tab contents here */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
