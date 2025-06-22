'use client'
import React, { useMemo } from 'react'
import { ReactFlow, Background, Controls, Node, Edge, ReactFlowProvider, useNodesState, MiniMap } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { CaseNodeData } from '@/types'
import { EditForm } from './EditForm'

const initialNodes: Node<CaseNodeData>[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { label: 'Suspect A', tags: ['knife', 'motive'] },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { label: 'Crime Scene', tags: ['knife'] },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 250, y: 300 },
    data: { label: 'Witness B', tags: ['motive'] },
  },
  {
    id: '4',
    type: 'default',
    position: { x: 0, y: 200 },
    data: { label: 'Witness C', tags: [] },
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
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null)
  const [editOpen, setEditOpen] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!editOpen && e.key === 'e' && selectedNodeId) {
        e.preventDefault()
        setEditOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedNodeId, editOpen])

  return (
    <>
      <ReactFlow
        colorMode="dark"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        fitView
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
        edgesFocusable={false}
        proOptions={{ hideAttribution: true }}
        onSelectionChange={(e) => {
          const node = e.nodes?.[0]
          setSelectedNodeId(node?.id ?? null)
        }}
      >
        <MiniMap nodeStrokeWidth={3} />
        <Background />
        <Controls />
      </ReactFlow>
      {editOpen && selectedNodeId && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-[320px]">
            <h2 className="mb-2 font-bold text-lg">Edit Node</h2>

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
