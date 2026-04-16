import {
  addVector2,
  magnitudeVector2,
  scaleVector2,
  subtractVector2,
  type Vector2,
} from '../../math'
import type { Vector2DOperation } from '../../content/vector2dContent'

export type Vector2DComputation = {
  helperVector: Vector2
  resultVector: Vector2
  resultMagnitude: number
}

export function computeVector2DOperation(
  operation: Vector2DOperation,
  vectorA: Vector2,
  vectorB: Vector2,
  scalar: number,
): Vector2DComputation {
  if (operation === 'add') {
    const resultVector = addVector2(vectorA, vectorB)
    return {
      helperVector: vectorB,
      resultVector,
      resultMagnitude: magnitudeVector2(resultVector),
    }
  }

  if (operation === 'subtract') {
    const oppositeVector = scaleVector2(vectorB, -1)
    const resultVector = addVector2(vectorA, oppositeVector)
    return {
      helperVector: oppositeVector,
      resultVector,
      resultMagnitude: magnitudeVector2(resultVector),
    }
  }

  const resultVector = scaleVector2(vectorA, scalar)
  return {
    helperVector: vectorB,
    resultVector,
    resultMagnitude: magnitudeVector2(resultVector),
  }
}

export function formatVector2(vector: Vector2): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}]`
}

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2)
}

export function buildTailToHeadStart(vectorA: Vector2): Vector2 {
  return vectorA
}

export function buildTailToHeadEnd(vectorA: Vector2, helperVector: Vector2): Vector2 {
  return addVector2(vectorA, helperVector)
}

export function buildParallelogramPoints(vectorA: Vector2, helperVector: Vector2): Vector2[] {
  const diagonal = addVector2(vectorA, helperVector)
  return [
    [0, 0],
    vectorA,
    diagonal,
    helperVector,
  ]
}

export function vectorDifference(vectorA: Vector2, vectorB: Vector2): Vector2 {
  return subtractVector2(vectorA, vectorB)
}

export function midpoint2(vectorStart: Vector2, vectorEnd: Vector2): Vector2 {
  return [
    (vectorStart[0] + vectorEnd[0]) / 2,
    (vectorStart[1] + vectorEnd[1]) / 2,
  ]
}
