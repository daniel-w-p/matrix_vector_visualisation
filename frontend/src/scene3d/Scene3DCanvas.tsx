import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'
import type { Point3D } from './types'

type Scene3DCanvasProps = {
  ariaLabel: string
  height?: number
  cameraPosition?: Point3D
  cameraFov?: number
  showGrid?: boolean
  children: ReactNode
  overlay?: ReactNode
}

export function Scene3DCanvas({
  ariaLabel,
  height = 360,
  cameraPosition = [5.2, 4.4, 5.2],
  cameraFov = 48,
  showGrid = true,
  children,
  overlay,
}: Scene3DCanvasProps) {
  return (
    <div className="scene3d-shell" style={{ height }} role="img" aria-label={ariaLabel}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov, near: 0.1, far: 120 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0)
        }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 8, 4]} intensity={0.9} />
        <directionalLight position={[-5, 3, -4]} intensity={0.35} />

        {showGrid && <gridHelper args={[12, 12, '#8393a7', '#d9e2ec']} />}

        {children}

        <OrbitControls makeDefault minDistance={3} maxDistance={26} />
      </Canvas>

      {overlay ? <div className="scene3d-overlay">{overlay}</div> : null}
    </div>
  )
}
