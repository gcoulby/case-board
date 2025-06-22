import { EditFormProps } from '@/types'
import React from 'react'

export const EditForm: React.FC<EditFormProps> = ({ node, onSave, onCancel }) => {
  const [label, setLabel] = React.useState(node.data.label)
  const [tags, setTags] = React.useState(node.data.tags.join(', '))
  const [description, setDescription] = React.useState('') // extend your CaseNodeData later

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave({ label, tags: tags.split(',').map((t) => t.trim()) })
      }}
      className="space-y-3"
    >
      <div>
        <label className="block text-sm">Title</label>
        <input value={label} onChange={(e) => setLabel(e.target.value)} className="p-1 border rounded w-full" />
      </div>
      <div>
        <label className="block text-sm">Tags (comma separated)</label>
        <input value={tags} onChange={(e) => setTags(e.target.value)} className="p-1 border rounded w-full" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="bg-gray-200 px-3 py-1 rounded text-sm">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 px-3 py-1 rounded text-white text-sm">
          Save
        </button>
      </div>
    </form>
  )
}
