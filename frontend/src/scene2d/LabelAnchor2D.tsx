import { worldToScenePoint2D } from './coordinates'
import type { Point2D, SceneTransform2D } from './types'

type LabelAnchor2DProps = {
  transform: SceneTransform2D
  position: Point2D
  text: string
  offset?: Point2D
  textColor?: string
  backgroundColor?: string
  fontSize?: number
}

export function LabelAnchor2D({
  transform,
  position,
  text,
  offset = [8, -8],
  textColor = '#1e2a38',
  backgroundColor = '#ffffffcc',
  fontSize = 12,
}: LabelAnchor2DProps) {
  const [x, y] = worldToScenePoint2D(position, transform)

  return (
    <g aria-label={text}>
      <text
        x={x + offset[0]}
        y={y + offset[1]}
        fill={textColor}
        fontSize={fontSize}
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        paintOrder="stroke"
        stroke={backgroundColor}
        strokeWidth={4}
        strokeLinejoin="round"
      >
        {text}
      </text>
    </g>
  )
}
