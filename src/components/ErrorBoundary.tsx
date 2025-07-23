"use client"

import type React from "react"
import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Breakpoint Debugger Error:", error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="fixed bottom-6 right-6 z-50 w-96">
          <div className="bg-red-900/20 border border-red-500/30 backdrop-blur-xl rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-semibold">Debugger Error</h3>
            </div>
            <p className="text-sm text-red-300 mb-3">
              The breakpoint debugger encountered an error. This might be due to browser compatibility or a temporary
              issue.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1 border border-red-500/30 text-red-400 hover:bg-red-900/20 rounded text-sm transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
