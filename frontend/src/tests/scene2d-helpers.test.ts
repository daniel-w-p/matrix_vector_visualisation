import { describe, expect, it } from 'vitest'

import {
  buildArrowHeadPoints2D,
  createSceneTransform2D,
  normalizeAngleRadians,
  sampleArcPoints2D,
  sceneToWorldPoint2D,
  worldToScenePoint2D,
} from '../scene2d'

describe('scene2d coordinate helpers', () => {
  it('converts between world and scene coordinates consistently', () => {
    const transform = createSceneTransform2D(400, 300, 20)
    const worldPoint: readonly [number, number] = [3, -2]
    const scenePoint = worldToScenePoint2D(worldPoint, transform)

    expect(scenePoint).toEqual([260, 190])
    expect(sceneToWorldPoint2D(scenePoint, transform)).toEqual([3, -2])
  })
})

describe('scene2d geometry helpers', () => {
  it('normalizes angles into [-pi, pi]', () => {
    expect(normalizeAngleRadians(Math.PI * 3)).toBeCloseTo(Math.PI)
    expect(normalizeAngleRadians(-Math.PI * 3)).toBeCloseTo(Math.PI)
    expect(normalizeAngleRadians(Math.PI / 2)).toBeCloseTo(Math.PI / 2)
  })

  it('samples arc points with predictable start and end points', () => {
    const points = sampleArcPoints2D([100, 100], 50, 0, Math.PI / 2, 4)

    expect(points[0][0]).toBeCloseTo(150)
    expect(points[0][1]).toBeCloseTo(100)
    expect(points.at(-1)?.[0]).toBeCloseTo(100)
    expect(points.at(-1)?.[1]).toBeCloseTo(50)
    expect(points).toHaveLength(5)
  })

  it('builds arrowhead points behind tip on a horizontal vector', () => {
    const [tip, left, right] = buildArrowHeadPoints2D([10, 10], [30, 10], 8, 6)

    expect(tip).toEqual([30, 10])
    expect(left[0]).toBeCloseTo(22)
    expect(right[0]).toBeCloseTo(22)
    expect(left[1]).toBeCloseTo(13)
    expect(right[1]).toBeCloseTo(7)
  })
})
