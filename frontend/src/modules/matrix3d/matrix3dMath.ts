import {
  addMatrix3x3,
  determinant3x3,
  multiplyMatrix3x3ByVector3,
  scaleMatrix3x3,
  subtractMatrix3x3,
  type Matrix3x3,
  type Vector3,
} from '../../math'
import type { Matrix3DMode } from '../../content/matrix3dContent'

export function computeEffectiveMatrix3D(
  mode: Matrix3DMode,
  matrixA: Matrix3x3,
  matrixB: Matrix3x3,
  scalar: number,
): Matrix3x3 {
  if (mode === 'add') {
    return addMatrix3x3(matrixA, matrixB)
  }
  if (mode === 'subtract') {
    return subtractMatrix3x3(matrixA, matrixB)
  }
  if (mode === 'scale') {
    return scaleMatrix3x3(matrixA, scalar)
  }
  return matrixA
}

export function transformedVector3(matrix: Matrix3x3, vector: Vector3): Vector3 {
  return multiplyMatrix3x3ByVector3(matrix, vector)
}

export function matrixColumns3D(matrix: Matrix3x3): readonly [Vector3, Vector3, Vector3] {
  return [
    [matrix[0][0], matrix[1][0], matrix[2][0]],
    [matrix[0][1], matrix[1][1], matrix[2][1]],
    [matrix[0][2], matrix[1][2], matrix[2][2]],
  ]
}

export function determinantState3D(
  determinant: number,
): 'positive' | 'negative' | 'zero_exact' | 'zero_near' {
  if (determinant === 0) {
    return 'zero_exact'
  }
  if (Math.abs(determinant) < 0.02) {
    return 'zero_near'
  }
  return determinant < 0 ? 'negative' : 'positive'
}

export function transformedUnitCubeVertices(matrix: Matrix3x3): readonly Vector3[] {
  const [e1, e2, e3] = matrixColumns3D(matrix)
  return [
    [0, 0, 0],
    e1,
    e2,
    add3(e1, e2),
    e3,
    add3(e1, e3),
    add3(e2, e3),
    add3(add3(e1, e2), e3),
  ]
}

export function unitCubeVertices(): readonly Vector3[] {
  return transformedUnitCubeVertices([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])
}

export const CUBE_EDGES: readonly [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 4],
  [1, 3],
  [1, 5],
  [2, 3],
  [2, 6],
  [4, 5],
  [4, 6],
  [3, 7],
  [5, 7],
  [6, 7],
]

export const CUBE_FACE_QUADS: readonly [number, number, number, number][] = [
  [0, 1, 3, 2],
  [4, 5, 7, 6],
  [0, 1, 5, 4],
  [2, 3, 7, 6],
  [0, 2, 6, 4],
  [1, 3, 7, 5],
]

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2)
}

export function formatVector3(vector: Vector3): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}, ${formatNumber(vector[2])}]`
}

export function formatMatrix3x3(matrix: Matrix3x3): string {
  return `[${formatVector3(matrix[0])}; ${formatVector3(matrix[1])}; ${formatVector3(matrix[2])}]`
}

function add3(a: Vector3, b: Vector3): Vector3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

export { determinant3x3 }
