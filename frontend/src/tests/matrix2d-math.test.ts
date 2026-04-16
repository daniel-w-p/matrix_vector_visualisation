import { describe, expect, it } from 'vitest'

import {
  buildTransformedGridLines,
  computeEffectiveMatrix,
  determinantState,
  transformedUnitSquare,
} from '../modules/matrix2d/matrix2dMath'

describe('matrix2d math helpers', () => {
  it('computes effective matrix for add/subtract/scale', () => {
    const a = [
      [1, 2],
      [3, 4],
    ] as const
    const b = [
      [2, 1],
      [0, 1],
    ] as const

    expect(computeEffectiveMatrix('add', a, b, 1)).toEqual([
      [3, 3],
      [3, 5],
    ])
    expect(computeEffectiveMatrix('subtract', a, b, 1)).toEqual([
      [-1, 1],
      [3, 3],
    ])
    expect(computeEffectiveMatrix('scale', a, b, -2)).toEqual([
      [-2, -4],
      [-6, -8],
    ])
  })

  it('builds transformed unit square from matrix columns', () => {
    const square = transformedUnitSquare([
      [2, 1],
      [0, 3],
    ])

    expect(square).toEqual([
      [0, 0],
      [2, 0],
      [3, 3],
      [1, 3],
    ])
  })

  it('classifies determinant state', () => {
    expect(determinantState(3)).toBe('positive')
    expect(determinantState(-2)).toBe('negative')
    expect(determinantState(0)).toBe('zero_exact')
    expect(determinantState(0.001)).toBe('zero_near')
  })

  it('builds transformed grid lines', () => {
    const lines = buildTransformedGridLines(
      [
        [1, 0],
        [0, 1],
      ],
      2,
      1,
    )

    expect(lines.length).toBeGreaterThan(0)
    expect(lines[0]).toHaveProperty('start')
    expect(lines[0]).toHaveProperty('end')
  })
})
