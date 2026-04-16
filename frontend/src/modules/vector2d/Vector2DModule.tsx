import { useMemo, useRef, useState } from 'react'
import {
  addVector2,
  magnitudeVector2,
  type Vector2,
} from '../../math'
import {
  getWhatToNoticeVector2D,
  type Vector2DOperation,
  vector2DPresets,
  type Vector2DViewMode,
} from '../../content/vector2dContent'
import {
  AreaPolygon2D,
  Axes2D,
  createSceneTransform2D,
  DraggablePointHandle2D,
  Grid2D,
  LabelAnchor2D,
  VectorArrow2D,
} from '../../scene2d'
import {
  buildParallelogramPoints,
  buildTailToHeadEnd,
  buildTailToHeadStart,
  computeVector2DOperation,
  formatNumber,
  formatVector2,
} from './vector2dMath'
import './vector2d-module.css'

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360

const OPERATION_OPTIONS: Array<{ id: Vector2DOperation; label: string }> = [
  { id: 'add', label: 'Add' },
  { id: 'subtract', label: 'Subtract' },
  { id: 'scale', label: 'Scale' },
]

const VIEW_OPTIONS: Array<{ id: Vector2DViewMode; label: string }> = [
  { id: 'tailToHead', label: 'Tail-to-head' },
  { id: 'parallelogram', label: 'Parallelogram' },
]

export function Vector2DModule() {
  const svgRef = useRef<SVGSVGElement>(null)
  const transform = useMemo(() => createSceneTransform2D(SCENE_WIDTH, SCENE_HEIGHT, 40), [])

  const [operation, setOperation] = useState<Vector2DOperation>('add')
  const [viewMode, setViewMode] = useState<Vector2DViewMode>('tailToHead')
  const [vectorA, setVectorA] = useState<Vector2>([3, 2])
  const [vectorB, setVectorB] = useState<Vector2>([1.5, 2.5])
  const [scalar, setScalar] = useState(1)

  const computation = computeVector2DOperation(operation, vectorA, vectorB, scalar)
  const resultVector = computation.resultVector
  const helperVector = computation.helperVector
  const tailStart = buildTailToHeadStart(vectorA)
  const tailEnd = buildTailToHeadEnd(vectorA, helperVector)
  const whatToNotice = getWhatToNoticeVector2D(operation, scalar)

  return (
    <section className="vector2d-module">
      <div className="vector2d-scene-card">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="vector2d-scene"
          aria-label="Vector 2D scene"
        >
          <Grid2D transform={transform} step={1} />
          <Axes2D transform={transform} />

          {(operation === 'add' || operation === 'subtract') && viewMode === 'parallelogram' && (
            <AreaPolygon2D
              transform={transform}
              points={buildParallelogramPoints(vectorA, helperVector)}
            />
          )}

          {operation !== 'scale' && viewMode === 'tailToHead' && (
            <VectorArrow2D
              transform={transform}
              start={tailStart}
              end={tailEnd}
              stroke="#f97316"
              strokeWidth={1.5}
            />
          )}

          <VectorArrow2D transform={transform} start={[0, 0]} end={vectorA} stroke="#2563eb" />
          <VectorArrow2D transform={transform} start={[0, 0]} end={vectorB} stroke="#16a34a" />
          {operation === 'subtract' && (
            <VectorArrow2D transform={transform} start={[0, 0]} end={helperVector} stroke="#f97316" />
          )}
          <VectorArrow2D
            transform={transform}
            start={[0, 0]}
            end={resultVector}
            stroke="#7c3aed"
            strokeWidth={2.5}
          />

          <LabelAnchor2D transform={transform} position={vectorA} text="a" />
          <LabelAnchor2D transform={transform} position={vectorB} text="b" />
          {operation === 'subtract' && (
            <LabelAnchor2D transform={transform} position={helperVector} text="-b" />
          )}
          <LabelAnchor2D transform={transform} position={resultVector} text="result" />

          <DraggablePointHandle2D
            svgRef={svgRef}
            transform={transform}
            position={vectorA}
            onChange={setVectorA}
            snapStep={0.25}
            clampBounds={{ minX: -7, maxX: 7, minY: -4, maxY: 4 }}
          />
          <DraggablePointHandle2D
            svgRef={svgRef}
            transform={transform}
            position={vectorB}
            onChange={setVectorB}
            snapStep={0.25}
            clampBounds={{ minX: -7, maxX: 7, minY: -4, maxY: 4 }}
            fill="#f0fdf4"
            stroke="#166534"
          />
        </svg>
      </div>

      <div className="vector2d-layout">
        <section className="vector2d-controls" aria-label="Vector controls">
          <h3>Controls and Presets</h3>

          <div className="vector2d-chip-group">
            {OPERATION_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={operation === option.id ? 'chip is-active' : 'chip'}
                onClick={() => setOperation(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          {(operation === 'add' || operation === 'subtract') && (
            <div className="vector2d-chip-group">
              {VIEW_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={viewMode === option.id ? 'chip is-active' : 'chip'}
                  onClick={() => setViewMode(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          <label className="scalar-control" htmlFor="scale-slider">
            Scale factor k: <strong>{formatNumber(scalar)}</strong>
          </label>
          <input
            id="scale-slider"
            type="range"
            min={-3}
            max={3}
            step={0.25}
            value={scalar}
            onChange={(event) => setScalar(Number(event.target.value))}
            disabled={operation !== 'scale'}
          />

          <p className="control-hint">
            Drag points <strong>a</strong> and <strong>b</strong> in the scene to explore direct
            manipulation.
          </p>

          <div className="preset-list">
            {vector2DPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-button"
                onClick={() => {
                  setOperation(preset.operation)
                  setVectorA(preset.vectorA)
                  setVectorB(preset.vectorB)
                  setScalar(preset.scalar)
                  setViewMode(preset.viewMode)
                }}
              >
                <strong>{preset.label}</strong>
                <span>{preset.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="vector2d-algebra" aria-label="Algebra panel">
          <h3>Algebra View</h3>
          <p>
            a = <code>{formatVector2(vectorA)}</code>
          </p>
          <p>
            b = <code>{formatVector2(vectorB)}</code>
          </p>

          {operation === 'add' && (
            <p>
              a + b = <code>{formatVector2(resultVector)}</code>
            </p>
          )}

          {operation === 'subtract' && (
            <p>
              a - b = a + (-b) = <code>{formatVector2(resultVector)}</code>
            </p>
          )}

          {operation === 'scale' && (
            <p>
              k a = {formatNumber(scalar)} * {formatVector2(vectorA)} ={' '}
              <code>{formatVector2(resultVector)}</code>
            </p>
          )}

          <p>
            |a| = <code>{formatNumber(magnitudeVector2(vectorA))}</code>, |result| ={' '}
            <code>{formatNumber(computation.resultMagnitude)}</code>
          </p>
          <p>
            Result as composition: <code>{formatVector2(addVector2(vectorA, helperVector))}</code>
          </p>
        </section>
      </div>

      <section className="vector2d-note" aria-label="What to notice">
        <h3>What to notice</h3>
        <p>{whatToNotice}</p>
        <p className="prediction-prompt">
          Prediction prompt: before dragging, guess whether the result length grows, shrinks, flips,
          or collapses.
        </p>
      </section>
    </section>
  )
}
