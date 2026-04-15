import { useRef, type PointerEventHandler, type RefObject } from 'react'
import {
  clampWorldPoint2D,
  sceneToWorldPoint2D,
  snapWorldPoint2D,
  worldToScenePoint2D,
} from './coordinates'
import type { HandleClamp2D, Point2D, SceneTransform2D } from './types'

type DraggablePointHandle2DProps = {
  svgRef: RefObject<SVGSVGElement | null>
  transform: SceneTransform2D
  position: Point2D
  onChange: (nextPosition: Point2D) => void
  radius?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  snapStep?: number
  clampBounds?: HandleClamp2D
}

export function DraggablePointHandle2D({
  svgRef,
  transform,
  position,
  onChange,
  radius = 6,
  fill = '#ffffff',
  stroke = '#0f172a',
  strokeWidth = 2,
  snapStep,
  clampBounds = {},
}: DraggablePointHandle2DProps) {
  const isDraggingRef = useRef(false)
  const activePointerIdRef = useRef<number | null>(null)
  const [cx, cy] = worldToScenePoint2D(position, transform)

  const onPointerDown: PointerEventHandler<SVGCircleElement> = (event) => {
    isDraggingRef.current = true
    activePointerIdRef.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove: PointerEventHandler<SVGCircleElement> = (event) => {
    if (!isDraggingRef.current || activePointerIdRef.current !== event.pointerId) {
      return
    }

    const svgElement = svgRef.current
    if (!svgElement) {
      return
    }

    const scenePoint = clientToSvgScenePoint(event.clientX, event.clientY, svgElement)
    const worldPoint = sceneToWorldPoint2D(scenePoint, transform)
    const snappedPoint = snapWorldPoint2D(worldPoint, snapStep)
    const clampedPoint = clampWorldPoint2D(snappedPoint, clampBounds)
    onChange(clampedPoint)
  }

  const onPointerUp: PointerEventHandler<SVGCircleElement> = (event) => {
    if (activePointerIdRef.current === event.pointerId) {
      isDraggingRef.current = false
      activePointerIdRef.current = null
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      style={{ cursor: 'grab', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  )
}

function clientToSvgScenePoint(clientX: number, clientY: number, svgElement: SVGSVGElement): Point2D {
  const rect = svgElement.getBoundingClientRect()
  const viewBox = svgElement.viewBox.baseVal

  const sceneX = ((clientX - rect.left) / rect.width) * viewBox.width + viewBox.x
  const sceneY = ((clientY - rect.top) / rect.height) * viewBox.height + viewBox.y

  return [sceneX, sceneY]
}
