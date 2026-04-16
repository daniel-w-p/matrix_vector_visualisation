import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppPreferencesContext } from '../app/AppPreferencesContext'
import { ModuleSidebarContext } from '../app/ModuleSidebarContext'
import { EigenModule } from '../modules/eigen/EigenModule'

describe('EigenModule', () => {
  it('renders controls and algebra sections', () => {
    renderWithProviders()

    expect(screen.getByRole('heading', { name: /controls and presets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /algebra view/i })).toBeInTheDocument()
  })

  it('switches lambda mode to manual and shows manual input', async () => {
    const user = userEvent.setup()
    renderWithProviders()

    await user.click(screen.getByRole('button', { name: /manual/i }))

    expect(screen.getByLabelText(/manual lambda/i)).toBeInTheDocument()
  })

  it('shows no-real-eigenvector warning for rotation preset', async () => {
    const user = userEvent.setup()
    renderWithProviders()

    await user.click(screen.getByRole('button', { name: /rotation \(no real\)/i }))

    expect(screen.getByText(/this matrix has no real eigenvectors in 2d/i)).toBeInTheDocument()
  })
})

function renderWithProviders() {
  return render(
    <AppPreferencesContext.Provider
      value={{ language: 'en', setLanguage: () => {}, theme: 'light', setTheme: () => {} }}
    >
      <ModuleSidebarContext.Provider value={{ setSidebarOverride: () => {} }}>
        <EigenModule />
      </ModuleSidebarContext.Provider>
    </AppPreferencesContext.Provider>,
  )
}
