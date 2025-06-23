import { Node } from '@xyflow/react'
import { LatLngBounds } from 'react-leaflet'

export type CaseNodeData = {
  label: string
  tags: string[]
  description?: string
  imageUrl?: string
  center?: LatLngBounds
  marker?: LatLngBounds
}

export type EditFormProps = {
  node?: Node<CaseNodeData>
  onSave: (data: CaseNodeData) => void
  onCancel: () => void
}
