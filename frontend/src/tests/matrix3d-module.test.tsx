import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { AppPreferencesContext } from '../app/AppPreferencesContext'
import { ModuleSidebarContext } from '../app/ModuleSidebarContext'
import { Matrix3DModule } from '../modules/matrix3d/Matrix3DModule'

vi.mock('../scene3d', () => {
  return {
    Scene3DCanvas: ({ overlay }: { overlay?: ReactNode }) => <div>{overlay}</div>,
    Axes3D: () => <div>axes</div>,
    Vector3DArrow: ({ label }: { label?: string }) => <div>{label ?? 'vector'}</div>,
    Scene3DReadout: ({ title }: { title: string }) => <div>{title}</div>,
  }
})

describe('Matrix3DModule', () => {
  it('renders controls and algebra sections', () => {
    renderWithProviders()

    expect(screen.getByRole('heading', { name: /controls and presets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /algebra view/i })).toBeInTheDocument()
  })

  it('switches to add mode and shows matrix B editor', async () => {
    const user = userEvent.setup()
    renderWithProviders()

    await user.click(screen.getByRole('button', { name: /a \+ b/i }))

    expect(screen.getByText(/matrix b/i)).toBeInTheDocument()
  })
})

function renderWithProviders() {
  return render(
    <AppPreferencesContext.Provider
      value={{ language: 'en', setLanguage: () => {}, theme: 'light', setTheme: () => {} }}
    >
      <ModuleSidebarContext.Provider value={{ setSidebarOverride: () => {} }}>
        <Matrix3DModule />
      </ModuleSidebarContext.Provider>
    </AppPreferencesContext.Provider>,
  )
}
