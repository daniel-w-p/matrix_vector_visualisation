import {
  crossVector3,
  dotVector3,
  magnitudeVector3,
  type Vector3,
} from '../../math'

const EPSILON = 1e-6

export type CrossProductComputation = {
  firstOperand: Vector3
  secondOperand: Vector3
  cross: Vector3
  oppositeCross: Vector3
  magnitudeFirst: number
  magnitudeSecond: number
  magnitudeCross: number
  angleRadians: number | null
  sineTheta: number | null
  area: number
  isParallel: boolean
}

export function computeCrossProductState(
  vectorA: Vector3,
  vectorB: Vector3,
  isSwapped: boolean,
): CrossProductComputation {
  const firstOperand: Vector3 = isSwapped ? vectorB : vectorA
  const secondOperand: Vector3 = isSwapped ? vectorA : vectorB
  const cross = crossVector3(firstOperand, secondOperand)
  const oppositeCross = crossVector3(secondOperand, firstOperand)
  const magnitudeFirst = magnitudeVector3(firstOperand)
  const magnitudeSecond = magnitudeVector3(secondOperand)
  const magnitudeCross = magnitudeVector3(cross)
  const area = magnitudeCross
  const sineTheta = safeSineTheta(magnitudeFirst, magnitudeSecond, magnitudeCross)
  const angleRadians = angleFromSine(sineTheta)
  const isParallel = magnitudeCross < 0.02

  return {
    firstOperand,
    secondOperand,
    cross,
    oppositeCross,
    magnitudeFirst,
    magnitudeSecond,
    magnitudeCross,
    angleRadians,
    sineTheta,
    area,
    isParallel,
  }
}

function safeSineTheta(
  magnitudeFirst: number,
  magnitudeSecond: number,
  magnitudeCross: number,
): number | null {
  const denominator = magnitudeFirst * magnitudeSecond

  if (denominator < EPSILON) {
    return null
  }

  return clampToUnit(magnitudeCross / denominator)
}

function angleFromSine(sineTheta: number | null): number | null {
  if (sineTheta === null) {
    return null
  }

  return Math.asin(clampToUnit(sineTheta))
}

function clampToUnit(value: number): number {
  return Math.max(-1, Math.min(1, value))
}

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2)
}

export function formatAngleDegrees(angleRadians: number | null): string {
  if (angleRadians === null) {
    return 'n/a'
  }

  return `${formatNumber((angleRadians * 180) / Math.PI)}°`
}

export function formatVector3(vector: Vector3): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}, ${formatNumber(vector[2])}]`
}

export function addVector3(a: Vector3, b: Vector3): Vector3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

export function crossProductDotCheck(cross: Vector3, first: Vector3, second: Vector3) {
  return {
    withFirst: dotVector3(cross, first),
    withSecond: dotVector3(cross, second),
  }
}
