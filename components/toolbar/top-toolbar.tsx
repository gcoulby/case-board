'use client'

import { Menu, Plus, Save } from 'lucide-react'
import { SearchBar } from './search-bar'
import { KeyboardShortcuts } from './keyboard-shortcuts'
import { OfflineToggle } from './offline-toggle'
// import { UserMenu } from './user-menu'

interface TopToolbarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  onDrawerToggle: () => void
  onNewCard: () => void
  hasUnsavedChanges: boolean
  onSave: () => void
  isOfflineMode: boolean
  onOfflineToggle: () => void
  onAuthDialogOpen: () => void
  onBoardManagerOpen: () => void
}

export function TopToolbar({
  searchTerm,
  onSearchChange,
  onDrawerToggle,
  onNewCard,
  hasUnsavedChanges,
  onSave,
  isOfflineMode,
  onOfflineToggle,
}: // onAuthDialogOpen,
// onBoardManagerOpen,
TopToolbarProps) {
  return (
    <div className="top-4 left-4 z-50 absolute flex items-center gap-2">
      <div className="bg-base-200 shadow-lg px-3 rounded-lg h-12 min-h-0 navbar">
        <div className="flex">
          <button className="btn btn-ghost btn-sm" onClick={onDrawerToggle}>
            <Menu className="w-4 h-4" />
          </button>
          <div className="ms-1 me-3 mt-0.5 font-bold text-lg">TraceNote</div>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

        <div className="flex-none">
          <button className="btn btn-primary btn-sm" onClick={onNewCard}>
            <Plus className="mr-1 w-4 h-4" />
            New Card <span className="kbd kbd-sm">N</span>
          </button>
        </div>

        <div className="flex-none ml-2">
          <button
            className={`btn btn-sm ${hasUnsavedChanges ? 'btn-warning' : 'btn-success'}`}
            onClick={onSave}
            title={hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
          >
            <Save className="w-4 h-4" />
          </button>
        </div>

        <OfflineToggle isOfflineMode={isOfflineMode} onToggle={onOfflineToggle} />
        <KeyboardShortcuts />
        {/* <UserMenu isOfflineMode={isOfflineMode} onAuthDialogOpen={onAuthDialogOpen} onBoardManagerOpen={onBoardManagerOpen} /> */}
      </div>
    </div>
  )
}
