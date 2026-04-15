import { worldToScenePoint2D } from './coordinates'
import { formatPointsForSvg } from './geometry'
import type { Point2D, SceneTransform2D } from './types'

type AreaPolygon2DProps = {
  transform: SceneTransform2D
  points: readonly Point2D[]
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export function AreaPolygon2D({
  transform,
  points,
  fill = '#3b82f633',
  stroke = '#1d4ed8',
  strokeWidth = 1.5,
}: AreaPolygon2DProps) {
  const scenePoints = points.map((point) => worldToScenePoint2D(point, transform))

  return (
    <polygon
      points={formatPointsForSvg(scenePoints)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  )
}
