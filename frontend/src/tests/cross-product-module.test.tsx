import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { AppPreferencesContext } from '../app/AppPreferencesContext'
import { ModuleSidebarContext } from '../app/ModuleSidebarContext'
import { CrossProductModule } from '../modules/crossProduct3d/CrossProductModule'

vi.mock('../scene3d', () => {
  return {
    Scene3DCanvas: ({
      overlay,
    }: {
      overlay: ReactNode
    }) => <div>{overlay}</div>,
    Axes3D: () => <div>axes</div>,
    Vector3DArrow: ({ label }: { label?: string }) => <div>{label ?? 'vector'}</div>,
    Scene3DReadout: ({ title }: { title: string }) => <div>{title}</div>,
  }
})

describe('CrossProductModule', () => {
  it('renders controls and algebra sections', () => {
    renderWithProviders()

    expect(screen.getByRole('heading', { name: /controls and presets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /algebra view/i })).toBeInTheDocument()
  })

  it('switches operation label after swapping order', async () => {
    const user = userEvent.setup()
    renderWithProviders()

    expect(screen.getByText(/a × b =/i)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /swap order/i }))
    expect(screen.getByText(/b × a =/i)).toBeInTheDocument()
  })
})

function renderWithProviders() {
  return render(
    <AppPreferencesContext.Provider
      value={{ language: 'en', setLanguage: () => {}, theme: 'light', setTheme: () => {} }}
    >
      <ModuleSidebarContext.Provider value={{ setSidebarOverride: () => {} }}>
        <CrossProductModule />
      </ModuleSidebarContext.Provider>
    </AppPreferencesContext.Provider>,
  )
}
