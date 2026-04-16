import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { ModuleKey } from '../content/moduleCards'
import { DotProductModule } from './dotProduct/DotProductModule'
import { EigenPlaceholder } from './eigen/EigenPlaceholder'
import { Matrix2DModule } from './matrix2d/Matrix2DModule'
import { Vector2DModule } from './vector2d/Vector2DModule'

type ModuleScreenComponent = ComponentType | LazyExoticComponent<ComponentType>

const ThreeFoundationPlaceholder = lazy(async () => {
  const module = await import('./shared/ThreeFoundationPlaceholder')
  return { default: module.ThreeFoundationPlaceholder }
})

export const moduleScreens: Record<ModuleKey, ModuleScreenComponent> = {
  vector2d: Vector2DModule,
  dotProduct: DotProductModule,
  matrix2d: Matrix2DModule,
  crossProduct3d: ThreeFoundationPlaceholder,
  matrix3d: ThreeFoundationPlaceholder,
  eigen: EigenPlaceholder,
}
