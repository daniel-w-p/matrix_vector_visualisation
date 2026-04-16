import { useEffect, useRef, useState, type PointerEventHandler, type RefObject } from 'react'
import {
  createSceneTransform2D,
  sceneToWorldPoint2D,
  worldToScenePoint2D,
} from './coordinates'
import type { Point2D, SceneTransform2D } from './types'

const MIN_PPU = 20
const MAX_PPU = 120

type UseScene2DViewportResult = {
  svgRef: RefObject<SVGSVGElement | null>
  transform: SceneTransform2D
  onPointerDown: PointerEventHandler<SVGSVGElement>
  onPointerMove: PointerEventHandler<SVGSVGElement>
  onPointerUp: PointerEventHandler<SVGSVGElement>
  onPointerCancel: PointerEventHandler<SVGSVGElement>
  resetView: () => void
}

export function useScene2DViewport(
  width: number,
  height: number,
  basePixelsPerUnit: number,
): UseScene2DViewportResult {
  const initialTransform = createSceneTransform2D(width, height, basePixelsPerUnit)
  const svgRef = useRef<SVGSVGElement>(null)
  const [transform, setTransform] = useState<SceneTransform2D>(() => initialTransform)

  const isPanningRef = useRef(false)
  const activePointerIdRef = useRef<number | null>(null)
  const lastPointerSceneRef = useRef<Point2D | null>(null)

  useEffect(() => {
    const svgElement = svgRef.current
    if (!svgElement) {
      return
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()

      setTransform((previous) => {
        const cursorScenePoint = clientToSvgScenePoint(event.clientX, event.clientY, svgElement)
        const worldAtCursor = sceneToWorldPoint2D(cursorScenePoint, previous)
        const zoomFactor = Math.exp(-event.deltaY * 0.0015)
        const nextPixelsPerUnit = clamp(
          previous.pixelsPerUnit * zoomFactor,
          MIN_PPU,
          MAX_PPU,
        )
        const [nextOriginX, nextOriginY] = worldToScenePoint2D(worldAtCursor, {
          ...previous,
          pixelsPerUnit: nextPixelsPerUnit,
        })

        return {
          ...previous,
          pixelsPerUnit: nextPixelsPerUnit,
          originX: previous.originX + (cursorScenePoint[0] - nextOriginX),
          originY: previous.originY + (cursorScenePoint[1] - nextOriginY),
        }
      })
    }

    svgElement.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      svgElement.removeEventListener('wheel', onWheel)
    }
  }, [])

  const onPointerDown: PointerEventHandler<SVGSVGElement> = (event) => {
    const targetElement = event.target as Element | null
    if (targetElement?.closest('[data-scene2d-handle="true"]')) {
      return
    }

    const svgElement = svgRef.current
    if (!svgElement) {
      return
    }

    isPanningRef.current = true
    activePointerIdRef.current = event.pointerId
    lastPointerSceneRef.current = clientToSvgScenePoint(event.clientX, event.clientY, svgElement)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove: PointerEventHandler<SVGSVGElement> = (event) => {
    if (!isPanningRef.current || activePointerIdRef.current !== event.pointerId) {
      return
    }

    const svgElement = svgRef.current
    if (!svgElement || !lastPointerSceneRef.current) {
      return
    }

    const currentScene = clientToSvgScenePoint(event.clientX, event.clientY, svgElement)
    const dx = currentScene[0] - lastPointerSceneRef.current[0]
    const dy = currentScene[1] - lastPointerSceneRef.current[1]
    lastPointerSceneRef.current = currentScene

    setTransform((previous) => ({
      ...previous,
      originX: previous.originX + dx,
      originY: previous.originY + dy,
    }))
  }

  const endPan: PointerEventHandler<SVGSVGElement> = (event) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return
    }

    isPanningRef.current = false
    activePointerIdRef.current = null
    lastPointerSceneRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const resetView = () => {
    setTransform(initialTransform)
  }

  return {
    svgRef,
    transform,
    onPointerDown,
    onPointerMove,
    onPointerUp: endPan,
    onPointerCancel: endPan,
    resetView,
  }
}

function clientToSvgScenePoint(clientX: number, clientY: number, svgElement: SVGSVGElement): Point2D {
  const rect = svgElement.getBoundingClientRect()
  const viewBox = svgElement.viewBox.baseVal

  const sceneX = ((clientX - rect.left) / rect.width) * viewBox.width + viewBox.x
  const sceneY = ((clientY - rect.top) / rect.height) * viewBox.height + viewBox.y

  return [sceneX, sceneY]
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
