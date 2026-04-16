import type { Vector2 } from '../math'

export type Vector2DOperation = 'add' | 'subtract' | 'scale'
export type Vector2DViewMode = 'tailToHead' | 'parallelogram'

export type Vector2DPreset = {
  id: string
  label: string
  description: string
  operation: Vector2DOperation
  vectorA: Vector2
  vectorB: Vector2
  scalar: number
  viewMode: Vector2DViewMode
}

export const vector2DPresets: readonly Vector2DPreset[] = [
  {
    id: 'walk-east-north',
    label: 'Walk East + North',
    description: 'Two displacements combine into one net displacement.',
    operation: 'add',
    vectorA: [3, 1],
    vectorB: [1.5, 2.5],
    scalar: 1,
    viewMode: 'tailToHead',
  },
  {
    id: 'difference-opposite',
    label: 'Difference via Opposite',
    description: 'Subtraction is addition with the opposite of the second vector.',
    operation: 'subtract',
    vectorA: [3, 2],
    vectorB: [2, 3],
    scalar: 1,
    viewMode: 'tailToHead',
  },
  {
    id: 'negative-scale-flip',
    label: 'Negative Scale Flip',
    description: 'A negative scalar flips direction and rescales magnitude.',
    operation: 'scale',
    vectorA: [2.5, -1.5],
    vectorB: [1, 1],
    scalar: -1.5,
    viewMode: 'parallelogram',
  },
  {
    id: 'zero-collapse',
    label: 'Zero Collapse',
    description: 'Scaling by zero collapses the vector to the origin.',
    operation: 'scale',
    vectorA: [-3, 2],
    vectorB: [1, 0],
    scalar: 0,
    viewMode: 'tailToHead',
  },
]

export function getWhatToNoticeVector2D(
  operation: Vector2DOperation,
  scalar: number,
): string {
  if (operation === 'add') {
    return 'Notice how the result lands at the end of the tail-to-head path. You are composing two displacements.'
  }

  if (operation === 'subtract') {
    return 'Notice the subtraction view: a - b behaves like a + (-b). The opposite vector points in exactly the reversed direction.'
  }

  if (scalar === 0) {
    return 'Notice how scaling by zero collapses the vector to the origin. Direction disappears because magnitude is zero.'
  }

  if (scalar < 0) {
    return 'Notice the flip: negative scaling reverses direction while stretching by |k|.'
  }

  if (scalar > 0 && scalar < 1) {
    return 'Notice the shrink: positive scaling below 1 keeps direction but reduces magnitude.'
  }

  return 'Notice the stretch: positive scaling above 1 keeps direction and increases magnitude.'
}
