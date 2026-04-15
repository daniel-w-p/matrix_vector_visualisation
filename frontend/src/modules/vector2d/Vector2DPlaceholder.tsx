import { PlaceholderScreen } from '../shared/PlaceholderScreen'
import { Scene2DPlayground } from '../../scene2d'

export function Vector2DPlaceholder() {
  return (
    <div>
      <PlaceholderScreen
        heading="Vector 2D Module"
        description="Placeholder scene for vector addition, subtraction, and scaling."
      />
      <Scene2DPlayground />
    </div>
  )
}
