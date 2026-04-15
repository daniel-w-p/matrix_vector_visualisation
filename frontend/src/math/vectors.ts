import type { Vector2, Vector3 } from './types'

export function addVector2(a: Vector2, b: Vector2): Vector2 {
  return [a[0] + b[0], a[1] + b[1]]
}

export function subtractVector2(a: Vector2, b: Vector2): Vector2 {
  return [a[0] - b[0], a[1] - b[1]]
}

export function scaleVector2(vector: Vector2, scalar: number): Vector2 {
  return [vector[0] * scalar, vector[1] * scalar]
}

export function dotVector2(a: Vector2, b: Vector2): number {
  return a[0] * b[0] + a[1] * b[1]
}

export function magnitudeVector2(vector: Vector2): number {
  return Math.hypot(vector[0], vector[1])
}

export function addVector3(a: Vector3, b: Vector3): Vector3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

export function subtractVector3(a: Vector3, b: Vector3): Vector3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

export function scaleVector3(vector: Vector3, scalar: number): Vector3 {
  return [vector[0] * scalar, vector[1] * scalar, vector[2] * scalar]
}

export function dotVector3(a: Vector3, b: Vector3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

export function crossVector3(a: Vector3, b: Vector3): Vector3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

export function magnitudeVector3(vector: Vector3): number {
  return Math.hypot(vector[0], vector[1], vector[2])
}
