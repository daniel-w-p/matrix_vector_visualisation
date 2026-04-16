import type { Scene3DReadoutItem } from './types'

type Scene3DReadoutProps = {
  title: string
  items: Scene3DReadoutItem[]
}

export function Scene3DReadout({ title, items }: Scene3DReadoutProps) {
  return (
    <section className="scene3d-readout">
      <p className="scene3d-readout-title">{title}</p>
      <dl className="scene3d-readout-list">
        {items.map((item) => (
          <div key={item.label} className="scene3d-readout-row">
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
