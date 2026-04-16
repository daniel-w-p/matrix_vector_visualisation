import { Scene3DPlayground } from '../../scene3d'
import { PlaceholderScreen } from '../shared/PlaceholderScreen'

export function CrossProduct3DPlaceholder() {
  return (
    <PlaceholderScreen
      heading="Cross Product 3D Module"
      description="Placeholder scene for oriented area and perpendicular direction."
    >
      <Scene3DPlayground />
    </PlaceholderScreen>
  )
}
