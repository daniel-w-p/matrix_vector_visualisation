import { useMemo, useRef, useState } from 'react'
import { AngleArc2D } from './AngleArc2D'
import { AreaPolygon2D } from './AreaPolygon2D'
import { Axes2D } from './Axes2D'
import { createSceneTransform2D } from './coordinates'
import { DraggablePointHandle2D } from './DraggablePointHandle2D'
import { angleFromVector2D } from './geometry'
import { Grid2D } from './Grid2D'
import { LabelAnchor2D } from './LabelAnchor2D'
import type { Point2D } from './types'
import { VectorArrow2D } from './VectorArrow2D'

const SVG_WIDTH = 520
const SVG_HEIGHT = 300

export function Scene2DPlayground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [vectorA, setVectorA] = useState<Point2D>([3, 2])
  const [vectorB, setVectorB] = useState<Point2D>([1, 3])

  const transform = useMemo(() => createSceneTransform2D(SVG_WIDTH, SVG_HEIGHT, 36), [])
  const angleStart = angleFromVector2D(vectorA)
  const angleEnd = angleFromVector2D(vectorB)

  return (
    <section aria-label="2D scene primitives playground">
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        style={{
          border: '1px solid #d4dce5',
          borderRadius: 10,
          background: '#f9fbfe',
        }}
      >
        <Grid2D transform={transform} />
        <Axes2D transform={transform} />
        <AreaPolygon2D
          transform={transform}
          points={[
            [0, 0],
            vectorA,
            [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1]],
            vectorB,
          ]}
        />
        <AngleArc2D
          transform={transform}
          center={[0, 0]}
          radiusInWorldUnits={1.1}
          startAngle={angleStart}
          endAngle={angleEnd}
        />
        <VectorArrow2D transform={transform} start={[0, 0]} end={vectorA} stroke="#1d4ed8" />
        <VectorArrow2D transform={transform} start={[0, 0]} end={vectorB} stroke="#15803d" />
        <LabelAnchor2D transform={transform} position={vectorA} text="a" />
        <LabelAnchor2D transform={transform} position={vectorB} text="b" />
        <DraggablePointHandle2D
          svgRef={svgRef}
          transform={transform}
          position={vectorA}
          onChange={setVectorA}
          snapStep={0.25}
        />
        <DraggablePointHandle2D
          svgRef={svgRef}
          transform={transform}
          position={vectorB}
          onChange={setVectorB}
          snapStep={0.25}
        />
      </svg>
      <p style={{ marginTop: 8, fontSize: 12, color: '#3d4a5d' }}>
        Drag handles to verify grid, axes, arrows, angle arc, polygon fill, and label anchors.
      </p>
    </section>
  )
}
