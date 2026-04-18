import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { ModuleKey } from '../content/moduleCards'
import { DotProductModule } from './dotProduct/DotProductModule'
import { EigenModule } from './eigen/EigenModule'
import { LeastSquaresModule } from './leastSquares/LeastSquaresModule'
import { Matrix2DModule } from './matrix2d/Matrix2DModule'
import { Vector2DModule } from './vector2d/Vector2DModule'

type ModuleScreenComponent = ComponentType | LazyExoticComponent<ComponentType>

const CrossProduct3DModule = lazy(async () => {
  const module = await import('./crossProduct3d/CrossProductModule')
  return { default: module.CrossProductModule }
})

const Matrix3DModule = lazy(async () => {
  const module = await import('./matrix3d/Matrix3DModule')
  return { default: module.Matrix3DModule }
})

export const moduleScreens: Record<ModuleKey, ModuleScreenComponent> = {
  vector2d: Vector2DModule,
  dotProduct: DotProductModule,
  matrix2d: Matrix2DModule,
  leastSquares: LeastSquaresModule,
  crossProduct3d: CrossProduct3DModule,
  matrix3d: Matrix3DModule,
  eigen: EigenModule,
}
