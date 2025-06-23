// CaseCardNode.tsx
import { CaseNodeData } from '@/types'
import { NodeProps, Handle, Position } from '@xyflow/react'

export const CaseCardNode = ({ data, selected }: NodeProps) => {
  const { label, tags, imageUrl, description } = data as CaseNodeData

  return (
    <div className={`bg-base-100 shadow-sm w-96 card transition-all ${selected ? 'border-info ring-2 ring-info' : 'border-neutral-700'}`}>
      {imageUrl && (
        <figure>
          <img src={imageUrl} alt="Placeholder" className="w-full" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{label}</h2>
        {description && (
          <p>
            {description?.substring(0, 50)}
            {description?.length > 50 ? '...' : ''}
          </p>
        )}
        <div className="justify-end card-actions">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.map((tag: string, i: number) => (
                <span key={i} className="rounded badge-outline badge badge-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
