import { Axes3D } from './Axes3D'
import { Scene3DCanvas } from './Scene3DCanvas'
import { Scene3DReadout } from './Scene3DReadout'
import { Vector3DArrow } from './Vector3DArrow'
import './scene3d-foundation.css'

const vectorA: [number, number, number] = [2.1, 1.2, 0.7]
const vectorB: [number, number, number] = [-0.8, 1.7, 1.5]

export function Scene3DPlayground() {
  return (
    <article className="scene3d-playground">
      <p className="scene3d-playground-caption">
        Shared 3D foundation preview: orbit camera, reusable vectors, axes, and overlay readout.
      </p>

      <Scene3DCanvas
        ariaLabel="3D foundation preview scene"
        overlay={
          <Scene3DReadout
            title="Foundation Readout"
            items={[
              { label: 'a', value: `[${vectorA.join(', ')}]` },
              { label: 'b', value: `[${vectorB.join(', ')}]` },
              { label: 'Controls', value: 'Orbit / pan / zoom' },
            ]}
          />
        }
      >
        <Axes3D />
        <Vector3DArrow vector={vectorA} color="#2f7a3d" label="a" />
        <Vector3DArrow vector={vectorB} color="#bf3f32" label="b" />
      </Scene3DCanvas>
    </article>
  )
}
