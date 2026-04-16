import type { ComponentType } from 'react'
import type { ModuleKey } from '../content/moduleCards'
import { CrossProduct3DPlaceholder } from './crossProduct3d/CrossProduct3DPlaceholder'
import { DotProductModule } from './dotProduct/DotProductModule'
import { EigenPlaceholder } from './eigen/EigenPlaceholder'
import { Matrix2DModule } from './matrix2d/Matrix2DModule'
import { Matrix3DPlaceholder } from './matrix3d/Matrix3DPlaceholder'
import { Vector2DModule } from './vector2d/Vector2DModule'

export const moduleScreens: Record<ModuleKey, ComponentType> = {
  vector2d: Vector2DModule,
  dotProduct: DotProductModule,
  matrix2d: Matrix2DModule,
  crossProduct3d: CrossProduct3DPlaceholder,
  matrix3d: Matrix3DPlaceholder,
  eigen: EigenPlaceholder,
}
