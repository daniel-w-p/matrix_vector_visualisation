import { Html, Line } from '@react-three/drei'

type Axes3DProps = {
  length?: number
  showLabels?: boolean
}

export function Axes3D({ length = 3.4, showLabels = true }: Axes3DProps) {
  return (
    <group>
      <Line points={[[-length, 0, 0], [length, 0, 0]]} color="#d14343" lineWidth={1.6} />
      <Line points={[[0, -length, 0], [0, length, 0]]} color="#2f8f3a" lineWidth={1.6} />
      <Line points={[[0, 0, -length], [0, 0, length]]} color="#3468d6" lineWidth={1.6} />

      {showLabels ? (
        <>
          <AxisLabel position={[length + 0.22, 0, 0]} text="x" />
          <AxisLabel position={[0, length + 0.22, 0]} text="y" />
          <AxisLabel position={[0, 0, length + 0.22]} text="z" />
        </>
      ) : null}
    </group>
  )
}

function AxisLabel({
  position,
  text,
}: {
  position: [number, number, number]
  text: string
}) {
  return (
    <Html position={position} center>
      <span className="scene3d-axis-label">{text}</span>
    </Html>
  )
}
