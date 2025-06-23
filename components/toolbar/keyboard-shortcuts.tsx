"use client"

import { Keyboard } from "lucide-react"

export function KeyboardShortcuts() {
  return (
    <div className="flex-none ml-2">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-sm">
          <Keyboard className="h-4 w-4" />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <span className="text-xs">
              <kbd className="kbd kbd-xs">N</kbd> New Card
            </span>
          </li>
          <li>
            <span className="text-xs">
              <kbd className="kbd kbd-xs">E</kbd> Edit Selected
            </span>
          </li>
          <li>
            <span className="text-xs">
              <kbd className="kbd kbd-xs">Ctrl+S</kbd> Save
            </span>
          </li>
          <li>
            <span className="text-xs">
              <kbd className="kbd kbd-xs">/</kbd> Focus Search
            </span>
          </li>
          <li>
            <span className="text-xs">
              <kbd className="kbd kbd-xs">Esc</kbd> Close/Deselect
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
