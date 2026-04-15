import { worldToScenePoint2D } from './coordinates'
import { buildArrowHeadPoints2D, formatPointsForSvg } from './geometry'
import type { Point2D, SceneTransform2D } from './types'

type VectorArrow2DProps = {
  transform: SceneTransform2D
  start: Point2D
  end: Point2D
  stroke?: string
  strokeWidth?: number
  headLength?: number
  headWidth?: number
}

export function VectorArrow2D({
  transform,
  start,
  end,
  stroke = '#215fa6',
  strokeWidth = 2,
  headLength = 12,
  headWidth = 10,
}: VectorArrow2DProps) {
  const sceneStart = worldToScenePoint2D(start, transform)
  const sceneEnd = worldToScenePoint2D(end, transform)
  const headPoints = buildArrowHeadPoints2D(sceneStart, sceneEnd, headLength, headWidth)

  return (
    <g aria-hidden="true">
      <line
        x1={sceneStart[0]}
        y1={sceneStart[1]}
        x2={sceneEnd[0]}
        y2={sceneEnd[1]}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <polygon points={formatPointsForSvg(headPoints)} fill={stroke} />
    </g>
  )
}
