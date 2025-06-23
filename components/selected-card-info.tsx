'use client'

interface SelectedCardInfoProps {
  selectedCardLabel: string | null
}

export function SelectedCardInfo({ selectedCardLabel }: SelectedCardInfoProps) {
  if (!selectedCardLabel) return null

  return (
    <div className="top-4 left-1/2 z-40 absolute bg-info px-3 py-1 rounded text-info-content text-sm -translate-x-1/2 transform">
      Selected: <span className="badge-outline badge">{selectedCardLabel}</span> (Press <span className="text-white kbd kbd-primary">E</span> to edit)
    </div>
  )
}
