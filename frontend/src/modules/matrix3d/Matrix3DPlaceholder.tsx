import { Scene3DPlayground } from '../../scene3d'
import { PlaceholderScreen } from '../shared/PlaceholderScreen'

export function Matrix3DPlaceholder() {
  return (
    <PlaceholderScreen
      heading="Matrix 3D Module"
      description="Placeholder scene for 3x3 transformations and determinant volume scaling."
    >
      <Scene3DPlayground />
    </PlaceholderScreen>
  )
}
