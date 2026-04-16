import { Scene3DPlayground } from '../../scene3d'
import { PlaceholderScreen } from './PlaceholderScreen'

export function ThreeFoundationPlaceholder() {
  return (
    <PlaceholderScreen
      heading="3D Foundation"
      description="Shared 3D scene preview used as the base for upcoming Cross Product and Matrix 3D modules."
    >
      <Scene3DPlayground />
    </PlaceholderScreen>
  )
}
