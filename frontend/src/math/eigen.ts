import {
  multiplyMatrix2x2ByVector2,
  multiplyMatrix3x3ByVector3,
} from './matrices'
import type {
  EigenVerification2D,
  EigenVerification3D,
  Matrix2x2,
  Matrix3x3,
  Vector2,
  Vector3,
} from './types'
import {
  magnitudeVector2,
  magnitudeVector3,
  scaleVector2,
  scaleVector3,
  subtractVector2,
  subtractVector3,
} from './vectors'

export function verifyEigenPair2D(
  matrix: Matrix2x2,
  candidateVector: Vector2,
  eigenvalue: number,
): EigenVerification2D {
  const transformedVector = multiplyMatrix2x2ByVector2(matrix, candidateVector)
  const scaledVector = scaleVector2(candidateVector, eigenvalue)
  const differenceVector = subtractVector2(transformedVector, scaledVector)

  return {
    transformedVector,
    scaledVector,
    differenceVector,
    residual: magnitudeVector2(differenceVector),
  }
}

export function verifyEigenPair3D(
  matrix: Matrix3x3,
  candidateVector: Vector3,
  eigenvalue: number,
): EigenVerification3D {
  const transformedVector = multiplyMatrix3x3ByVector3(matrix, candidateVector)
  const scaledVector = scaleVector3(candidateVector, eigenvalue)
  const differenceVector = subtractVector3(transformedVector, scaledVector)

  return {
    transformedVector,
    scaledVector,
    differenceVector,
    residual: magnitudeVector3(differenceVector),
  }
}
