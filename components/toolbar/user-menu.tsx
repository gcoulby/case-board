"use client"

import { User, LogOut, FolderOpen, Shield } from "lucide-react"
import { useAuth } from "@/lib/auth"

interface UserMenuProps {
  isOfflineMode: boolean
  onAuthDialogOpen: () => void
  onBoardManagerOpen: () => void
}

export function UserMenu({ isOfflineMode, onAuthDialogOpen, onBoardManagerOpen }: UserMenuProps) {
  const { user, logout } = useAuth()

  if (isOfflineMode) {
    return (
      <div className="flex-none ml-2">
        <div className="badge badge-error gap-1">
          <Shield className="h-3 w-3" />
          OFFLINE
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex-none ml-2">
        <button className="btn btn-primary btn-sm" onClick={onAuthDialogOpen}>
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="flex-none ml-2">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-sm">
          <User className="h-4 w-4 mr-1" />
          {user.name}
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
          <li>
            <button onClick={onBoardManagerOpen}>
              <FolderOpen className="h-4 w-4" />
              My Boards
            </button>
          </li>
          <li>
            <button onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
