import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from '../App'

describe('App shell smoke test', () => {
  it('renders the lab shell heading and module tabs', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /linear algebra exploration lab/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /vector 2d/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /eigen/i })).toBeInTheDocument()
  })
})
