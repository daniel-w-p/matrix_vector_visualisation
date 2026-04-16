import { describe, expect, it } from 'vitest'

import type { Matrix2x2, Vector2 } from '../math'
import {
  discriminant2x2,
  hasRealEigenvalues2x2,
  rayleighQuotient2D,
  sampleDirectionResiduals,
  verifyEigenCandidate2D,
} from '../modules/eigen/eigenMath'

describe('eigenMath', () => {
  it('gives exact Rayleigh quotient on an eigenvector', () => {
    const matrix: Matrix2x2 = [
      [3, 0],
      [0, -2],
    ]
    const eigenvector: Vector2 = [1.5, 0]

    expect(rayleighQuotient2D(matrix, eigenvector)).toBeCloseTo(3, 8)
  })

  it('detects no real eigenvalues for pure rotation', () => {
    const rotation: Matrix2x2 = [
      [0, -1],
      [1, 0],
    ]

    expect(discriminant2x2(rotation)).toBeLessThan(0)
    expect(hasRealEigenvalues2x2(rotation)).toBe(false)
  })

  it('residual is near zero for true eigenpair', () => {
    const matrix: Matrix2x2 = [
      [2, 0],
      [0, 1],
    ]
    const vector: Vector2 = [4, 0]

    const verification = verifyEigenCandidate2D(matrix, vector, 2)

    expect(verification.residual).toBeCloseTo(0, 8)
  })

  it('direction scan highlights at least one low-residual ray on diagonal matrix', () => {
    const matrix: Matrix2x2 = [
      [2, 0],
      [0, -1],
    ]

    const samples = sampleDirectionResiduals(matrix, 40, 3)
    const bestResidual = Math.min(...samples.map((sample) => sample.residual))

    expect(bestResidual).toBeLessThan(0.01)
  })
})
