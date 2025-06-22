import { Node } from '@xyflow/react'

export type CaseNodeData = {
  label: string
  tags: string[]
}

export type EditFormProps = {
  node: Node<CaseNodeData>
  onSave: (data: CaseNodeData) => void
  onCancel: () => void
}
