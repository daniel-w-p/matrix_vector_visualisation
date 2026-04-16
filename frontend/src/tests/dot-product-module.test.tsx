import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppPreferencesContext } from '../app/AppPreferencesContext'
import { ModuleSidebarContext } from '../app/ModuleSidebarContext'
import { DotProductModule } from '../modules/dotProduct/DotProductModule'

describe('DotProductModule', () => {
  it('renders controls and algebra', () => {
    renderWithProviders()

    expect(screen.getByRole('heading', { name: /controls and presets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /algebra view/i })).toBeInTheDocument()
    expect(screen.getByText(/a·b/i)).toBeInTheDocument()
  })

  it('allows switching projection direction', async () => {
    const user = userEvent.setup()
    renderWithProviders()

    await user.click(screen.getByRole('button', { name: /project b onto a/i }))

    expect(screen.getByText(/projection \(b on a\)/i)).toBeInTheDocument()
  })
})

function renderWithProviders() {
  return render(
    <AppPreferencesContext.Provider
      value={{ language: 'en', setLanguage: () => {}, theme: 'light', setTheme: () => {} }}
    >
      <ModuleSidebarContext.Provider value={{ setSidebarOverride: () => {} }}>
        <DotProductModule />
      </ModuleSidebarContext.Provider>
    </AppPreferencesContext.Provider>,
  )
}
