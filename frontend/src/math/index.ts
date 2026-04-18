export type {
  EigenVerification2D,
  EigenVerification3D,
  Matrix2x2,
  Matrix3x3,
  Vector2,
  Vector3,
} from './types'

export {
  addVector2,
  addVector3,
  crossVector3,
  dotVector2,
  dotVector3,
  magnitudeVector2,
  magnitudeVector3,
  scaleVector2,
  scaleVector3,
  subtractVector2,
  subtractVector3,
} from './vectors'

export {
  addMatrix2x2,
  addMatrix3x3,
  determinant2x2,
  determinant3x3,
  multiplyMatrix2x2ByVector2,
  multiplyMatrix3x3ByVector3,
  scaleMatrix2x2,
  scaleMatrix3x3,
  subtractMatrix2x2,
  subtractMatrix3x3,
} from './matrices'

export { verifyEigenPair2D, verifyEigenPair3D } from './eigen'

export type { Matrix4x2, Vector4 } from './leastSquares'
export { computeLeastSquares4x2, magnitudeVector4, multiplyMatrix4x2ByVector2 } from './leastSquares'
