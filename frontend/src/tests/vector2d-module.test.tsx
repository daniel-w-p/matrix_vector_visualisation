import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppPreferencesContext } from '../app/AppPreferencesContext'
import { ModuleSidebarContext } from '../app/ModuleSidebarContext'
import { Vector2DModule } from '../modules/vector2d/Vector2DModule'

describe('Vector2DModule', () => {
  it('renders controls and algebra sections', () => {
    renderWithProviders()

    expect(screen.getByRole('heading', { name: /controls and presets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /algebra view/i })).toBeInTheDocument()
  })

  it('switches to scale mode and enables scalar interpretation text', async () => {
    const user = userEvent.setup()
    renderWithProviders()

    const scaleButtons = screen.getAllByRole('button', { name: /^scale$/i })
    await user.click(scaleButtons[0])

    expect(screen.getByText(/k a =/i)).toBeInTheDocument()
  })
})

function renderWithProviders() {
  return render(
    <AppPreferencesContext.Provider
      value={{ language: 'en', setLanguage: () => {}, theme: 'light', setTheme: () => {} }}
    >
      <ModuleSidebarContext.Provider value={{ setSidebarOverride: () => {} }}>
        <Vector2DModule />
      </ModuleSidebarContext.Provider>
    </AppPreferencesContext.Provider>,
  )
}
