import { describe, expect, it } from 'vitest'
import {
  computeEffectiveMatrix3D,
  determinantState3D,
  formatMatrix3x3,
  matrixColumns3D,
  transformedUnitCubeVertices,
} from '../modules/matrix3d/matrix3dMath'

describe('matrix3dMath', () => {
  const matrixA = [
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0],
  ] as const
  const matrixB = [
    [2, 0, 1],
    [3, 1, 0],
    [4, 2, 1],
  ] as const

  it('computes effective matrix by mode', () => {
    expect(computeEffectiveMatrix3D('add', matrixA, matrixB, 1)).toEqual([
      [3, 2, 4],
      [3, 2, 4],
      [9, 8, 1],
    ])
    expect(computeEffectiveMatrix3D('subtract', matrixA, matrixB, 1)).toEqual([
      [-1, 2, 2],
      [-3, 0, 4],
      [1, 4, -1],
    ])
    expect(computeEffectiveMatrix3D('scale', matrixA, matrixB, 2)).toEqual([
      [2, 4, 6],
      [0, 2, 8],
      [10, 12, 0],
    ])
  })

  it('extracts matrix columns and builds transformed cube', () => {
    const columns = matrixColumns3D([
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 4],
    ])
    expect(columns).toEqual([
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 4],
    ])

    const cube = transformedUnitCubeVertices([
      [2, 0, 0],
      [0, 3, 0],
      [0, 0, 4],
    ])
    expect(cube[7]).toEqual([2, 3, 4])
  })

  it('classifies determinant states', () => {
    expect(determinantState3D(2)).toBe('positive')
    expect(determinantState3D(-0.5)).toBe('negative')
    expect(determinantState3D(0.001)).toBe('zero')
  })

  it('formats 3x3 matrix values', () => {
    expect(
      formatMatrix3x3([
        [1, 0, 0],
        [0, 1.25, 0],
        [0, 0, -2],
      ]),
    ).toBe('[[1, 0, 0]; [0, 1.25, 0]; [0, 0, -2]]')
  })
})
