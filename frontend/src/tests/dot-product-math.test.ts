import { describe, expect, it } from 'vitest'

import {
  angleBetweenVectorsRadians,
  dotSignState,
  normalizeVector2,
  projectionOfSourceOnTarget,
  safeCosineBetweenVectors,
} from '../modules/dotProduct/dotProductMath'

describe('dot product math helpers', () => {
  it('classifies sign state around zero threshold', () => {
    expect(dotSignState(2)).toBe('positive')
    expect(dotSignState(-0.5)).toBe('negative')
    expect(dotSignState(0.01)).toBe('zero')
  })

  it('computes projection of source on target', () => {
    const projection = projectionOfSourceOnTarget([3, 3], [2, 0])

    expect(projection.isValid).toBe(true)
    expect(projection.projectedVector[0]).toBeCloseTo(3)
    expect(projection.projectedVector[1]).toBeCloseTo(0)
  })

  it('returns invalid projection for zero target', () => {
    const projection = projectionOfSourceOnTarget([1, 2], [0, 0])
    expect(projection.isValid).toBe(false)
    expect(projection.projectedVector).toEqual([0, 0])
  })

  it('computes cosine and angle for orthogonal vectors', () => {
    expect(safeCosineBetweenVectors([1, 0], [0, 2])).toBeCloseTo(0)
    expect(angleBetweenVectorsRadians([1, 0], [0, 2])).toBeCloseTo(Math.PI / 2)
  })

  it('normalizes a vector to unit length', () => {
    const normalized = normalizeVector2([3, 4])
    expect(normalized?.[0]).toBeCloseTo(0.6)
    expect(normalized?.[1]).toBeCloseTo(0.8)
  })
})
