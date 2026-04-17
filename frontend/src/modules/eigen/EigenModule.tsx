import { useEffect, useMemo, useState } from 'react'
import type { Matrix2x2, Vector2 } from '../../math'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  eigenPresets,
  getEigenTheory,
  getEigenUIText,
  getEigenWhatToNotice,
  type EigenLambdaMode,
} from '../../content/eigenContent'
import {
  Axes2D,
  DraggablePointHandle2D,
  Grid2D,
  LabelAnchor2D,
  useScene2DViewport,
  VectorArrow2D,
  worldToScenePoint2D,
} from '../../scene2d'
import { Vector2Editor } from '../shared/Vector2Editor'
import {
  discriminant2x2,
  formatMatrix2x2,
  formatNumber,
  formatVector2,
  hasRealEigenvalues2x2,
  midpoint2,
  rayleighQuotient2D,
  residualState,
  sampleDirectionResiduals,
  verifyEigenCandidate2D,
  type ResidualState,
} from './eigenMath'
import './eigen-module.css'

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360
const ORIGIN: Vector2 = [0, 0]

export function EigenModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getEigenUIText(language)
  const viewport = useScene2DViewport(SCENE_WIDTH, SCENE_HEIGHT, 40)
  const { svgRef, transform } = viewport

  const [matrix, setMatrix] = useState<Matrix2x2>([
    [2, 0],
    [0, -1],
  ])
  const [candidateVector, setCandidateVector] = useState<Vector2>([2.2, 0])
  const [lambdaMode, setLambdaMode] = useState<EigenLambdaMode>('bestFit')
  const [manualLambda, setManualLambda] = useState(2)
  const [showCandidate, setShowCandidate] = useState(true)
  const [showTransformed, setShowTransformed] = useState(true)
  const [showScaled, setShowScaled] = useState(true)
  const [showDifference, setShowDifference] = useState(true)
  const [showDirectionScan, setShowDirectionScan] = useState(true)

  const bestFitLambda = rayleighQuotient2D(matrix, candidateVector)
  const activeLambda = lambdaMode === 'bestFit' ? bestFitLambda : manualLambda
  const verification = verifyEigenCandidate2D(matrix, candidateVector, activeLambda)
  const state = residualState(verification.residual)
  const discriminant = discriminant2x2(matrix)
  const hasRealEigenvectors = hasRealEigenvalues2x2(matrix)
  const directionSamples = useMemo(() => sampleDirectionResiduals(matrix, 28, 3.4), [matrix])
  const applicationsTitle = language === 'pl' ? 'Zastosowania' : 'Applications'
  const applicationItems =
    language === 'pl'
      ? [
          'Podnoszenie macierzy do potęgi: Aᵏv na kierunku własnym daje skalę ~ λᵏ.',
          'Analiza stabilności układów dynamicznych przez moduł dominującego λ.',
          'PCA i redukcja wymiaru korzystają z wektorów własnych macierzy kowariancji.',
        ]
      : [
          'Matrix powers: along an eigen-direction, Aᵏv scales approximately as λᵏ.',
          'Stability analysis of dynamical systems via dominant eigenvalue magnitude.',
          'PCA and dimensionality reduction rely on covariance eigenvectors.',
        ]

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getEigenWhatToNotice(language, state, hasRealEigenvectors),
      theory: getEigenTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [hasRealEigenvectors, language, setSidebarOverride, state, ui.status])

  const residualClass = getResidualClass(state)

  return (
    <section className="eigen-module">
      <div className="eigen-scene-card">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="eigen-scene"
          aria-label={ui.sceneLabel}
          onPointerDown={viewport.onPointerDown}
          onPointerMove={viewport.onPointerMove}
          onPointerUp={viewport.onPointerUp}
          onPointerCancel={viewport.onPointerCancel}
          style={{ touchAction: 'none', cursor: 'grab' }}
        >
          <Grid2D transform={transform} step={1} />
          <Axes2D transform={transform} />

          {showDirectionScan && (
            <g aria-hidden="true">
              {directionSamples.map((sample, index) => {
                const start = worldToScenePoint2D(ORIGIN, transform)
                const end = worldToScenePoint2D(sample.endpoint, transform)

                return (
                  <line
                    key={`ray-${index}`}
                    x1={start[0]}
                    y1={start[1]}
                    x2={end[0]}
                    y2={end[1]}
                    stroke={
                      sample.residual < 0.12
                        ? '#16a34a'
                        : sample.residual < 0.28
                          ? '#eab308'
                          : '#94a3b8'
                    }
                    strokeOpacity={sample.residual < 0.12 ? 0.8 : 0.45}
                    strokeWidth={sample.residual < 0.12 ? 1.7 : 1}
                  />
                )
              })}
            </g>
          )}

          {showCandidate && (
            <>
              <VectorArrow2D transform={transform} start={ORIGIN} end={candidateVector} stroke="#7c3aed" />
              <LabelAnchor2D transform={transform} position={midpoint2(ORIGIN, candidateVector)} text="v" />
            </>
          )}

          {showTransformed && (
            <>
              <VectorArrow2D
                transform={transform}
                start={ORIGIN}
                end={verification.transformedVector}
                stroke="#ea580c"
                strokeWidth={2.4}
              />
              <LabelAnchor2D
                transform={transform}
                position={midpoint2(ORIGIN, verification.transformedVector)}
                text="Av"
              />
            </>
          )}

          {showScaled && (
            <>
              <VectorArrow2D
                transform={transform}
                start={ORIGIN}
                end={verification.scaledVector}
                stroke="#16a34a"
                strokeWidth={2.2}
              />
              <LabelAnchor2D
                transform={transform}
                position={midpoint2(ORIGIN, verification.scaledVector)}
                text="λv"
              />
            </>
          )}

          {showDifference && (
            <>
              <VectorArrow2D
                transform={transform}
                start={verification.scaledVector}
                end={verification.transformedVector}
                stroke="#dc2626"
                strokeWidth={1.9}
              />
              <LabelAnchor2D
                transform={transform}
                position={midpoint2(verification.scaledVector, verification.transformedVector)}
                text="r"
              />
            </>
          )}

          <DraggablePointHandle2D
            svgRef={svgRef}
            transform={transform}
            position={candidateVector}
            onChange={setCandidateVector}
            snapStep={0.25}
            clampBounds={{ minX: -7, maxX: 7, minY: -4.5, maxY: 4.5 }}
            fill="#f3e8ff"
            stroke="#6d28d9"
          />
        </svg>
        <button type="button" className="scene-reset-button" onClick={viewport.resetView}>
          {ui.resetView}
        </button>
      </div>

      <div className="eigen-layout">
        <section className="eigen-controls" aria-label="Eigen controls">
          <h3>{ui.controls}</h3>

          <MatrixEditor label={ui.matrixA} matrix={matrix} onChange={setMatrix} />
          <Vector2Editor label={ui.candidateVector} value={candidateVector} onChange={setCandidateVector} />

          <p className="eigen-section-title">{ui.lambdaSection}</p>
          <p className="eigen-section-title eigen-subtitle">{ui.lambdaMode}</p>
          <div className="eigen-chip-group">
            <button
              type="button"
              className={lambdaMode === 'bestFit' ? 'chip is-active' : 'chip'}
              onClick={() => setLambdaMode('bestFit')}
            >
              {ui.lambdaBestFit}
            </button>
            <button
              type="button"
              className={lambdaMode === 'manual' ? 'chip is-active' : 'chip'}
              onClick={() => setLambdaMode('manual')}
            >
              {ui.lambdaManual}
            </button>
          </div>

          <p className="eigen-readout-line">
            {ui.bestFitLambda}: <code>{formatNumber(bestFitLambda)}</code>
          </p>

          {lambdaMode === 'manual' && (
            <label className="lambda-manual" htmlFor="lambda-manual-input">
              <span>{ui.manualLambda}</span>
              <input
                id="lambda-manual-input"
                type="number"
                step={0.1}
                value={manualLambda}
                onChange={(event) => setManualLambda(Number(event.target.value))}
              />
            </label>
          )}

          <button
            type="button"
            className="copy-lambda-button"
            onClick={() => {
              setLambdaMode('manual')
              setManualLambda(Math.round(bestFitLambda * 100) / 100)
            }}
          >
            {ui.copyBestFit}
          </button>

          <p className="eigen-section-title">{ui.overlays}</p>
          <div className="eigen-toggle-list">
            <label>
              <input
                type="checkbox"
                checked={showCandidate}
                onChange={(event) => setShowCandidate(event.target.checked)}
              />
              {ui.showCandidate}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showTransformed}
                onChange={(event) => setShowTransformed(event.target.checked)}
              />
              {ui.showTransformed}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showScaled}
                onChange={(event) => setShowScaled(event.target.checked)}
              />
              {ui.showScaled}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showDifference}
                onChange={(event) => setShowDifference(event.target.checked)}
              />
              {ui.showDifference}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showDirectionScan}
                onChange={(event) => setShowDirectionScan(event.target.checked)}
              />
              {ui.showDirectionScan}
            </label>
          </div>

          <div className="preset-list">
            {eigenPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-button"
                onClick={() => {
                  setMatrix(preset.matrix)
                  setCandidateVector(preset.candidateVector)
                  setLambdaMode(preset.lambdaMode)
                  setManualLambda(preset.lambda)
                }}
              >
                <strong>{preset.label[language]}</strong>
                <span>{preset.description[language]}</span>
              </button>
            ))}
          </div>

          <p className="control-hint">{ui.dragHint}</p>
          <p className="control-hint">{ui.scanHint}</p>
          {!hasRealEigenvectors && <p className="eigen-warning">{ui.noRealEigenHint}</p>}
        </section>

        <div className="eigen-info-column">
          <section className="eigen-algebra" aria-label="Eigen algebra">
          <h3>{ui.algebra}</h3>
          <p>
            A = <code>{formatMatrix2x2(matrix)}</code>
          </p>
          <p>
            v = <code>{formatVector2(candidateVector)}</code>
          </p>
          <p>
            A * v = <code>{formatVector2(verification.transformedVector)}</code>
          </p>
          <p>
            {ui.bestFitLambda} = <code>{formatNumber(bestFitLambda)}</code>
          </p>
          <p>
            λ = <code>{formatNumber(activeLambda)}</code>
          </p>
          <p>
            λ v = <code>{formatVector2(verification.scaledVector)}</code>
          </p>
          <p>
            A v - λ v = <code>{formatVector2(verification.differenceVector)}</code>
          </p>
          <p>
            {ui.residual}: <code>{formatNumber(verification.residual)}</code>{' '}
            <span className={residualClass}>
              {state === 'exact'
                ? ui.residualExact
                : state === 'aligned'
                ? ui.residualAligned
                : state === 'close'
                  ? ui.residualClose
                  : ui.residualOff}
            </span>
          </p>
          <p>
            discriminant = <code>{formatNumber(discriminant)}</code>
          </p>
          <p>
            {ui.realEigenvectors}:{' '}
            <strong>{hasRealEigenvectors ? ui.yes : ui.no}</strong>
          </p>
          </section>

          <section className="eigen-applications" aria-label="Eigen applications">
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

function getResidualClass(state: ResidualState): string {
  if (state === 'exact') {
    return 'residual-badge residual-good'
  }
  if (state === 'aligned') {
    return 'residual-badge residual-good'
  }
  if (state === 'close') {
    return 'residual-badge residual-mid'
  }
  return 'residual-badge residual-off'
}

function MatrixEditor({
  label,
  matrix,
  onChange,
}: {
  label: string
  matrix: Matrix2x2
  onChange: (next: Matrix2x2) => void
}) {
  return (
    <div className="matrix-editor">
      <p className="eigen-section-title">{label}</p>
      <div className="matrix-grid">
        {matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${label}-${rowIndex}-${colIndex}`}
              type="number"
              step={0.25}
              value={value}
              onChange={(event) => {
                const nextValue = Number(event.target.value)
                const nextMatrix: Matrix2x2 = [
                  [
                    rowIndex === 0 && colIndex === 0 ? nextValue : matrix[0][0],
                    rowIndex === 0 && colIndex === 1 ? nextValue : matrix[0][1],
                  ],
                  [
                    rowIndex === 1 && colIndex === 0 ? nextValue : matrix[1][0],
                    rowIndex === 1 && colIndex === 1 ? nextValue : matrix[1][1],
                  ],
                ]
                onChange(nextMatrix)
              }}
            />
          )),
        )}
      </div>
    </div>
  )
}
