import { Html } from '@react-three/drei'
import { useMemo } from 'react'
import { Quaternion, Vector3 } from 'three'
import type { Point3D } from './types'

type Vector3DArrowProps = {
  origin?: Point3D
  vector: Point3D
  color?: string
  label?: string
  thickness?: number
}

export function Vector3DArrow({
  origin = [0, 0, 0],
  vector,
  color = '#1f5faa',
  label,
  thickness = 0.06,
}: Vector3DArrowProps) {
  const metrics = useMemo(() => {
    const direction = new Vector3(vector[0], vector[1], vector[2])
    const length = direction.length()

    if (length < 1e-4) {
      return {
        length,
        quaternion: new Quaternion(),
        shaftLength: 0,
        headLength: 0,
        headRadius: 0,
      }
    }

    direction.normalize()
    const quaternion = new Quaternion().setFromUnitVectors(
      new Vector3(0, 1, 0),
      direction,
    )
    const headLength = Math.min(0.45, Math.max(0.2, length * 0.2))
    const shaftLength = Math.max(0.001, length - headLength)
    const headRadius = thickness * 2.3

    return {
      length,
      quaternion,
      shaftLength,
      headLength,
      headRadius,
    }
  }, [thickness, vector])

  if (metrics.length < 1e-4) {
    return (
      <mesh position={origin}>
        <sphereGeometry args={[thickness * 0.8, 12, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
    )
  }

  const labelPosition: Point3D = [vector[0] * 0.55, vector[1] * 0.55, vector[2] * 0.55]

  return (
    <group position={origin} quaternion={metrics.quaternion}>
      <mesh position={[0, metrics.shaftLength / 2, 0]}>
        <cylinderGeometry args={[thickness, thickness, metrics.shaftLength, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, metrics.shaftLength + metrics.headLength / 2, 0]}>
        <coneGeometry args={[metrics.headRadius, metrics.headLength, 14]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {label ? (
        <Html position={labelPosition} center>
          <span className="scene3d-vector-label">{label}</span>
        </Html>
      ) : null}
    </group>
  )
}
