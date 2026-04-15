import type { Point2D, SceneTransform2D, WorldBounds2D } from './types'

export function createSceneTransform2D(
  width: number,
  height: number,
  pixelsPerUnit: number,
  origin: Point2D = [width / 2, height / 2],
): SceneTransform2D {
  return {
    width,
    height,
    pixelsPerUnit,
    originX: origin[0],
    originY: origin[1],
  }
}

export function worldToScenePoint2D(
  worldPoint: Point2D,
  transform: SceneTransform2D,
): Point2D {
  const [x, y] = worldPoint

  return [
    transform.originX + x * transform.pixelsPerUnit,
    transform.originY - y * transform.pixelsPerUnit,
  ]
}

export function sceneToWorldPoint2D(
  scenePoint: Point2D,
  transform: SceneTransform2D,
): Point2D {
  const [x, y] = scenePoint

  return [
    (x - transform.originX) / transform.pixelsPerUnit,
    (transform.originY - y) / transform.pixelsPerUnit,
  ]
}

export function getVisibleWorldBounds2D(transform: SceneTransform2D): WorldBounds2D {
  const topLeft = sceneToWorldPoint2D([0, 0], transform)
  const bottomRight = sceneToWorldPoint2D([transform.width, transform.height], transform)

  return {
    minX: Math.min(topLeft[0], bottomRight[0]),
    maxX: Math.max(topLeft[0], bottomRight[0]),
    minY: Math.min(topLeft[1], bottomRight[1]),
    maxY: Math.max(topLeft[1], bottomRight[1]),
  }
}

export function clampWorldPoint2D(worldPoint: Point2D, bounds: Partial<WorldBounds2D>): Point2D {
  let x = worldPoint[0]
  let y = worldPoint[1]

  if (bounds.minX !== undefined) x = Math.max(bounds.minX, x)
  if (bounds.maxX !== undefined) x = Math.min(bounds.maxX, x)
  if (bounds.minY !== undefined) y = Math.max(bounds.minY, y)
  if (bounds.maxY !== undefined) y = Math.min(bounds.maxY, y)

  return [x, y]
}

export function snapWorldPoint2D(worldPoint: Point2D, step?: number): Point2D {
  if (!step || step <= 0) {
    return worldPoint
  }

  const snap = (value: number) => Math.round(value / step) * step
  return [snap(worldPoint[0]), snap(worldPoint[1])]
}
