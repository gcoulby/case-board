'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactFlow, Background, Controls, Node, Edge, ReactFlowProvider, useNodesState, MiniMap, useUpdateNodeInternals } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { CaseNodeData } from '@/types'
import { EditForm } from './EditForm'
import { CaseCardNode } from './nodes/CaseCardNode'
import { TopToolbar } from './toolbar/top-toolbar'
// import { SidebarContent } from './sidebar-content'
import { SelectedCardInfo } from './selected-card-info'
import { MapCardNode } from './nodes/MapNode'

const initialNodes: Node<CaseNodeData>[] = [
  {
    id: '1',
    type: 'caseCard',
    position: { x: -100, y: -200 },
    data: {
      label: 'Suspect A',
      tags: ['knife', 'motive'],
      imageUrl: 'https://placehold.co/200x100',
      description: 'This is a description',
    },
  },
  {
    id: '2',
    type: 'caseCard',
    position: { x: 400, y: 100 },
    data: {
      label: 'Crime Scene',
      tags: ['knife'],
      description: '',
      imageUrl: 'https://th.bing.com/th/id/OIP.U_VJuupQohwnzXcKMztqWgHaEo?w=253&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
    },
  },
  {
    id: '3',
    type: 'caseCard',
    position: { x: 650, y: -40 },
    data: { label: 'Witness B', tags: ['motive'], description: '' },
  },
  {
    id: '4',
    type: 'caseCard',
    position: { x: -650, y: -160 },
    data: { label: 'Witness C', tags: [], description: '' },
  },
  {
    id: 'map-node-1',
    type: 'mapCard',
    position: { x: 100, y: 100 },
    data: {
      label: 'Incident Location',
      description: 'Reported disturbance near the river',
      tags: ['knife'],
      center: [51.505, -0.09],
      marker: [51.505, -0.09],
    },
  },
]

function generateEdgesFromTags(nodes: Node<CaseNodeData>[]): Edge[] {
  const tagMap = new Map<string, Node[]>()
  const edges: Edge[] = []

  // Build tag-to-nodes map
  nodes.forEach((node) => {
    node.data.tags.forEach((tag) => {
      if (!tagMap.has(tag)) tagMap.set(tag, [])
      tagMap.get(tag)!.push(node)
    })
  })

  // For each tag group, connect nodes in pairs
  tagMap.forEach((nodeGroup) => {
    for (let i = 0; i < nodeGroup.length; i++) {
      for (let j = i + 1; j < nodeGroup.length; j++) {
        const source = nodeGroup[i].id
        const target = nodeGroup[j].id
        const id = `e-${source}-${target}`

        // Avoid duplicates
        if (!edges.some((e) => (e.source === source && e.target === target) || (e.source === target && e.target === source))) {
          edges.push({
            id,
            source,
            target,
            type: 'straight',
            style: { stroke: '#555', strokeWidth: 1 },
          })
        }
      }
    }
  })

  return edges
}

export const CaseBoard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const edges = useMemo(() => generateEdgesFromTags(nodes), [nodes])
  // Inside CaseBoard
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [selectedNodeLabel, setSelectedNodeLabel] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [newCardFormOpen, setNewCardFormOpen] = useState(false)
  const [updatedNodeId, setUpdatedNodeId] = useState('')

  const updateNodeInternals = useUpdateNodeInternals()

  useEffect(() => {
    if (updatedNodeId) {
      updateNodeInternals(updatedNodeId)
      setUpdatedNodeId('')
    }
  }, [updatedNodeId, updateNodeInternals])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!editOpen && e.key === 'e' && selectedNodeId) {
        e.preventDefault()
        setEditOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNodeId, editOpen])

  const nodeTypes = {
    caseCard: CaseCardNode,
    mapCard: MapCardNode,
  }

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [globalTags, setGlobalTags] = useState<string[]>(['suspect', 'witness', 'location', 'evidence', 'weapon'])
  const [lastSaved, setLastSaved] = useState<string>('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  // const { user, logout } = useAuth()

  const toggleOfflineMode = useCallback(() => {
    if (!isOfflineMode) {
      // Going offline - logout user and switch to local storage
      // if (user) {
      //   logout()
      // }
      setIsOfflineMode(true)
    } else {
      // Going online - keep current data but allow login
      setIsOfflineMode(false)
    }
  }, [isOfflineMode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case 'n':
          e.preventDefault()
          setNewCardFormOpen(true)
          break
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            console.log('Save Data')
            // saveBoardData()
          }
          break
        case '/':
          e.preventDefault()
          document.getElementById('search-input')?.focus()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <TopToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDrawerToggle={() => setDrawerOpen(!drawerOpen)}
        onNewCard={() => setNewCardFormOpen(true)}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={() => {}}
        isOfflineMode={isOfflineMode}
        onOfflineToggle={toggleOfflineMode}
        onAuthDialogOpen={() => setIsAuthDialogOpen(true)}
        onBoardManagerOpen={() => setIsBoardManagerOpen(true)}
      />
      <SelectedCardInfo selectedCardLabel={selectedNodeLabel} />

      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        fitView
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        edgesFocusable={false}
        proOptions={{ hideAttribution: true }}
        onSelectionChange={(e) => {
          const node = e.nodes?.[0]
          setSelectedNodeId(node?.id ?? null)
          setSelectedNodeLabel(node?.data.label ?? null)
        }}
      >
        <MiniMap nodeStrokeWidth={3} />
        <Background />
        <Controls />
      </ReactFlow>
      {editOpen && selectedNodeId && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-base-100 p-6 rounded-lg w-1/3 card">
            <h2 className="mb-2 font-bold text-lg">Edit Card</h2>

            {/* Pre-fill node data */}
            <EditForm
              node={nodes.find((n) => n.id === selectedNodeId)!}
              onSave={(updated) => {
                setNodes((nds) => nds.map((n) => (n.id === selectedNodeId ? { ...n, data: updated } : n)))
                setEditOpen(false)
              }}
              onCancel={() => setEditOpen(false)}
            />
          </div>
        </div>
      )}

      {newCardFormOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-base-100 p-6 rounded-lg w-1/3 card">
            <h2 className="mb-2 font-bold text-lg">New Card</h2>

            {/* Pre-fill node data */}
            <EditForm
              node={undefined}
              onSave={(updated) => {
                const newId = crypto.randomUUID()
                const newNode = {
                  id: newId,
                  type: 'caseCard', // or your custom node type
                  position: { x: 300, y: 300 }, // adjust as needed or randomize
                  data: updated,
                }

                setNodes((nds) => [...nds, newNode])
                setNewCardFormOpen(false)
              }}
              onCancel={() => setNewCardFormOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}

// Use this in your app entry point:
export default function CaseBoardWrapper() {
  return (
    <ReactFlowProvider>
      <CaseBoard />
    </ReactFlowProvider>
  )
}
