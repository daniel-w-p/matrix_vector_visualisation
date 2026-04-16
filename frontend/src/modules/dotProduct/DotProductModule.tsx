import { useEffect, useState } from 'react'
import { dotVector2, magnitudeVector2, type Vector2 } from '../../math'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  dotProductPresets,
  getDotProductTheory,
  getDotProductUIText,
  getDotProductWhatToNotice,
  type ProjectionMode,
} from '../../content/dotProductContent'
import {
  AngleArc2D,
  Axes2D,
  DraggablePointHandle2D,
  Grid2D,
  LabelAnchor2D,
  useScene2DViewport,
  VectorArrow2D,
  worldToScenePoint2D,
} from '../../scene2d'
import {
  angleBetweenVectorsRadians,
  dotSignState,
  formatNumber,
  formatVector,
  midpoint2,
  normalizeVector2,
  projectionOfSourceOnTarget,
  safeCosineBetweenVectors,
} from './dotProductMath'
import './dot-product-module.css'

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360
const ORIGIN: Vector2 = [0, 0]

export function DotProductModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getDotProductUIText(language)
  const viewport = useScene2DViewport(SCENE_WIDTH, SCENE_HEIGHT, 40)
  const { svgRef, transform } = viewport

  const [vectorA, setVectorA] = useState<Vector2>([2, 2])
  const [vectorB, setVectorB] = useState<Vector2>([4.5, 0])
  const [projectionMode, setProjectionMode] = useState<ProjectionMode>('aOnB')
  const [showAngle, setShowAngle] = useState(true)
  const [showCosine, setShowCosine] = useState(true)
  const [unitTargetMode, setUnitTargetMode] = useState(false)

  const sourceVector = projectionMode === 'aOnB' ? vectorA : vectorB
  const rawTargetVector = projectionMode === 'aOnB' ? vectorB : vectorA
  const normalizedTarget = normalizeVector2(rawTargetVector)
  const targetVector = unitTargetMode && normalizedTarget ? normalizedTarget : rawTargetVector

  const projection = projectionOfSourceOnTarget(sourceVector, targetVector)
  const dotValue = dotVector2(vectorA, vectorB)
  const signState = dotSignState(dotValue)
  const cosine = safeCosineBetweenVectors(vectorA, vectorB)
  const angleRadians = angleBetweenVectorsRadians(vectorA, vectorB)

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getDotProductWhatToNotice(language, signState, projectionMode),
      theory: getDotProductTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [language, projectionMode, setSidebarOverride, signState, ui.status])

  const sourceEndScene = worldToScenePoint2D(sourceVector, transform)
  const projectedEndScene = worldToScenePoint2D(projection.projectedVector, transform)
  const sourceLabel = projectionMode === 'aOnB' ? 'a' : 'b'
  const targetLabel = projectionMode === 'aOnB' ? 'b' : 'a'

  const signClass =
    signState === 'positive'
      ? 'sign-badge sign-positive'
      : signState === 'negative'
        ? 'sign-badge sign-negative'
        : 'sign-badge sign-zero'

  return (
    <section className="dot-module">
      <div className="dot-scene-card">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="dot-scene"
          aria-label={ui.vectorSceneLabel}
          onPointerDown={viewport.onPointerDown}
          onPointerMove={viewport.onPointerMove}
          onPointerUp={viewport.onPointerUp}
          onPointerCancel={viewport.onPointerCancel}
          style={{ touchAction: 'none', cursor: 'grab' }}
        >
          <Grid2D transform={transform} step={1} />
          <Axes2D transform={transform} />

          <VectorArrow2D transform={transform} start={ORIGIN} end={vectorA} stroke="#2563eb" />
          <VectorArrow2D transform={transform} start={ORIGIN} end={vectorB} stroke="#16a34a" />

          {projection.isValid && (
            <>
              <VectorArrow2D
                transform={transform}
                start={ORIGIN}
                end={projection.projectedVector}
                stroke="#d97706"
                strokeWidth={2.2}
              />
              <line
                x1={sourceEndScene[0]}
                y1={sourceEndScene[1]}
                x2={projectedEndScene[0]}
                y2={projectedEndScene[1]}
                stroke="#d97706"
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
            </>
          )}

          {showAngle && angleRadians !== null && (
            <AngleArc2D
              transform={transform}
              center={ORIGIN}
              radiusInWorldUnits={1.2}
              startAngle={Math.atan2(vectorA[1], vectorA[0])}
              endAngle={Math.atan2(vectorB[1], vectorB[0])}
              stroke="#dc2626"
            />
          )}

          {unitTargetMode && normalizedTarget && (
            <VectorArrow2D
              transform={transform}
              start={ORIGIN}
              end={normalizedTarget}
              stroke="#0ea5e9"
              strokeWidth={1.8}
            />
          )}

          <LabelAnchor2D transform={transform} position={midpoint2(ORIGIN, vectorA)} text="a" />
          <LabelAnchor2D transform={transform} position={midpoint2(ORIGIN, vectorB)} text="b" />
          <LabelAnchor2D
            transform={transform}
            position={midpoint2(ORIGIN, projection.projectedVector)}
            text={ui.projectionLabel}
          />
          {unitTargetMode && normalizedTarget && (
            <LabelAnchor2D
              transform={transform}
              position={midpoint2(ORIGIN, normalizedTarget)}
              text={ui.unitTargetLabel}
            />
          )}

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

      <div className="dot-layout">
        <section className="dot-controls" aria-label="Dot product controls">
          <h3>{ui.controls}</h3>

          <p className="dot-control-title">{ui.projectionMode}</p>
          <div className="dot-chip-group">
            <button
              type="button"
              className={projectionMode === 'aOnB' ? 'chip is-active' : 'chip'}
              onClick={() => setProjectionMode('aOnB')}
            >
              {ui.aOnB}
            </button>
            <button
              type="button"
              className={projectionMode === 'bOnA' ? 'chip is-active' : 'chip'}
              onClick={() => setProjectionMode('bOnA')}
            >
              {ui.bOnA}
            </button>
          </div>

          <div className="dot-toggle-list">
            <label>
              <input
                type="checkbox"
                checked={showAngle}
                onChange={(event) => setShowAngle(event.target.checked)}
              />
              {ui.showAngle}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showCosine}
                onChange={(event) => setShowCosine(event.target.checked)}
              />
              {ui.showCosine}
            </label>
            <label>
              <input
                type="checkbox"
                checked={unitTargetMode}
                onChange={(event) => setUnitTargetMode(event.target.checked)}
              />
              {ui.unitTarget}
            </label>
          </div>

          <p className="control-hint">{ui.dragHint}</p>

          <div className="preset-list">
            {dotProductPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-button"
                onClick={() => {
                  setVectorA(preset.vectorA)
                  setVectorB(preset.vectorB)
                }}
              >
                <strong>{preset.label[language]}</strong>
                <span>{preset.description[language]}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="dot-algebra" aria-label="Dot product algebra">
          <h3>{ui.algebra}</h3>
          <p>
            a = <code>{formatVector(vectorA)}</code>
          </p>
          <p>
            b = <code>{formatVector(vectorB)}</code>
          </p>
          <p>
            a·b = <code>{formatNumber(dotValue)}</code>
          </p>
          <p>
            |a| = <code>{formatNumber(magnitudeVector2(vectorA))}</code>, |b| ={' '}
            <code>{formatNumber(magnitudeVector2(vectorB))}</code>
          </p>
          <p>
            projection ({sourceLabel} on {targetLabel}) ={' '}
            <code>{formatVector(projection.projectedVector)}</code>
          </p>
          {showCosine && (
            <p>
              cos(theta) = <code>{cosine === null ? 'n/a' : formatNumber(cosine)}</code>
            </p>
          )}
          {showAngle && (
            <p>
              theta = <code>{angleRadians === null ? 'n/a' : `${formatNumber((angleRadians * 180) / Math.PI)}°`}</code>
            </p>
          )}
          <p>
            <span className={signClass}>
              {signState === 'positive'
                ? ui.signPositive
                : signState === 'negative'
                  ? ui.signNegative
                  : ui.signZero}
            </span>
          </p>
        </section>
      </div>
    </section>
  )
}
