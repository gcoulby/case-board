// MapCardNode.tsx
import { NodeProps, Handle, Position } from '@xyflow/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'

export type MapNodeData = {
  label: string
  description?: string
  center: [number, number]
  marker?: [number, number]
}

export const MapCardNode = ({ data, selected }: NodeProps<MapNodeData>) => {
  const { label, description, tags, center, marker } = data
  const mapRef = useRef<L.Map | null>(null)

  // Prevent React Flow zoom/pan from interfering with Leaflet
  useEffect(() => {
    const container = document.querySelector('.leaflet-container')
    if (container) {
      container.addEventListener('wheel', (e) => e.stopPropagation(), { passive: false })
      container.addEventListener('mousedown', (e) => e.stopPropagation())
    }
  }, [])

  return (
    <div className={`bg-base-100 shadow-sm w-96 card transition-all ${selected ? 'border-info ring-2 ring-info' : 'border-neutral-700'}`}>
      <figure className="relative w-full h-48">
        <div className="z-[10000] absolute w-full h-full"></div>
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
          dragging={false}
          style={{ height: '100%', width: '100%' }}
          whenReady={({ target }) => {
            mapRef.current = target
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker && (
            <Marker position={marker}>
              <Popup>{label}</Popup>
            </Marker>
          )}
          <Marker position={marker} icon={new Icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />
        </MapContainer>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{label}</h2>
        {description && (
          <p>
            {description.slice(0, 50)}
            {description.length > 50 ? '...' : ''}
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
