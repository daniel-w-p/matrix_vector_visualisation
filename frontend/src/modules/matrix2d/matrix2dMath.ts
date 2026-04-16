import {
  addMatrix2x2,
  determinant2x2,
  multiplyMatrix2x2ByVector2,
  scaleMatrix2x2,
  subtractMatrix2x2,
  type Matrix2x2,
  type Vector2,
} from '../../math'
import type { Matrix2DMode } from '../../content/matrix2dContent'

export type GridLine2D = {
  start: Vector2
  end: Vector2
}

export function computeEffectiveMatrix(
  mode: Matrix2DMode,
  matrixA: Matrix2x2,
  matrixB: Matrix2x2,
  scalar: number,
): Matrix2x2 {
  if (mode === 'add') {
    return addMatrix2x2(matrixA, matrixB)
  }
  if (mode === 'subtract') {
    return subtractMatrix2x2(matrixA, matrixB)
  }
  if (mode === 'scale') {
    return scaleMatrix2x2(matrixA, scalar)
  }
  return matrixA
}

export function matrixColumns(matrix: Matrix2x2): [Vector2, Vector2] {
  return [
    [matrix[0][0], matrix[1][0]],
    [matrix[0][1], matrix[1][1]],
  ]
}

export function transformedUnitSquare(matrix: Matrix2x2): Vector2[] {
  const e1 = multiplyMatrix2x2ByVector2(matrix, [1, 0])
  const e2 = multiplyMatrix2x2ByVector2(matrix, [0, 1])
  const diagonal: Vector2 = [e1[0] + e2[0], e1[1] + e2[1]]

  return [
    [0, 0],
    e1,
    diagonal,
    e2,
  ]
}

export type DeterminantState2D = 'positive' | 'negative' | 'zero_exact' | 'zero_near'

export function determinantState(det: number, epsilon = 0.02): DeterminantState2D {
  if (det === 0) {
    return 'zero_exact'
  }
  if (Math.abs(det) <= epsilon) {
    return 'zero_near'
  }
  return det > 0 ? 'positive' : 'negative'
}

export function buildTransformedGridLines(
  matrix: Matrix2x2,
  extent = 5,
  step = 1,
): GridLine2D[] {
  const lines: GridLine2D[] = []

  for (let x = -extent; x <= extent + step * 0.5; x += step) {
    const worldStart: Vector2 = [x, -extent]
    const worldEnd: Vector2 = [x, extent]
    lines.push({
      start: multiplyMatrix2x2ByVector2(matrix, worldStart),
      end: multiplyMatrix2x2ByVector2(matrix, worldEnd),
    })
  }

  for (let y = -extent; y <= extent + step * 0.5; y += step) {
    const worldStart: Vector2 = [-extent, y]
    const worldEnd: Vector2 = [extent, y]
    lines.push({
      start: multiplyMatrix2x2ByVector2(matrix, worldStart),
      end: multiplyMatrix2x2ByVector2(matrix, worldEnd),
    })
  }

  return lines
}

export function midpoint2(a: Vector2, b: Vector2): Vector2 {
  return [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ]
}

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2)
}

export function formatVector(vector: Vector2): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}]`
}

export function formatMatrix2x2(matrix: Matrix2x2): string {
  return `[[${formatNumber(matrix[0][0])}, ${formatNumber(matrix[0][1])}], [${formatNumber(matrix[1][0])}, ${formatNumber(matrix[1][1])}]]`
}

export function transformedVector(matrix: Matrix2x2, vector: Vector2): Vector2 {
  return multiplyMatrix2x2ByVector2(matrix, vector)
}

export function matrixDeterminant(matrix: Matrix2x2): number {
  return determinant2x2(matrix)
}
