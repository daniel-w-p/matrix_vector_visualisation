import { getVisibleWorldBounds2D, worldToScenePoint2D } from './coordinates'
import type { SceneTransform2D } from './types'

type Grid2DProps = {
  transform: SceneTransform2D
  step?: number
  stroke?: string
  strokeWidth?: number
}

export function Grid2D({
  transform,
  step = 1,
  stroke = '#d8dee7',
  strokeWidth = 1,
}: Grid2DProps) {
  const bounds = getVisibleWorldBounds2D(transform)
  const clampedStep = step > 0 ? step : 1

  const minX = Math.floor(bounds.minX / clampedStep) * clampedStep
  const maxX = Math.ceil(bounds.maxX / clampedStep) * clampedStep
  const minY = Math.floor(bounds.minY / clampedStep) * clampedStep
  const maxY = Math.ceil(bounds.maxY / clampedStep) * clampedStep

  const verticalLines: number[] = []
  for (let x = minX; x <= maxX + clampedStep * 0.5; x += clampedStep) {
    verticalLines.push(Number(x.toFixed(8)))
  }

  const horizontalLines: number[] = []
  for (let y = minY; y <= maxY + clampedStep * 0.5; y += clampedStep) {
    horizontalLines.push(Number(y.toFixed(8)))
  }

  return (
    <g aria-hidden="true">
      {verticalLines.map((xValue) => {
        const [x] = worldToScenePoint2D([xValue, 0], transform)

        return (
          <line
            key={`grid-x-${xValue}`}
            x1={x}
            y1={0}
            x2={x}
            y2={transform.height}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        )
      })}

      {horizontalLines.map((yValue) => {
        const [, y] = worldToScenePoint2D([0, yValue], transform)

        return (
          <line
            key={`grid-y-${yValue}`}
            x1={0}
            y1={y}
            x2={transform.width}
            y2={y}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        )
      })}
    </g>
  )
}
