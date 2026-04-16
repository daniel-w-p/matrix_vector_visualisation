import { Line } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import { BufferGeometry, DoubleSide, Float32BufferAttribute } from 'three'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  getMatrix3DTheory,
  getMatrix3DUIText,
  getMatrix3DWhatToNotice,
  matrix3DPresets,
  type Matrix3DMode,
} from '../../content/matrix3dContent'
import type { Matrix3x3, Vector3 } from '../../math'
import { Axes3D, Scene3DCanvas, Scene3DReadout, Vector3DArrow } from '../../scene3d'
import {
  computeEffectiveMatrix3D,
  CUBE_EDGES,
  CUBE_FACE_QUADS,
  determinant3x3,
  determinantState3D,
  formatMatrix3x3,
  formatNumber,
  formatVector3,
  matrixColumns3D,
  transformedUnitCubeVertices,
  transformedVector3,
  unitCubeVertices,
} from './matrix3dMath'
import './matrix3d-module.css'

const ORIGIN: Vector3 = [0, 0, 0]

export function Matrix3DModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getMatrix3DUIText(language)

  const [mode, setMode] = useState<Matrix3DMode>('apply')
  const [matrixA, setMatrixA] = useState<Matrix3x3>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])
  const [matrixB, setMatrixB] = useState<Matrix3x3>([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ])
  const [scalar, setScalar] = useState(1)
  const [inputVector, setInputVector] = useState<Vector3>([1.4, 1.1, 0.9])
  const [showBasis, setShowBasis] = useState(true)
  const [showUnitCube, setShowUnitCube] = useState(true)
  const [showVectorMap, setShowVectorMap] = useState(true)

  const effectiveMatrix = computeEffectiveMatrix3D(mode, matrixA, matrixB, scalar)
  const determinant = determinant3x3(effectiveMatrix)
  const detState = determinantState3D(determinant)
  const outputVector = transformedVector3(effectiveMatrix, inputVector)
  const basisColumns = matrixColumns3D(effectiveMatrix)
  const transformedCube = transformedUnitCubeVertices(effectiveMatrix)
  const baseCube = unitCubeVertices()

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getMatrix3DWhatToNotice(language, mode, determinant),
      theory: getMatrix3DTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [determinant, language, mode, setSidebarOverride, ui.status])

  const modeOptions: Array<{ id: Matrix3DMode; label: string }> = [
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

  return (
    <section className="matrix3d-module">
      <div className="matrix3d-scene-card">
        <Scene3DCanvas
          ariaLabel={ui.sceneLabel}
          resetLabel={ui.resetView}
          overlay={
            <Scene3DReadout
              title="Matrix 3D"
              items={[
                { label: 'det', value: formatNumber(determinant) },
                { label: '|det|', value: formatNumber(Math.abs(determinant)) },
                { label: 'A * v', value: formatVector3(outputVector) },
              ]}
            />
          }
        >
          <Axes3D length={3.6} />

          {showUnitCube && (
            <>
              <CubeEdges points={baseCube} color="#64748b" opacity={0.35} />
              <Parallelepiped
                points={transformedCube}
                fillColor={detState === 'negative' ? '#f87171' : '#60a5fa'}
                edgeColor={detState === 'negative' ? '#b91c1c' : '#1d4ed8'}
              />
            </>
          )}

          {showBasis && (
            <>
              <Vector3DArrow vector={[1, 0, 0]} color="#9ca3af" label="e1" thickness={0.03} />
              <Vector3DArrow vector={[0, 1, 0]} color="#9ca3af" label="e2" thickness={0.03} />
              <Vector3DArrow vector={[0, 0, 1]} color="#9ca3af" label="e3" thickness={0.03} />

              <Vector3DArrow vector={basisColumns[0]} color="#2563eb" label="Ae1" thickness={0.05} />
              <Vector3DArrow vector={basisColumns[1]} color="#059669" label="Ae2" thickness={0.05} />
              <Vector3DArrow vector={basisColumns[2]} color="#7c3aed" label="Ae3" thickness={0.05} />
            </>
          )}

          {showVectorMap && (
            <>
              <Vector3DArrow origin={ORIGIN} vector={inputVector} color="#a855f7" label="v" thickness={0.048} />
              <Vector3DArrow
                origin={ORIGIN}
                vector={outputVector}
                color="#ea580c"
                label="A*v"
                thickness={0.056}
              />
            </>
          )}
        </Scene3DCanvas>
      </div>

      <div className="matrix3d-layout">
        <section className="matrix3d-controls" aria-label="Matrix 3D controls">
          <h3>{ui.controls}</h3>

          <p className="matrix3d-section-title">{ui.modeLabel}</p>
          <div className="matrix3d-chip-group">
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

          <Matrix3Editor label={ui.matrixA} matrix={matrixA} onChange={setMatrixA} />
          {(mode === 'add' || mode === 'subtract') && (
            <Matrix3Editor label={ui.matrixB} matrix={matrixB} onChange={setMatrixB} />
          )}

          {mode === 'scale' && (
            <label className="scalar-control" htmlFor="matrix3d-scale">
              {ui.scalar}: <strong>{formatNumber(scalar)}</strong>
              <input
                id="matrix3d-scale"
                type="range"
                min={-3}
                max={3}
                step={0.25}
                value={scalar}
                onChange={(event) => setScalar(Number(event.target.value))}
              />
            </label>
          )}

          <VectorInput3D label={ui.inputVector} value={inputVector} onChange={setInputVector} />

          <p className="matrix3d-section-title">{ui.overlays}</p>
          <div className="matrix3d-toggle-list">
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
                checked={showUnitCube}
                onChange={(event) => setShowUnitCube(event.target.checked)}
              />
              {ui.unitCube}
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
            {matrix3DPresets.map((preset) => (
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

        <section className="matrix3d-algebra" aria-label="Matrix 3D algebra">
          <h3>{ui.algebra}</h3>
          <p>
            A = <code>{formatMatrix3x3(matrixA)}</code>
          </p>
          {(mode === 'add' || mode === 'subtract') && (
            <p>
              B = <code>{formatMatrix3x3(matrixB)}</code>
            </p>
          )}
          {mode === 'scale' && (
            <p>
              k = <code>{formatNumber(scalar)}</code>
            </p>
          )}
          <p>
            Effective matrix = <code>{formatMatrix3x3(effectiveMatrix)}</code>
          </p>
          <p>
            det = <code>{formatNumber(determinant)}</code>
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
            v = <code>{formatVector3(inputVector)}</code>
          </p>
          <p>
            A * v = <code>{formatVector3(outputVector)}</code>
          </p>
        </section>
      </div>
    </section>
  )
}

function Matrix3Editor({
  label,
  matrix,
  onChange,
}: {
  label: string
  matrix: Matrix3x3
  onChange: (next: Matrix3x3) => void
}) {
  return (
    <div className="matrix-editor">
      <p className="matrix3d-section-title">{label}</p>
      <div className="matrix3-grid">
        {matrix.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${label}-${rowIndex}-${colIndex}`}
              type="number"
              step={0.25}
              value={value}
              onChange={(event) => {
                const nextValue = Number(event.target.value)
                const nextMatrix: Matrix3x3 = [
                  [
                    rowIndex === 0 && colIndex === 0 ? nextValue : matrix[0][0],
                    rowIndex === 0 && colIndex === 1 ? nextValue : matrix[0][1],
                    rowIndex === 0 && colIndex === 2 ? nextValue : matrix[0][2],
                  ],
                  [
                    rowIndex === 1 && colIndex === 0 ? nextValue : matrix[1][0],
                    rowIndex === 1 && colIndex === 1 ? nextValue : matrix[1][1],
                    rowIndex === 1 && colIndex === 2 ? nextValue : matrix[1][2],
                  ],
                  [
                    rowIndex === 2 && colIndex === 0 ? nextValue : matrix[2][0],
                    rowIndex === 2 && colIndex === 1 ? nextValue : matrix[2][1],
                    rowIndex === 2 && colIndex === 2 ? nextValue : matrix[2][2],
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

function VectorInput3D({
  label,
  value,
  onChange,
}: {
  label: string
  value: Vector3
  onChange: (vector: Vector3) => void
}) {
  return (
    <div className="vector3-editor">
      <p className="matrix3d-section-title">{label}</p>
      <div className="vector3-grid">
        {value.map((entry, index) => (
          <label key={index}>
            <span>{index === 0 ? 'x' : index === 1 ? 'y' : 'z'}</span>
            <input
              type="number"
              step={0.25}
              value={entry}
              onChange={(event) => {
                const nextValue = Number(event.target.value)
                onChange([
                  index === 0 ? nextValue : value[0],
                  index === 1 ? nextValue : value[1],
                  index === 2 ? nextValue : value[2],
                ])
              }}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

function CubeEdges({
  points,
  color,
  opacity = 1,
}: {
  points: readonly Vector3[]
  color: string
  opacity?: number
}) {
  return (
    <>
      {CUBE_EDGES.map(([from, to]) => (
        <Line
          key={`${from}-${to}`}
          points={[points[from], points[to]]}
          color={color}
          lineWidth={1.2}
          transparent
          opacity={opacity}
        />
      ))}
    </>
  )
}

function Parallelepiped({
  points,
  fillColor,
  edgeColor,
}: {
  points: readonly Vector3[]
  fillColor: string
  edgeColor: string
}) {
  const geometry = useMemo(() => {
    const built = new BufferGeometry()
    const vertices = points.flatMap((point) => point)
    built.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    built.setIndex(
      CUBE_FACE_QUADS.flatMap(([a, b, c, d]) => [a, b, c, a, c, d]),
    )
    built.computeVertexNormals()
    return built
  }, [points])

  useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  return (
    <group>
      <mesh>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color={fillColor} transparent opacity={0.28} side={DoubleSide} />
      </mesh>
      <CubeEdges points={points} color={edgeColor} />
    </group>
  )
}
