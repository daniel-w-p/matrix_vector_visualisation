import { describe, expect, it } from 'vitest'
import {
  computeCrossProductState,
  crossProductDotCheck,
  formatVector3,
} from '../modules/crossProduct3d/crossProductMath'

describe('crossProductMath', () => {
  it('computes cross product magnitude as area', () => {
    const state = computeCrossProductState([2, 0, 0], [0, 3, 0], false)

    expect(state.cross).toEqual([0, 0, 6])
    expect(state.area).toBe(6)
    expect(state.sineTheta).toBe(1)
  })

  it('flips direction after swapping operand order', () => {
    const normal = computeCrossProductState([1, 0, 0], [0, 1, 0], false)
    const swapped = computeCrossProductState([1, 0, 0], [0, 1, 0], true)

    expect(normal.cross).toEqual([0, 0, 1])
    expect(swapped.cross).toEqual([0, 0, -1])
  })

  it('detects near-parallel case', () => {
    const state = computeCrossProductState([2, 1, 0], [4, 2, 0], false)

    expect(state.isParallel).toBe(true)
    expect(state.area).toBe(0)
  })

  it('checks perpendicularity via dot products', () => {
    const state = computeCrossProductState([2, 1, 0], [0, 0, 3], false)
    const dots = crossProductDotCheck(state.cross, state.firstOperand, state.secondOperand)

    expect(Math.abs(dots.withFirst)).toBeLessThan(1e-10)
    expect(Math.abs(dots.withSecond)).toBeLessThan(1e-10)
  })

  it('formats vectors to stable numeric strings', () => {
    expect(formatVector3([1, 2.345, -0.333])).toBe('[1, 2.35, -0.33]')
  })
})
