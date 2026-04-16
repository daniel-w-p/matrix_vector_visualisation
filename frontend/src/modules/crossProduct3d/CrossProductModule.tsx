import { useEffect, useMemo, useState } from 'react'
import { Line } from '@react-three/drei'
import { BufferGeometry, DoubleSide, Float32BufferAttribute } from 'three'
import { useAppPreferences } from '../../app/AppPreferencesContext'
import { useModuleSidebar } from '../../app/ModuleSidebarContext'
import {
  crossProduct3DPresets,
  getCrossProduct3DTheory,
  getCrossProduct3DUIText,
  getCrossProduct3DWhatToNotice,
} from '../../content/crossProduct3dContent'
import type { Vector3 } from '../../math'
import { Axes3D, Scene3DCanvas, Scene3DReadout, Vector3DArrow } from '../../scene3d'
import {
  addVector3,
  computeCrossProductState,
  crossProductDotCheck,
  formatAngleDegrees,
  formatNumber,
  formatVector3,
} from './crossProductMath'
import './cross-product-3d-module.css'

const ORIGIN: Vector3 = [0, 0, 0]

export function CrossProductModule() {
  const { language } = useAppPreferences()
  const { setSidebarOverride } = useModuleSidebar()
  const ui = getCrossProduct3DUIText(language)

  const [vectorA, setVectorA] = useState<Vector3>([2.2, 1.2, 0.7])
  const [vectorB, setVectorB] = useState<Vector3>([0.8, 1.9, 1.4])
  const [isSwapped, setIsSwapped] = useState(false)
  const [showParallelogram, setShowParallelogram] = useState(true)
  const [showSine, setShowSine] = useState(true)
  const [showOppositeNormal, setShowOppositeNormal] = useState(true)

  const state = useMemo(
    () => computeCrossProductState(vectorA, vectorB, isSwapped),
    [isSwapped, vectorA, vectorB],
  )
  const dotChecks = useMemo(
    () => crossProductDotCheck(state.cross, state.firstOperand, state.secondOperand),
    [state.cross, state.firstOperand, state.secondOperand],
  )

  useEffect(() => {
    setSidebarOverride({
      whatToNotice: getCrossProduct3DWhatToNotice(language, isSwapped, state.isParallel),
      theory: getCrossProduct3DTheory(language),
      status: ui.status,
    })

    return () => {
      setSidebarOverride(null)
    }
  }, [isSwapped, language, setSidebarOverride, state.isParallel, ui.status])

  const firstLabel = isSwapped ? 'b' : 'a'
  const secondLabel = isSwapped ? 'a' : 'b'
  const operationLabel = isSwapped ? ui.operationBA : ui.operationAB

  return (
    <section className="cross3d-module">
      <div className="cross3d-scene-card">
        <Scene3DCanvas
          ariaLabel={ui.sceneLabel}
          resetLabel={ui.resetView}
          overlay={
            <Scene3DReadout
              title={ui.readoutTitle}
              items={[
                { label: ui.readoutOrder, value: operationLabel },
                { label: ui.readoutArea, value: formatNumber(state.area) },
                { label: ui.readoutAngle, value: formatAngleDegrees(state.angleRadians) },
                {
                  label: ui.readoutSine,
                  value: state.sineTheta === null ? 'n/a' : formatNumber(state.sineTheta),
                },
                {
                  label: ui.readoutParallel,
                  value: state.isParallel ? ui.stateParallel : ui.stateGeneral,
                },
              ]}
            />
          }
        >
          <Axes3D length={3.8} />

          {showParallelogram && (
            <Parallelogram3D
              vectorA={state.firstOperand}
              vectorB={state.secondOperand}
              fillColor="#60a5fa"
              outlineColor="#1d4ed8"
            />
          )}

          <Vector3DArrow
            origin={ORIGIN}
            vector={state.firstOperand}
            color="#2f7a3d"
            label={firstLabel}
            thickness={0.055}
          />
          <Vector3DArrow
            origin={ORIGIN}
            vector={state.secondOperand}
            color="#1f5faa"
            label={secondLabel}
            thickness={0.055}
          />
          <Vector3DArrow
            origin={ORIGIN}
            vector={state.cross}
            color="#d97706"
            label={operationLabel}
            thickness={0.06}
          />

          {showOppositeNormal && state.magnitudeCross > 0.03 && (
            <Vector3DArrow
              origin={ORIGIN}
              vector={state.oppositeCross}
              color="#6b7280"
              label={isSwapped ? ui.operationAB : ui.operationBA}
              thickness={0.034}
            />
          )}
        </Scene3DCanvas>
      </div>

      <div className="cross3d-layout">
        <section className="cross3d-controls" aria-label="Cross product controls">
          <h3>{ui.controls}</h3>

          <button type="button" className="swap-button" onClick={() => setIsSwapped((prev) => !prev)}>
            {ui.swapOrder}
          </button>

          <p className="cross3d-control-title">{ui.vectorA}</p>
          <VectorInput3D value={vectorA} onChange={setVectorA} />

          <p className="cross3d-control-title">{ui.vectorB}</p>
          <VectorInput3D value={vectorB} onChange={setVectorB} />

          <div className="cross3d-toggle-list">
            <label>
              <input
                type="checkbox"
                checked={showParallelogram}
                onChange={(event) => setShowParallelogram(event.target.checked)}
              />
              {ui.showParallelogram}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showSine}
                onChange={(event) => setShowSine(event.target.checked)}
              />
              {ui.showSine}
            </label>
            <label>
              <input
                type="checkbox"
                checked={showOppositeNormal}
                onChange={(event) => setShowOppositeNormal(event.target.checked)}
              />
              {ui.showOppositeNormal}
            </label>
          </div>

          <p className="control-hint">{ui.dragHint}</p>

          <div className="preset-list">
            {crossProduct3DPresets.map((preset) => (
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

        <section className="cross3d-algebra" aria-label="Cross product algebra">
          <h3>{ui.algebra}</h3>
          <p>
            a = <code>{formatVector3(vectorA)}</code>
          </p>
          <p>
            b = <code>{formatVector3(vectorB)}</code>
          </p>
          <p>
            |a| = <code>{formatNumber(state.magnitudeFirst)}</code>
          </p>
          <p>
            |b| = <code>{formatNumber(state.magnitudeSecond)}</code>
          </p>
          <p>
            {operationLabel} = <code>{formatVector3(state.cross)}</code>
          </p>
          <p>
            |{operationLabel}| = <code>{formatNumber(state.magnitudeCross)}</code>
          </p>
          <p>
            |a||b|sin(theta) ={' '}
            <code>
              {formatNumber(state.magnitudeFirst)} * {formatNumber(state.magnitudeSecond)} *{' '}
              {state.sineTheta === null ? 'n/a' : formatNumber(state.sineTheta)}
            </code>
          </p>
          {showSine && (
            <p>
              sin(theta) = <code>{state.sineTheta === null ? 'n/a' : formatNumber(state.sineTheta)}</code>, theta ={' '}
              <code>{formatAngleDegrees(state.angleRadians)}</code>
            </p>
          )}
          <p>
            dot({operationLabel}, {firstLabel}) = <code>{formatNumber(dotChecks.withFirst)}</code>
          </p>
          <p>
            dot({operationLabel}, {secondLabel}) = <code>{formatNumber(dotChecks.withSecond)}</code>
          </p>
          <p className="cross3d-note">{ui.oppositeHint}</p>
        </section>
      </div>
    </section>
  )
}

function VectorInput3D({
  value,
  onChange,
}: {
  value: Vector3
  onChange: (vector: Vector3) => void
}) {
  return (
    <div className="vector3-input-grid">
      {value.map((entry, index) => (
        <label key={index}>
          <span>{index === 0 ? 'x' : index === 1 ? 'y' : 'z'}</span>
          <input
            type="number"
            step={0.1}
            value={entry}
            onChange={(event) => {
              const nextValue = Number(event.target.value)
              const nextVector: Vector3 = [
                index === 0 ? nextValue : value[0],
                index === 1 ? nextValue : value[1],
                index === 2 ? nextValue : value[2],
              ]
              onChange(nextVector)
            }}
          />
        </label>
      ))}
    </div>
  )
}

function Parallelogram3D({
  vectorA,
  vectorB,
  fillColor,
  outlineColor,
}: {
  vectorA: Vector3
  vectorB: Vector3
  fillColor: string
  outlineColor: string
}) {
  const diagonal = addVector3(vectorA, vectorB)
  const geometry = useMemo(() => {
    const built = new BufferGeometry()
    built.setAttribute(
      'position',
      new Float32BufferAttribute(
        [
          0,
          0,
          0,
          vectorA[0],
          vectorA[1],
          vectorA[2],
          vectorB[0],
          vectorB[1],
          vectorB[2],
          diagonal[0],
          diagonal[1],
          diagonal[2],
        ],
        3,
      ),
    )
    built.setIndex([0, 1, 3, 0, 3, 2])
    built.computeVertexNormals()
    return built
  }, [diagonal, vectorA, vectorB])
  useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  return (
    <group>
      <mesh>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color={fillColor} transparent opacity={0.35} side={DoubleSide} />
      </mesh>

      <Line
        points={[
          [0, 0, 0],
          [vectorA[0], vectorA[1], vectorA[2]],
          [diagonal[0], diagonal[1], diagonal[2]],
          [vectorB[0], vectorB[1], vectorB[2]],
          [0, 0, 0],
        ]}
        color={outlineColor}
        lineWidth={1.4}
      />
    </group>
  )
}
