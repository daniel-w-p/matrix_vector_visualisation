import type { SceneTransform2D } from './types'
import { worldToScenePoint2D } from './coordinates'

type Axes2DProps = {
  transform: SceneTransform2D
  axisExtent?: number
  stroke?: string
  strokeWidth?: number
}

export function Axes2D({
  transform,
  axisExtent = 20,
  stroke = '#6b7785',
  strokeWidth = 1.5,
}: Axes2DProps) {
  const [xAxisStartX, xAxisStartY] = worldToScenePoint2D([-axisExtent, 0], transform)
  const [xAxisEndX, xAxisEndY] = worldToScenePoint2D([axisExtent, 0], transform)
  const [yAxisStartX, yAxisStartY] = worldToScenePoint2D([0, -axisExtent], transform)
  const [yAxisEndX, yAxisEndY] = worldToScenePoint2D([0, axisExtent], transform)

  return (
    <g aria-hidden="true">
      <line
        x1={xAxisStartX}
        y1={xAxisStartY}
        x2={xAxisEndX}
        y2={xAxisEndY}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <line
        x1={yAxisStartX}
        y1={yAxisStartY}
        x2={yAxisEndX}
        y2={yAxisEndY}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  )
}
