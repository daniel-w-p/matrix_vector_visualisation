import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Vector2DModule } from '../modules/vector2d/Vector2DModule'

describe('Vector2DModule', () => {
  it('renders controls, algebra, and what-to-notice panel', () => {
    render(<Vector2DModule />)

    expect(screen.getByRole('heading', { name: /controls and presets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /algebra view/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what to notice/i })).toBeInTheDocument()
  })

  it('switches to scale mode and enables scalar interpretation text', async () => {
    const user = userEvent.setup()
    render(<Vector2DModule />)

    const scaleButtons = screen.getAllByRole('button', { name: /^scale$/i })
    await user.click(scaleButtons[0])

    expect(screen.getByText(/k a =/i)).toBeInTheDocument()
    const noteSection = screen.getByLabelText(/what to notice/i)
    expect(within(noteSection).getByText(/^Notice /i)).toBeInTheDocument()
  })
})
