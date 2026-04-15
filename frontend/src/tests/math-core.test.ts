import { describe, expect, it } from 'vitest'

import {
  addMatrix2x2,
  addMatrix3x3,
  addVector2,
  addVector3,
  crossVector3,
  determinant2x2,
  determinant3x3,
  dotVector2,
  dotVector3,
  multiplyMatrix2x2ByVector2,
  multiplyMatrix3x3ByVector3,
  scaleMatrix2x2,
  scaleMatrix3x3,
  scaleVector2,
  scaleVector3,
  subtractMatrix2x2,
  subtractMatrix3x3,
  subtractVector2,
  subtractVector3,
  verifyEigenPair2D,
  verifyEigenPair3D,
} from '../math'

describe('Vector math', () => {
  it('supports add, subtract, and scale in 2D', () => {
    expect(addVector2([2, -1], [3, 5])).toEqual([5, 4])
    expect(subtractVector2([2, -1], [3, 5])).toEqual([-1, -6])
    expect(scaleVector2([2, -1], -2)).toEqual([-4, 2])
  })

  it('supports add, subtract, and scale in 3D', () => {
    expect(addVector3([1, 2, 3], [4, -1, 0])).toEqual([5, 1, 3])
    expect(subtractVector3([1, 2, 3], [4, -1, 0])).toEqual([-3, 3, 3])
    expect(scaleVector3([1, 2, 3], 0)).toEqual([0, 0, 0])
  })

  it('computes dot products in 2D and 3D', () => {
    expect(dotVector2([2, 1], [4, -2])).toBe(6)
    expect(dotVector3([1, 2, 3], [4, 5, 6])).toBe(32)
    expect(dotVector2([3, 0], [0, 7])).toBe(0)
  })

  it('computes cross product and anti-commutativity', () => {
    const a: readonly [number, number, number] = [1, 2, 3]
    const b: readonly [number, number, number] = [4, 5, 6]
    expect(crossVector3(a, b)).toEqual([-3, 6, -3])
    expect(crossVector3(b, a)).toEqual([3, -6, 3])
  })
})

describe('Matrix math', () => {
  it('supports 2x2 matrix add, subtract, and scale', () => {
    const a = [
      [1, 2],
      [3, 4],
    ] as const
    const b = [
      [5, 6],
      [7, 8],
    ] as const

    expect(addMatrix2x2(a, b)).toEqual([
      [6, 8],
      [10, 12],
    ])
    expect(subtractMatrix2x2(a, b)).toEqual([
      [-4, -4],
      [-4, -4],
    ])
    expect(scaleMatrix2x2(a, -1)).toEqual([
      [-1, -2],
      [-3, -4],
    ])
  })

  it('supports 3x3 matrix add, subtract, and scale', () => {
    const a = [
      [1, 2, 3],
      [0, 1, 4],
      [5, 6, 0],
    ] as const
    const b = [
      [2, 0, 1],
      [3, 1, 0],
      [4, 2, 1],
    ] as const

    expect(addMatrix3x3(a, b)).toEqual([
      [3, 2, 4],
      [3, 2, 4],
      [9, 8, 1],
    ])
    expect(subtractMatrix3x3(a, b)).toEqual([
      [-1, 2, 2],
      [-3, 0, 4],
      [1, 4, -1],
    ])
    expect(scaleMatrix3x3(b, 2)).toEqual([
      [4, 0, 2],
      [6, 2, 0],
      [8, 4, 2],
    ])
  })

  it('multiplies 2x2 and 3x3 matrices by vectors', () => {
    expect(
      multiplyMatrix2x2ByVector2(
        [
          [2, 1],
          [-1, 3],
        ],
        [4, 2],
      ),
    ).toEqual([10, 2])

    expect(
      multiplyMatrix3x3ByVector3(
        [
          [1, 0, 2],
          [0, 1, -1],
          [3, 2, 0],
        ],
        [2, 3, 4],
      ),
    ).toEqual([10, -1, 12])
  })

  it('computes determinants for 2x2 and 3x3 including singular case', () => {
    expect(
      determinant2x2([
        [3, 8],
        [4, 6],
      ]),
    ).toBe(-14)

    expect(
      determinant3x3([
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
      ]),
    ).toBe(1)

    expect(
      determinant3x3([
        [1, 2, 3],
        [2, 4, 6],
        [0, 1, 2],
      ]),
    ).toBe(0)
  })
})

describe('Eigen verification helper', () => {
  it('returns zero residual for a valid 2D eigenpair', () => {
    const result = verifyEigenPair2D(
      [
        [2, 0],
        [0, 3],
      ],
      [1, 0],
      2,
    )

    expect(result.transformedVector).toEqual([2, 0])
    expect(result.scaledVector).toEqual([2, 0])
    expect(result.differenceVector).toEqual([0, 0])
    expect(result.residual).toBe(0)
  })

  it('returns non-zero residual for an invalid 2D eigenpair', () => {
    const result = verifyEigenPair2D(
      [
        [2, 1],
        [0, 3],
      ],
      [1, 1],
      2,
    )

    expect(result.differenceVector).toEqual([1, 1])
    expect(result.residual).toBeCloseTo(Math.sqrt(2))
  })

  it('returns zero residual for a valid 3D eigenpair', () => {
    const result = verifyEigenPair3D(
      [
        [4, 0, 0],
        [0, 2, 0],
        [0, 0, 1],
      ],
      [0, 1, 0],
      2,
    )

    expect(result.transformedVector).toEqual([0, 2, 0])
    expect(result.scaledVector).toEqual([0, 2, 0])
    expect(result.differenceVector).toEqual([0, 0, 0])
    expect(result.residual).toBe(0)
  })
})
