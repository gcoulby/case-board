import { EditFormProps } from '@/types'
import React, { useState, FC } from 'react'

export const EditForm: FC<EditFormProps> = ({ node, onSave, onCancel }) => {
  const [label, setLabel] = useState(node?.data.label ?? '')
  const [tags, setTags] = useState(node?.data.tags.join(', ') ?? '')
  const [description, setDescription] = useState(node?.data.description ?? '') // extend your CaseNodeData later
  const [imageUrl, setImageUrl] = useState(node?.data.imageUrl ?? '') // extend your CaseNodeData later

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave({ label: label ?? '', tags: tags?.split(',').map((t) => t.trim()) ?? [], description, imageUrl })
      }}
      className="space-y-3"
    >
      <div>
        <label className="block text-sm">Title</label>
        <input type="text" className="w-full input" value={label} onChange={(e) => setLabel(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <textarea className="w-full textarea" onChange={(e) => setDescription(e.target.value)} value={description} rows={10} />
      </div>
      <div>
        <label className="block text-sm">Image URL</label>
        <input type="text" className="w-full input" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Tags (comma separated)</label>
        <input type="text" className="w-full input" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  )
}
