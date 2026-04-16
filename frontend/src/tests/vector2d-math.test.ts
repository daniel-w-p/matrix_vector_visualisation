import { describe, expect, it } from 'vitest'

import { computeVector2DOperation, formatVector2 } from '../modules/vector2d/vector2dMath'

describe('vector2d math helpers', () => {
  it('computes add operation', () => {
    const result = computeVector2DOperation('add', [2, 1], [3, -2], 1)

    expect(result.helperVector).toEqual([3, -2])
    expect(result.resultVector).toEqual([5, -1])
  })

  it('computes subtract operation via opposite helper vector', () => {
    const result = computeVector2DOperation('subtract', [2, 1], [3, -2], 1)

    expect(result.helperVector).toEqual([-3, 2])
    expect(result.resultVector).toEqual([-1, 3])
  })

  it('computes scale operation', () => {
    const result = computeVector2DOperation('scale', [2, -3], [0, 0], -0.5)

    expect(result.resultVector).toEqual([-1, 1.5])
  })

  it('formats vectors for algebra panel', () => {
    expect(formatVector2([1.5, -2])).toBe('[1.50, -2]')
  })
})
