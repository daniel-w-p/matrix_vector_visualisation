import {
  determinant2x2,
  dotVector2,
  multiplyMatrix2x2ByVector2,
  scaleVector2,
  verifyEigenPair2D,
  type Matrix2x2,
  type Vector2,
} from '../../math'

const EPSILON = 1e-8

export type ResidualState = 'aligned' | 'close' | 'off'

export type DirectionSample = {
  endpoint: Vector2
  residual: number
}

export function trace2x2(matrix: Matrix2x2): number {
  return matrix[0][0] + matrix[1][1]
}

export function discriminant2x2(matrix: Matrix2x2): number {
  const trace = trace2x2(matrix)
  return trace * trace - 4 * determinant2x2(matrix)
}

export function hasRealEigenvalues2x2(matrix: Matrix2x2): boolean {
  return discriminant2x2(matrix) >= -EPSILON
}

export function rayleighQuotient2D(matrix: Matrix2x2, vector: Vector2): number {
  const denominator = dotVector2(vector, vector)
  if (Math.abs(denominator) < EPSILON) {
    return 0
  }
  const transformed = multiplyMatrix2x2ByVector2(matrix, vector)
  return dotVector2(vector, transformed) / denominator
}

export function verifyEigenCandidate2D(matrix: Matrix2x2, vector: Vector2, lambda: number) {
  return verifyEigenPair2D(matrix, vector, lambda)
}

export function residualState(residual: number): ResidualState {
  if (residual < 0.08) {
    return 'aligned'
  }
  if (residual < 0.35) {
    return 'close'
  }
  return 'off'
}

export function sampleDirectionResiduals(
  matrix: Matrix2x2,
  sampleCount = 24,
  radius = 3.2,
): DirectionSample[] {
  const samples: DirectionSample[] = []

  for (let index = 0; index < sampleCount; index += 1) {
    const angle = (Math.PI * index) / sampleCount
    const unitDirection: Vector2 = [Math.cos(angle), Math.sin(angle)]
    const lambda = rayleighQuotient2D(matrix, unitDirection)
    const verification = verifyEigenCandidate2D(matrix, unitDirection, lambda)

    samples.push({
      endpoint: scaleVector2(unitDirection, radius),
      residual: verification.residual,
    })
  }

  return samples
}

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2)
}

export function formatVector2(vector: Vector2): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}]`
}

export function formatMatrix2x2(matrix: Matrix2x2): string {
  return `[[${formatNumber(matrix[0][0])}, ${formatNumber(matrix[0][1])}], [${formatNumber(matrix[1][0])}, ${formatNumber(matrix[1][1])}]]`
}

export function midpoint2(start: Vector2, end: Vector2): Vector2 {
  return [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2]
}
