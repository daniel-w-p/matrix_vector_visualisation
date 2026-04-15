import { sampleArcPoints2D, formatPointsForSvg } from './geometry'
import { worldToScenePoint2D } from './coordinates'
import type { Point2D, SceneTransform2D } from './types'

type AngleArc2DProps = {
  transform: SceneTransform2D
  center: Point2D
  radiusInWorldUnits: number
  startAngle: number
  endAngle: number
  stroke?: string
  strokeWidth?: number
}

export function AngleArc2D({
  transform,
  center,
  radiusInWorldUnits,
  startAngle,
  endAngle,
  stroke = '#d97706',
  strokeWidth = 2,
}: AngleArc2DProps) {
  const centerScene = worldToScenePoint2D(center, transform)
  const radius = Math.max(0, radiusInWorldUnits * transform.pixelsPerUnit)
  const points = sampleArcPoints2D(centerScene, radius, startAngle, endAngle)

  return (
    <polyline
      points={formatPointsForSvg(points)}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden="true"
    />
  )
}
