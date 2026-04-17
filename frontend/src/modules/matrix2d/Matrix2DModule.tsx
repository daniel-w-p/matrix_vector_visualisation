import { useEffect, useMemo, useState } from 'react'
import { type Matrix2x2, type Vector2 } from '../../math'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  getMatrix2DTheory,
  getMatrix2DUIText,
  getMatrix2DWhatToNotice,
  matrix2DPresets,
  type Matrix2DMode,
} from '../../content/matrix2dContent'
import {
  AreaPolygon2D,
  Axes2D,
  DraggablePointHandle2D,
  Grid2D,
  LabelAnchor2D,
  useScene2DViewport,
  VectorArrow2D,
  worldToScenePoint2D,
} from '../../scene2d'
import {
  buildTransformedGridLines,
  computeEffectiveMatrix,
  determinantState,
  formatMatrix2x2,
  formatNumber,
  formatVector,
  matrixColumns,
  matrixDeterminant,
  midpoint2,
  transformedUnitSquare,
  transformedVector,
} from './matrix2dMath'
import { Vector2Editor } from '../shared/Vector2Editor'
import './matrix2d-module.css'

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360
const ORIGIN: Vector2 = [0, 0]

export function Matrix2DModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getMatrix2DUIText(language)
  const viewport = useScene2DViewport(SCENE_WIDTH, SCENE_HEIGHT, 38)
  const { svgRef, transform } = viewport

  const [mode, setMode] = useState<Matrix2DMode>('apply')
  const [matrixA, setMatrixA] = useState<Matrix2x2>([
    [1, 0],
    [0, 1],
  ])
  const [matrixB, setMatrixB] = useState<Matrix2x2>([
    [1, 0],
    [0, 1],
  ])
  const [scalar, setScalar] = useState(1)
  const [inputVector, setInputVector] = useState<Vector2>([2, 1.5])
  const [showBasis, setShowBasis] = useState(true)
  const [showTransformedGrid, setShowTransformedGrid] = useState(true)
  const [showDeterminantOverlay, setShowDeterminantOverlay] = useState(true)
  const [showVectorMap, setShowVectorMap] = useState(true)

  const effectiveMatrix = computeEffectiveMatrix(mode, matrixA, matrixB, scalar)
  const det = matrixDeterminant(effectiveMatrix)
  const detState = determinantState(det)
  const transformedVectorOutput = transformedVector(effectiveMatrix, inputVector)
  const transformedGridLines = useMemo(
    () => buildTransformedGridLines(effectiveMatrix, 5, 1),
    [effectiveMatrix],
  )
  const basisColumns = matrixColumns(effectiveMatrix)
  const unitSquare = transformedUnitSquare(effectiveMatrix)

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getMatrix2DWhatToNotice(language, mode, det),
      theory: getMatrix2DTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [det, language, mode, setSidebarOverride, ui.status])

  const modeOptions: Array<{ id: Matrix2DMode; label: string }> = [
    { id: 'apply', label: ui.apply },
    { id: 'add', label: ui.add },
    { id: 'subtract', label: ui.subtract },
    { id: 'scale', label: ui.scale },
  ]
  const orientationClass =
    detState === 'positive'
      ? 'orientation-badge orientation-positive'
      : detState === 'negative'
        ? 'orientation-badge orientation-negative'
        : 'orientation-badge orientation-zero'
  const orientationText =
    detState === 'positive'
      ? ui.orientationPositive
      : detState === 'negative'
        ? ui.orientationNegative
        : detState === 'zero_exact'
          ? ui.orientationZeroExact
          : ui.orientationZeroNear
  const applicationsTitle = language === 'pl' ? 'Zastosowania' : 'Applications'
  const applicationItems =
    language === 'pl'
      ? [
          'Transformacje 2D w grafice (obrót, skala, ścięcie) realizowane przez macierze.',
          'Mapowanie układów współrzędnych, np. z układu lokalnego obiektu do sceny.',
          'Szybkie wykrywanie zmiany orientacji (det < 0) i zdegenerowania (det blisko 0).',
        ]
      : [
          '2D graphics transforms (rotation, scale, shear) represented as matrices.',
          'Coordinate-frame mapping, e.g. from object-local space to world space.',
          'Fast orientation/degen checks (det < 0 flip, det near 0 collapse).',
        ]

  return (
    <section className="matrix2d-module">
      <div className="matrix2d-scene-card">
        <svg
          ref={svgRef}
          width="100%"
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
          className="matrix2d-scene"
          aria-label={ui.sceneLabel}
          onPointerDown={viewport.onPointerDown}
          onPointerMove={viewport.onPointerMove}
          onPointerUp={viewport.onPointerUp}
          onPointerCancel={viewport.onPointerCancel}
          style={{ touchAction: 'none', cursor: 'grab' }}
        >
          <Grid2D transform={transform} step={1} />
          <Axes2D transform={transform} />

          {showTransformedGrid && (
            <g aria-hidden="true">
              {transformedGridLines.map((line, index) => {
                const start = worldToScenePoint2D(line.start, transform)
                const end = worldToScenePoint2D(line.end, transform)
                return (
                  <line
                    key={`tgrid-${index}`}
                    x1={start[0]}
                    y1={start[1]}
                    x2={end[0]}
                    y2={end[1]}
                    stroke="#22c55e"
                    strokeOpacity={0.35}
                    strokeWidth={0.9}
                  />
                )
              })}
            </g>
          )}

          {showDeterminantOverlay && (
            <AreaPolygon2D
              transform={transform}
              points={unitSquare}
              fill={detState === 'negative' ? '#fca5a533' : '#60a5fa33'}
              stroke={detState === 'negative' ? '#dc2626' : '#2563eb'}
            />
          )}

          {showBasis && (
            <>
              <VectorArrow2D transform={transform} start={ORIGIN} end={[1, 0]} stroke="#64748b" />
              <VectorArrow2D transform={transform} start={ORIGIN} end={[0, 1]} stroke="#64748b" />
              <VectorArrow2D
                transform={transform}
                start={ORIGIN}
                end={basisColumns[0]}
                stroke="#1d4ed8"
                strokeWidth={2.3}
              />
              <VectorArrow2D
                transform={transform}
                start={ORIGIN}
                end={basisColumns[1]}
                stroke="#0f766e"
                strokeWidth={2.3}
              />
              <LabelAnchor2D transform={transform} position={midpoint2(ORIGIN, basisColumns[0])} text="Ae1" />
              <LabelAnchor2D transform={transform} position={midpoint2(ORIGIN, basisColumns[1])} text="Ae2" />
            </>
          )}

          {showVectorMap && (
            <>
              <VectorArrow2D transform={transform} start={ORIGIN} end={inputVector} stroke="#7c3aed" />
              <VectorArrow2D
                transform={transform}
                start={ORIGIN}
                end={transformedVectorOutput}
                stroke="#d97706"
                strokeWidth={2.4}
              />
              <LabelAnchor2D transform={transform} position={midpoint2(ORIGIN, inputVector)} text="v" />
              <LabelAnchor2D
                transform={transform}
                position={midpoint2(ORIGIN, transformedVectorOutput)}
                text="A*v"
              />
              <DraggablePointHandle2D
                svgRef={svgRef}
                transform={transform}
                position={inputVector}
                onChange={setInputVector}
                snapStep={0.25}
                clampBounds={{ minX: -6.5, maxX: 6.5, minY: -4.5, maxY: 4.5 }}
                fill="#f3e8ff"
                stroke="#6d28d9"
              />
            </>
          )}
        </svg>
        <button type="button" className="scene-reset-button" onClick={viewport.resetView}>
          {ui.resetView}
        </button>
      </div>

      <div className="matrix2d-layout">
        <section className="matrix2d-controls" aria-label="Matrix controls">
          <h3>{ui.controls}</h3>

          <p className="matrix2d-section-title">{ui.modeLabel}</p>
          <div className="matrix2d-chip-group">
            {modeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={mode === option.id ? 'chip is-active' : 'chip'}
                onClick={() => setMode(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <MatrixEditor label={ui.matrixA} matrix={matrixA} onChange={setMatrixA} />

          {(mode === 'add' || mode === 'subtract') && (
            <MatrixEditor label={ui.matrixB} matrix={matrixB} onChange={setMatrixB} />
          )}

          {mode === 'scale' && (
            <label className="scalar-control" htmlFor="matrix-scale">
              {ui.scalar}: <strong>{formatNumber(scalar)}</strong>
              <input
                id="matrix-scale"
                type="range"
                min={-3}
                max={3}
                step={0.25}
                value={scalar}
                onChange={(event) => setScalar(Number(event.target.value))}
              />
            </label>
          )}

          <Vector2Editor label={ui.inputVector} value={inputVector} onChange={setInputVector} />

          <p className="matrix2d-section-title">{ui.overlays}</p>
          <div className="matrix2d-toggle-list">
            <label>
              <input
                type="checkbox"
                checked={showBasis}
                onChange={(event) => setShowBasis(event.target.checked)}
              />
              {ui.basis}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showTransformedGrid}
                onChange={(event) => setShowTransformedGrid(event.target.checked)}
              />
              {ui.transformedGrid}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showDeterminantOverlay}
                onChange={(event) => setShowDeterminantOverlay(event.target.checked)}
              />
              {ui.determinant}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showVectorMap}
                onChange={(event) => setShowVectorMap(event.target.checked)}
              />
              {ui.vectorMap}
            </label>
          </div>

          <div className="preset-list">
            {matrix2DPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-button"
                onClick={() => {
                  setMode(preset.mode)
                  setMatrixA(preset.matrixA)
                  setMatrixB(preset.matrixB)
                  setScalar(preset.scalar)
                  setInputVector(preset.inputVector)
                }}
              >
                <strong>{preset.label[language]}</strong>
                <span>{preset.description[language]}</span>
              </button>
            ))}
          </div>

          <p className="control-hint">{ui.dragHint}</p>
        </section>

        <div className="matrix2d-info-column">
          <section className="matrix2d-algebra" aria-label="Matrix algebra">
            <h3>{ui.algebra}</h3>
            <p>
              A = <code>{formatMatrix2x2(matrixA)}</code>
            </p>
            {(mode === 'add' || mode === 'subtract') && (
              <p>
                B = <code>{formatMatrix2x2(matrixB)}</code>
              </p>
            )}
            {mode === 'scale' && (
              <p>
                k = <code>{formatNumber(scalar)}</code>
              </p>
            )}
            <p>
              Effective matrix = <code>{formatMatrix2x2(effectiveMatrix)}</code>
            </p>
            <p>
              det = <code>{formatNumber(det)}</code>
            </p>
            <p>
              {ui.orientation}:{' '}
              <span className={orientationClass}>
                {orientationText}
              </span>
            </p>
            <p>
              {detState === 'positive'
                ? ui.detPositive
                : detState === 'negative'
                  ? ui.detNegative
                  : detState === 'zero_exact'
                    ? ui.detZeroExact
                    : ui.detZeroNear}
            </p>
            <p>
              {ui.inputVector}: <code>{formatVector(inputVector)}</code>
            </p>
            <p>
              A * v = <code>{formatVector(transformedVectorOutput)}</code>
            </p>
          </section>

          <section className="matrix2d-applications" aria-label="Matrix 2D applications">
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
      <p className="matrix2d-section-title">{label}</p>
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
