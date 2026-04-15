export type Point2D = readonly [number, number]

export type SceneTransform2D = {
  width: number
  height: number
  pixelsPerUnit: number
  originX: number
  originY: number
}

export type WorldBounds2D = {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export type HandleClamp2D = Partial<WorldBounds2D>
