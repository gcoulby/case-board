"use client"

import { WifiOff, Wifi, Shield } from "lucide-react"

interface OfflineToggleProps {
  isOfflineMode: boolean
  onToggle: () => void
}

export function OfflineToggle({ isOfflineMode, onToggle }: OfflineToggleProps) {
  return (
    <div className="flex-none ml-2">
      <button
        className={`btn btn-sm ${isOfflineMode ? "btn-error" : "btn-ghost"}`}
        onClick={onToggle}
        title={isOfflineMode ? "Working OFFLINE - Click to go online" : "Click to work OFFLINE (secure mode)"}
      >
        {isOfflineMode ? (
          <>
            <Shield className="h-4 w-4 mr-1" />
            <WifiOff className="h-4 w-4" />
          </>
        ) : (
          <Wifi className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}
