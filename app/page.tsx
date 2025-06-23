import { CaseBoard } from '@/components/CaseBoard'
import { ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

export default function Home() {
  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <CaseBoard />
      </ReactFlowProvider>
      {/* <button className="btn">Default</button> */}
    </div>
  )
}
