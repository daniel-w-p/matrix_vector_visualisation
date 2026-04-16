import {
  dotVector2,
  magnitudeVector2,
  scaleVector2,
  type Vector2,
} from '../../math'

export type DotSignState = 'positive' | 'zero' | 'negative'

export function dotSignState(value: number, epsilon = 0.02): DotSignState {
  if (Math.abs(value) <= epsilon) {
    return 'zero'
  }

  return value > 0 ? 'positive' : 'negative'
}

export function safeCosineBetweenVectors(a: Vector2, b: Vector2): number | null {
  const magA = magnitudeVector2(a)
  const magB = magnitudeVector2(b)

  if (magA === 0 || magB === 0) {
    return null
  }

  const cosine = dotVector2(a, b) / (magA * magB)
  return Math.max(-1, Math.min(1, cosine))
}

export function angleBetweenVectorsRadians(a: Vector2, b: Vector2): number | null {
  const cosine = safeCosineBetweenVectors(a, b)
  if (cosine === null) {
    return null
  }

  return Math.acos(cosine)
}

export function normalizeVector2(vector: Vector2): Vector2 | null {
  const magnitude = magnitudeVector2(vector)
  if (magnitude === 0) {
    return null
  }

  return scaleVector2(vector, 1 / magnitude)
}

export function projectionOfSourceOnTarget(source: Vector2, target: Vector2): {
  projectedVector: Vector2
  scalarAlongTarget: number
  isValid: boolean
} {
  const targetDotTarget = dotVector2(target, target)
  if (targetDotTarget === 0) {
    return {
      projectedVector: [0, 0],
      scalarAlongTarget: 0,
      isValid: false,
    }
  }

  const scalarAlongTarget = dotVector2(source, target) / targetDotTarget
  return {
    projectedVector: scaleVector2(target, scalarAlongTarget),
    scalarAlongTarget,
    isValid: true,
  }
}

export function midpoint2(start: Vector2, end: Vector2): Vector2 {
  return [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
  ]
}

export function formatNumber(value: number): string {
  const rounded = Math.round(value * 100) / 100
  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(2)
}

export function formatVector(vector: Vector2): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}]`
}
