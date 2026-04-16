import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    expect(screen.getByRole('heading', { name: /what to notice/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /theory/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /status/i })).toBeInTheDocument()
  })

  it('supports switching language to polish', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/language/i), 'pl')

    expect(
      screen.getByRole('heading', { name: /laboratorium eksploracji algebry liniowej/i }),
    ).toBeInTheDocument()
  })
})
