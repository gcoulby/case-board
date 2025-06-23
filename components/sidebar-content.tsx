'use client'

import type React from 'react'

import { X, Edit, Shield } from 'lucide-react'
import { CaseNodeData } from '@/types'
// import { useAuth } from '@/lib/auth'
// import { TagManager } from '../tags/tag-manager'
// import type { CaseCard } from '@/types'

interface SidebarContentProps {
  onClose: () => void
  isOfflineMode: boolean
  hasUnsavedChanges: boolean
  lastSaved: string
  selectedCardData: CaseNodeData | null
  onEditCard: () => void
  globalTags: string[]
  onAddGlobalTag: (tag: string) => void
  onRemoveGlobalTag: (tag: string) => void
  allTags: string[]
  onExportBoard: () => void
  onImportBoard: (event: React.ChangeEvent<HTMLInputElement>) => void
  cardsCount: number
  connectionsCount: number
}

export function SidebarContent({
  onClose,
  isOfflineMode,
  hasUnsavedChanges,
  lastSaved,
  selectedCardData,
  onEditCard,
  globalTags,
  onAddGlobalTag,
  onRemoveGlobalTag,
  allTags,
  onExportBoard,
  onImportBoard,
  cardsCount,
  connectionsCount,
}: SidebarContentProps) {
  // const { user } = useAuth()

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-xl">TraceNote</h2>
          <p className="opacity-70 text-xs">Investigation Board</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Offline Mode Status */}
      {isOfflineMode && (
        <div className="mb-4 alert alert-warning">
          <Shield className="w-4 h-4" />
          <div className="flex-1">
            <div className="font-semibold text-xs">OFFLINE MODE</div>
            <div className="text-xs">Data stored locally for security</div>
          </div>
        </div>
      )}

      {/* Save Status */}
      <div className="mb-4 alert alert-info">
        <div className="flex-1">
          <div className="text-xs">{hasUnsavedChanges ? '⚠️ Unsaved changes' : '✅ All changes saved'}</div>
          {lastSaved && <div className="opacity-70 text-xs">Last saved: {new Date(lastSaved).toLocaleString()}</div>}
          {/* <div className="opacity-70 text-xs">Storage: {isOfflineMode ? 'Local (Offline)' : user ? `User: ${user.name}` : 'Guest'}</div> */}
        </div>
      </div>

      {/* Import/Export */}
      <div className="bg-base-100 shadow-lg mb-4 card">
        <div className="p-4 card-body">
          <h3 className="text-sm card-title">Data Management</h3>
          <div className="flex gap-2">
            <button className="flex-1 btn btn-primary btn-sm" onClick={onExportBoard}>
              Export
            </button>
            <label className="flex-1 btn btn-secondary btn-sm">
              Import
              <input type="file" accept=".json" onChange={onImportBoard} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Selected Card Properties */}
      {selectedCardData ? (
        <div className="space-y-4 mb-8">
          <div className="bg-base-100 shadow-lg card">
            <div className="p-4 card-body">
              <h3 className="text-sm card-title">Selected Card</h3>
              <div className="space-y-2">
                <div>
                  <div className="opacity-70 font-semibold text-xs">Title</div>
                  <div className="text-sm">{selectedCardData.label}</div>
                </div>
                {selectedCardData.description && (
                  <div>
                    <div className="opacity-70 font-semibold text-xs">Description</div>
                    <div className="text-sm">{selectedCardData.description}</div>
                  </div>
                )}
                <div>
                  <div className="opacity-70 font-semibold text-xs">Tags</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCardData.tags.map((tag, index) => (
                      <div key={index} className="badge badge-secondary badge-xs">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="justify-end mt-4 card-actions">
                <button className="btn btn-primary btn-sm" onClick={onEditCard}>
                  <Edit className="mr-1 w-3 h-3" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="opacity-50 mb-8 py-8 text-center">
          <div className="text-sm">No card selected</div>
          <div className="text-xs">Click on a card to view its properties</div>
        </div>
      )}

      {/* Global Tag Management */}
      <div className="bg-base-100 shadow-lg card">
        <div className="p-4 card-body">
          <h3 className="text-sm card-title">Tag Library</h3>
          {/* <TagManager tags={globalTags} onAddTag={onAddGlobalTag} onRemoveTag={onRemoveGlobalTag} allTags={allTags} /> */}
        </div>
      </div>

      {/* Stats */}
      <div className="shadow mt-4 stats stats-horizontal">
        <div className="py-2 stat">
          <div className="text-xs stat-title">Cards</div>
          <div className="text-lg stat-value">{cardsCount}</div>
        </div>
        <div className="py-2 stat">
          <div className="text-xs stat-title">Connections</div>
          <div className="text-lg stat-value">{connectionsCount}</div>
        </div>
        <div className="py-2 stat">
          <div className="text-xs stat-title">Tags</div>
          <div className="text-lg stat-value">{allTags.length}</div>
        </div>
      </div>
    </div>
  )
}
