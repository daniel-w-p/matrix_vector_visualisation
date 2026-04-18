import type { Vector2 } from './types'

export type Vector4 = readonly [number, number, number, number]
export type Matrix4x2 = readonly [
  readonly [number, number],
  readonly [number, number],
  readonly [number, number],
  readonly [number, number],
]

export type LeastSquaresResult = {
  xStar: Vector2
  axStar: Vector4
  residual: Vector4
  residualNorm: number
  atA: [[number, number], [number, number]]
  atb: Vector2
  atResidual: Vector2
  normalDeterminant: number
  usedRegularization: boolean
}

export function multiplyMatrix4x2ByVector2(matrix: Matrix4x2, vector: Vector2): Vector4 {
  return [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
    matrix[2][0] * vector[0] + matrix[2][1] * vector[1],
    matrix[3][0] * vector[0] + matrix[3][1] * vector[1],
  ]
}

export function subtractVector4(a: Vector4, b: Vector4): Vector4 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]]
}

export function magnitudeVector4(vector: Vector4): number {
  return Math.hypot(vector[0], vector[1], vector[2], vector[3])
}

export function computeLeastSquares4x2(matrix: Matrix4x2, b: Vector4): LeastSquaresResult {
  const atA = computeAtA(matrix)
  const atb = computeAtb(matrix, b)
  const normalDeterminant = atA[0][0] * atA[1][1] - atA[0][1] * atA[1][0]

  let usedRegularization = false
  let solved = solve2x2(atA, atb)

  if (!solved) {
    usedRegularization = true
    const regularized: [[number, number], [number, number]] = [
      [atA[0][0] + 1e-3, atA[0][1]],
      [atA[1][0], atA[1][1] + 1e-3],
    ]
    solved = solve2x2(regularized, atb) ?? [0, 0]
  }

  const xStar: Vector2 = solved
  const axStar = multiplyMatrix4x2ByVector2(matrix, xStar)
  const residual = subtractVector4(b, axStar)
  const atResidual = computeAtb(matrix, residual)

  return {
    xStar,
    axStar,
    residual,
    residualNorm: magnitudeVector4(residual),
    atA,
    atb,
    atResidual,
    normalDeterminant,
    usedRegularization,
  }
}

function computeAtA(matrix: Matrix4x2): [[number, number], [number, number]] {
  let a11 = 0
  let a12 = 0
  let a22 = 0

  for (let row = 0; row < 4; row += 1) {
    const c1 = matrix[row][0]
    const c2 = matrix[row][1]
    a11 += c1 * c1
    a12 += c1 * c2
    a22 += c2 * c2
  }

  return [
    [a11, a12],
    [a12, a22],
  ]
}

function computeAtb(matrix: Matrix4x2, b: Vector4): Vector2 {
  let first = 0
  let second = 0

  for (let row = 0; row < 4; row += 1) {
    first += matrix[row][0] * b[row]
    second += matrix[row][1] * b[row]
  }

  return [first, second]
}

function solve2x2(
  matrix: [[number, number], [number, number]],
  rhs: Vector2,
): Vector2 | null {
  const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
  if (Math.abs(det) < 1e-10) {
    return null
  }

  const inv = 1 / det
  return [
    inv * (matrix[1][1] * rhs[0] - matrix[0][1] * rhs[1]),
    inv * (-matrix[1][0] * rhs[0] + matrix[0][0] * rhs[1]),
  ]
}
