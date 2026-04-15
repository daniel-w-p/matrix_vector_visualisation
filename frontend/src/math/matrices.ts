import type { Matrix2x2, Matrix3x3, Vector2, Vector3 } from './types'

export function addMatrix2x2(a: Matrix2x2, b: Matrix2x2): Matrix2x2 {
  return [
    [a[0][0] + b[0][0], a[0][1] + b[0][1]],
    [a[1][0] + b[1][0], a[1][1] + b[1][1]],
  ]
}

export function subtractMatrix2x2(a: Matrix2x2, b: Matrix2x2): Matrix2x2 {
  return [
    [a[0][0] - b[0][0], a[0][1] - b[0][1]],
    [a[1][0] - b[1][0], a[1][1] - b[1][1]],
  ]
}

export function scaleMatrix2x2(matrix: Matrix2x2, scalar: number): Matrix2x2 {
  return [
    [matrix[0][0] * scalar, matrix[0][1] * scalar],
    [matrix[1][0] * scalar, matrix[1][1] * scalar],
  ]
}

export function multiplyMatrix2x2ByVector2(matrix: Matrix2x2, vector: Vector2): Vector2 {
  return [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
  ]
}

export function determinant2x2(matrix: Matrix2x2): number {
  return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
}

export function addMatrix3x3(a: Matrix3x3, b: Matrix3x3): Matrix3x3 {
  return [
    [a[0][0] + b[0][0], a[0][1] + b[0][1], a[0][2] + b[0][2]],
    [a[1][0] + b[1][0], a[1][1] + b[1][1], a[1][2] + b[1][2]],
    [a[2][0] + b[2][0], a[2][1] + b[2][1], a[2][2] + b[2][2]],
  ]
}

export function subtractMatrix3x3(a: Matrix3x3, b: Matrix3x3): Matrix3x3 {
  return [
    [a[0][0] - b[0][0], a[0][1] - b[0][1], a[0][2] - b[0][2]],
    [a[1][0] - b[1][0], a[1][1] - b[1][1], a[1][2] - b[1][2]],
    [a[2][0] - b[2][0], a[2][1] - b[2][1], a[2][2] - b[2][2]],
  ]
}

export function scaleMatrix3x3(matrix: Matrix3x3, scalar: number): Matrix3x3 {
  return [
    [matrix[0][0] * scalar, matrix[0][1] * scalar, matrix[0][2] * scalar],
    [matrix[1][0] * scalar, matrix[1][1] * scalar, matrix[1][2] * scalar],
    [matrix[2][0] * scalar, matrix[2][1] * scalar, matrix[2][2] * scalar],
  ]
}

export function multiplyMatrix3x3ByVector3(matrix: Matrix3x3, vector: Vector3): Vector3 {
  return [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1] + matrix[0][2] * vector[2],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1] + matrix[1][2] * vector[2],
    matrix[2][0] * vector[0] + matrix[2][1] * vector[1] + matrix[2][2] * vector[2],
  ]
}

export function determinant3x3(matrix: Matrix3x3): number {
  return (
    matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
    matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
    matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
  )
}
