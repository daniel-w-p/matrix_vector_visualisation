import { useEffect, useMemo, useState } from 'react'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  getLeastSquaresTheory,
  getLeastSquaresUIText,
  getLeastSquaresWhatToNotice,
  leastSquaresPresets,
} from '../../content/leastSquaresContent'
import {
  Axes2D,
  DraggablePointHandle2D,
  Grid2D,
  LabelAnchor2D,
  useScene2DViewport,
  VectorArrow2D,
  worldToScenePoint2D,
} from '../../scene2d'
import {
  computeLeastSquares4x2,
  type Matrix4x2,
  type Vector2,
  type Vector4,
} from '../../math'
import './least-squares-module.css'

const SCENE_WIDTH = 760
const SCENE_HEIGHT = 360
const ORIGIN: Vector2 = [0, 0]

type Samples4 = [Vector2, Vector2, Vector2, Vector2]

export function LeastSquaresModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getLeastSquaresUIText(language)
  const viewport = useScene2DViewport(SCENE_WIDTH, SCENE_HEIGHT, 34)
  const { svgRef, transform } = viewport

  const [samples, setSamples] = useState<Samples4>(
    leastSquaresPresets[0].samples as Samples4,
  )
  const [showResidual, setShowResidual] = useState(true)
  const [showProjection, setShowProjection] = useState(true)
  const [showColumns, setShowColumns] = useState(true)

  const matrixA: Matrix4x2 = useMemo(
    () => [
      [samples[0][0], 1],
      [samples[1][0], 1],
      [samples[2][0], 1],
      [samples[3][0], 1],
    ],
    [samples],
  )
  const vectorB: Vector4 = useMemo(
    () => [samples[0][1], samples[1][1], samples[2][1], samples[3][1]],
    [samples],
  )

  const solution = useMemo(() => computeLeastSquares4x2(matrixA, vectorB), [matrixA, vectorB])
  const isExact = solution.residualNorm < 1e-6

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getLeastSquaresWhatToNotice(language, solution.residualNorm, isExact),
      theory: getLeastSquaresTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [isExact, language, setSidebarOverride, solution.residualNorm, ui.status])

  const slope = solution.xStar[0]
  const intercept = solution.xStar[1]

  const lineXMin = -8
  const lineXMax = 8
  const lineStart: Vector2 = [lineXMin, slope * lineXMin + intercept]
  const lineEnd: Vector2 = [lineXMax, slope * lineXMax + intercept]

  const applicationsTitle = language === 'pl' ? 'Zastosowania' : 'Applications'
  const applicationItems =
    language === 'pl'
      ? [
          'Regresja liniowa dla danych zaszumionych.',
          'Prognozowanie trendu i estymacja parametrów modelu.',
          'Kalibracja z niespójnych pomiarów.',
          'Rzut obserwacji na model o mniejszym wymiarze.',
        ]
      : [
          'Linear regression for noisy data.',
          'Trend prediction and model-parameter estimation.',
          'Calibration from inconsistent measurements.',
          'Projection of observations onto a lower-dimensional model.',
        ]

  const columnSpaceLabel = language === 'pl' ? 'Col(A): span([x, 1])' : 'Col(A): span([x, 1])'

  return (
    <section className="lsq-module">
      <div className="lsq-scene-card">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="lsq-scene"
          aria-label={ui.sceneLabel}
          onPointerDown={viewport.onPointerDown}
          onPointerMove={viewport.onPointerMove}
          onPointerUp={viewport.onPointerUp}
          onPointerCancel={viewport.onPointerCancel}
          style={{ touchAction: 'none', cursor: 'grab' }}
        >
          <Grid2D transform={transform} step={1} />
          <Axes2D transform={transform} />

          <line
            x1={worldToScenePoint2D(lineStart, transform)[0]}
            y1={worldToScenePoint2D(lineStart, transform)[1]}
            x2={worldToScenePoint2D(lineEnd, transform)[0]}
            y2={worldToScenePoint2D(lineEnd, transform)[1]}
            className="lsq-fit-line"
          />

          {showColumns && (
            <text
              x={worldToScenePoint2D([-7.6, 4.3], transform)[0]}
              y={worldToScenePoint2D([-7.6, 4.3], transform)[1]}
              className="lsq-col-space-label"
            >
              {columnSpaceLabel}
            </text>
          )}

          {samples.map((sample, index) => {
            const predictedY = solution.axStar[index]
            const projectionPoint: Vector2 = [sample[0], predictedY]

            return (
              <g key={`sample-${index}`}>
                {showProjection && (
                  <circle
                    cx={worldToScenePoint2D(projectionPoint, transform)[0]}
                    cy={worldToScenePoint2D(projectionPoint, transform)[1]}
                    r={4}
                    className="lsq-proj-point"
                  />
                )}

                {showResidual && (
                  <VectorArrow2D
                    transform={transform}
                    start={projectionPoint}
                    end={sample}
                    stroke="#dc2626"
                    strokeWidth={1.7}
                  />
                )}

                <LabelAnchor2D
                  transform={transform}
                  position={sample}
                  text={`p${index + 1}`}
                />

                <DraggablePointHandle2D
                  svgRef={svgRef}
                  transform={transform}
                  position={sample}
                  onChange={(next) => {
                    setSamples((prev) => {
                      const copy = [...prev] as Samples4
                      copy[index] = next
                      return copy
                    })
                  }}
                  snapStep={0.1}
                  clampBounds={{ minX: -7.5, maxX: 7.5, minY: -4.5, maxY: 4.5 }}
                  fill="#f0fdf4"
                  stroke="#166534"
                />
              </g>
            )
          })}

          <LabelAnchor2D
            transform={transform}
            position={[(lineStart[0] + lineEnd[0]) / 2, (lineStart[1] + lineEnd[1]) / 2]}
            text="ŷ = m x + c"
          />

          {showProjection && (
            <>
              <VectorArrow2D transform={transform} start={ORIGIN} end={[1, intercept + slope]} stroke="#94a3b8" strokeWidth={1.2} />
              <LabelAnchor2D transform={transform} position={[1, intercept + slope]} text="b̂" />
            </>
          )}
        </svg>
        <div className="lsq-scene-actions">
          <button type="button" className="scene-reset-button" onClick={viewport.resetView}>
            {ui.resetView}
          </button>
          <button
            type="button"
            className="scene-reset-button"
            onClick={() => setSamples(leastSquaresPresets[0].samples as Samples4)}
          >
            {ui.resetPreset}
          </button>
        </div>
      </div>

      <div className="lsq-layout">
        <section className="lsq-controls" aria-label="Least squares controls">
          <h3>{ui.controls}</h3>

          <PointsEditor label={ui.samples} samples={samples} onChange={setSamples} />

          <div className="lsq-toggle-list">
            <label>
              <input type="checkbox" checked={showResidual} onChange={(event) => setShowResidual(event.target.checked)} />
              {ui.showResidual}
            </label>
            <label>
              <input type="checkbox" checked={showProjection} onChange={(event) => setShowProjection(event.target.checked)} />
              {ui.showProjection}
            </label>
            <label>
              <input type="checkbox" checked={showColumns} onChange={(event) => setShowColumns(event.target.checked)} />
              {ui.showColumns}
            </label>
          </div>

          <p className="control-hint">{ui.dragHint}</p>

          <div className="preset-list">
            {leastSquaresPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-button"
                onClick={() => setSamples(preset.samples as Samples4)}
              >
                <strong>{preset.label[language]}</strong>
                <span>{preset.description[language]}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="lsq-info-column">
          <section className="lsq-algebra" aria-label="Least squares algebra">
            <h3>{ui.algebra}</h3>
            <p>
              A = <code>{formatMatrix4x2(matrixA)}</code>
            </p>
            <p>
              b = <code>{formatVector4(vectorB)}</code>
            </p>
            <p>
              x* = [m, c] = <code>{formatVector2(solution.xStar)}</code>
            </p>
            <p>
              b̂ = Ax* = <code>{formatVector4(solution.axStar)}</code>
            </p>
            <p>
              r = b - b̂ = <code>{formatVector4(solution.residual)}</code>
            </p>
            <p>
              |r| = <code>{formatNumber(solution.residualNorm)}</code>
            </p>
            <p>
              A<sup>T</sup>A x* = A<sup>T</sup>b
            </p>
            <p>
              A<sup>T</sup>r ≈ <code>{formatVector2(solution.atResidual)}</code>
            </p>
          </section>

          <section className="lsq-applications" aria-label="Least squares applications">
            <h3>{applicationsTitle}</h3>
            <ul>
              {applicationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}

function PointsEditor({
  label,
  samples,
  onChange,
}: {
  label: string
  samples: Samples4
  onChange: (next: Samples4) => void
}) {
  return (
    <div className="vector-editor">
      <p className="lsq-section-title">{label}</p>
      <div className="lsq-points-grid">
        {samples.map((sample, index) => (
          <div key={index} className="lsq-point-row">
            <span className="lsq-point-name">p{index + 1}</span>
            <label>
              <span>x</span>
              <input
                type="number"
                step={0.1}
                value={sample[0]}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  onChange(updateSample(samples, index, [value, sample[1]]))
                }}
              />
            </label>
            <label>
              <span>y</span>
              <input
                type="number"
                step={0.1}
                value={sample[1]}
                onChange={(event) => {
                  const value = Number(event.target.value)
                  onChange(updateSample(samples, index, [sample[0], value]))
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function updateSample(samples: Samples4, index: number, point: Vector2): Samples4 {
  return [
    index === 0 ? point : samples[0],
    index === 1 ? point : samples[1],
    index === 2 ? point : samples[2],
    index === 3 ? point : samples[3],
  ]
}

function formatNumber(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 'n/a'
  }
  const rounded = Math.round(value * 1000) / 1000
  return Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(3).replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1')
}

function formatVector2(vector: Vector2): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}]`
}

function formatVector4(vector: Vector4): string {
  return `[${formatNumber(vector[0])}, ${formatNumber(vector[1])}, ${formatNumber(vector[2])}, ${formatNumber(vector[3])}]`
}

function formatMatrix4x2(matrix: Matrix4x2): string {
  return `[${matrix.map((row) => `[${formatNumber(row[0])}, ${formatNumber(row[1])}]`).join(', ')}]`
}
