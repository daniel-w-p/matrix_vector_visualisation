import { useEffect, useState } from 'react'
import { addVector2, magnitudeVector2, type Vector2 } from '../../math'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  getWhatToNoticeVector2D,
  getVector2DTheory,
  getVector2DUIText,
  type Vector2DOperation,
  vector2DPresets,
  type Vector2DViewMode,
} from '../../content/vector2dContent'
import {
  AreaPolygon2D,
  Axes2D,
  DraggablePointHandle2D,
  Grid2D,
  LabelAnchor2D,
  useScene2DViewport,
  VectorArrow2D,
} from '../../scene2d'
import {
  buildParallelogramPoints,
  buildTailToHeadEnd,
  buildTailToHeadStart,
  computeVector2DOperation,
  formatNumber,
  formatVector2,
  midpoint2,
} from './vector2dMath'
import './vector2d-module.css'

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360

export function Vector2DModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getVector2DUIText(language)

  const viewport = useScene2DViewport(SCENE_WIDTH, SCENE_HEIGHT, 40)
  const { svgRef, transform } = viewport

  const [operation, setOperation] = useState<Vector2DOperation>('add')
  const [viewMode, setViewMode] = useState<Vector2DViewMode>('tailToHead')
  const [vectorA, setVectorA] = useState<Vector2>([3, 2])
  const [vectorB, setVectorB] = useState<Vector2>([1.5, 2.5])
  const [scalar, setScalar] = useState(1)
  const origin: Vector2 = [0, 0]

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getWhatToNoticeVector2D(language, operation, scalar),
      theory: getVector2DTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [language, operation, scalar, setSidebarOverride, ui.status])

  const computation = computeVector2DOperation(operation, vectorA, vectorB, scalar)
  const resultVector = computation.resultVector
  const helperVector = computation.helperVector
  const tailStart = buildTailToHeadStart(vectorA)
  const tailEnd = buildTailToHeadEnd(vectorA, helperVector)
  const translatedHelperStroke = operation === 'add' ? '#22c55e' : '#ef4444'
  const translatedHelperLabel = operation === 'add' ? "b'" : "-b'"

  const labelA = midpoint2(origin, vectorA)
  const labelB = midpoint2(origin, vectorB)
  const labelResult = midpoint2(origin, resultVector)
  const labelHelper = midpoint2(origin, helperVector)
  const labelTranslatedHelper = midpoint2(tailStart, tailEnd)

  const operationOptions: Array<{ id: Vector2DOperation; label: string }> = [
    { id: 'add', label: ui.operationAdd },
    { id: 'subtract', label: ui.operationSubtract },
    { id: 'scale', label: ui.operationScale },
  ]

  const viewOptions: Array<{ id: Vector2DViewMode; label: string }> = [
    { id: 'tailToHead', label: ui.viewTailToHead },
    { id: 'parallelogram', label: ui.viewParallelogram },
  ]

  return (
    <section className="vector2d-module">
      <div className="vector2d-scene-card">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="vector2d-scene"
          aria-label={ui.vectorSceneLabel}
          onPointerDown={viewport.onPointerDown}
          onPointerMove={viewport.onPointerMove}
          onPointerUp={viewport.onPointerUp}
          onPointerCancel={viewport.onPointerCancel}
          style={{ touchAction: 'none', cursor: 'grab' }}
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
              stroke={translatedHelperStroke}
              strokeWidth={1.8}
            />
          )}

          <VectorArrow2D transform={transform} start={origin} end={vectorA} stroke="#2563eb" />
          <VectorArrow2D transform={transform} start={origin} end={vectorB} stroke="#16a34a" />
          {operation === 'subtract' && (
            <VectorArrow2D transform={transform} start={origin} end={helperVector} stroke="#ef4444" />
          )}
          <VectorArrow2D
            transform={transform}
            start={origin}
            end={resultVector}
            stroke="#7c3aed"
            strokeWidth={2.5}
          />

          <LabelAnchor2D transform={transform} position={labelA} text="a" />
          <LabelAnchor2D transform={transform} position={labelB} text="b" />
          {operation === 'subtract' && (
            <LabelAnchor2D transform={transform} position={labelHelper} text="-b" />
          )}
          {operation !== 'scale' && viewMode === 'tailToHead' && (
            <LabelAnchor2D transform={transform} position={labelTranslatedHelper} text={translatedHelperLabel} />
          )}
          <LabelAnchor2D transform={transform} position={labelResult} text="result" />

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
        <button type="button" className="scene-reset-button" onClick={viewport.resetView}>
          {ui.resetView}
        </button>
      </div>

      <div className="vector2d-layout">
        <section className="vector2d-controls" aria-label="Vector controls">
          <h3>{ui.controlsAndPresets}</h3>

          <div className="vector2d-chip-group">
            {operationOptions.map((option) => (
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
              {viewOptions.map((option) => (
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
            {ui.scaleFactor}: <strong>{formatNumber(scalar)}</strong>
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
            {ui.dragHintPrefix} <strong>a</strong> {ui.dragHintConnector} <strong>b</strong>{' '}
            {ui.dragHintSuffix}
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
                <strong>{preset.label[language]}</strong>
                <span>{preset.description[language]}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="vector2d-algebra" aria-label="Algebra panel">
          <h3>{ui.algebraView}</h3>
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
            {ui.resultLabel}: <code>{formatVector2(addVector2(vectorA, helperVector))}</code>
          </p>
        </section>
      </div>
    </section>
  )
}
