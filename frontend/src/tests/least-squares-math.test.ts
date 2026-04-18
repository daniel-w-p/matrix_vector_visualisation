import { describe, expect, it } from 'vitest'
import { computeLeastSquares4x2, type Matrix4x2, type Vector4 } from '../math'

describe('computeLeastSquares4x2', () => {
  it('returns near-zero residual for an exact case', () => {
    const matrix: Matrix4x2 = [
      [1, 0],
      [0, 1],
      [1, 1],
      [2, -1],
    ]
    const b: Vector4 = [2, -1, 1, 5] // exactly A * [2, -1]

    const result = computeLeastSquares4x2(matrix, b)

    expect(result.xStar[0]).toBeCloseTo(2, 8)
    expect(result.xStar[1]).toBeCloseTo(-1, 8)
    expect(result.residualNorm).toBeCloseTo(0, 8)
    expect(result.atResidual[0]).toBeCloseTo(0, 8)
    expect(result.atResidual[1]).toBeCloseTo(0, 8)
  })

  it('stays numerically stable for nearly dependent columns', () => {
    const matrix: Matrix4x2 = [
      [1, 1.01],
      [2, 2.02],
      [-1, -1.0],
      [0.5, 0.49],
    ]
    const b: Vector4 = [1.2, 2.3, -0.9, 0.7]

    const result = computeLeastSquares4x2(matrix, b)

    expect(Number.isFinite(result.xStar[0])).toBe(true)
    expect(Number.isFinite(result.xStar[1])).toBe(true)
    expect(Math.abs(result.normalDeterminant)).toBeLessThan(0.2)
    expect(Number.isFinite(result.residualNorm)).toBe(true)
  })
})
