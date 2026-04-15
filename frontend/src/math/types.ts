export type Vector2 = readonly [number, number]
export type Vector3 = readonly [number, number, number]

export type Matrix2x2 = readonly [Vector2, Vector2]
export type Matrix3x3 = readonly [Vector3, Vector3, Vector3]

export type EigenVerification2D = {
  transformedVector: Vector2
  scaledVector: Vector2
  differenceVector: Vector2
  residual: number
}

export type EigenVerification3D = {
  transformedVector: Vector3
  scaledVector: Vector3
  differenceVector: Vector3
  residual: number
}
