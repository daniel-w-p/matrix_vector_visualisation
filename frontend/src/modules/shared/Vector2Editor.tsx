import type { Vector2 } from '../../math'
import './vector2-editor.css'

type Vector2EditorProps = {
  label: string
  value: Vector2
  onChange: (next: Vector2) => void
  step?: number
}

export function Vector2Editor({ label, value, onChange, step = 0.25 }: Vector2EditorProps) {
  return (
    <div className="vector2-editor">
      <p className="vector2-editor-title">{label}</p>
      <div className="vector2-editor-grid">
        <label>
          <span>x</span>
          <input
            type="number"
            step={step}
            value={value[0]}
            onChange={(event) => {
              onChange([Number(event.target.value), value[1]])
            }}
          />
        </label>
        <label>
          <span>y</span>
          <input
            type="number"
            step={step}
            value={value[1]}
            onChange={(event) => {
              onChange([value[0], Number(event.target.value)])
            }}
          />
        </label>
      </div>
    </div>
  )
}
