import type { Point2D } from './types'

export function angleFromVector2D(vector: Point2D): number {
  return Math.atan2(vector[1], vector[0])
}

export function normalizeAngleRadians(angle: number): number {
  let normalized = angle % (Math.PI * 2)

  if (normalized <= -Math.PI) {
    normalized += Math.PI * 2
  }

  if (normalized > Math.PI) {
    normalized -= Math.PI * 2
  }

  return normalized
}

export function sampleArcPoints2D(
  center: Point2D,
  radius: number,
  startAngle: number,
  endAngle: number,
  segmentCount = 24,
): Point2D[] {
  const delta = normalizeAngleRadians(endAngle - startAngle)
  const safeSegments = Math.max(2, segmentCount)
  const points: Point2D[] = []

  for (let index = 0; index <= safeSegments; index += 1) {
    const t = index / safeSegments
    const angle = startAngle + delta * t
    const x = center[0] + radius * Math.cos(angle)
    const y = center[1] - radius * Math.sin(angle)
    points.push([x, y])
  }

  return points
}

export function formatPointsForSvg(points: readonly Point2D[]): string {
  return points.map((point) => `${point[0]},${point[1]}`).join(' ')
}

export function buildArrowHeadPoints2D(
  start: Point2D,
  end: Point2D,
  headLength: number,
  headWidth: number,
): [Point2D, Point2D, Point2D] {
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const magnitude = Math.hypot(dx, dy)

  if (magnitude === 0) {
    return [end, end, end]
  }

  const ux = dx / magnitude
  const uy = dy / magnitude
  const px = -uy
  const py = ux

  const baseX = end[0] - ux * headLength
  const baseY = end[1] - uy * headLength

  const left: Point2D = [baseX + px * (headWidth / 2), baseY + py * (headWidth / 2)]
  const right: Point2D = [baseX - px * (headWidth / 2), baseY - py * (headWidth / 2)]

  return [end, left, right]
}
