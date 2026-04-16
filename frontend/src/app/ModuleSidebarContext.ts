import { createContext, useContext } from 'react'

export type ModuleSidebarContent = {
  whatToNotice: string
  theory: string[]
  status: string
}

type ModuleSidebarContextValue = {
  setSidebarOverride: (content: ModuleSidebarContent | null) => void
}

export const ModuleSidebarContext = createContext<ModuleSidebarContextValue | null>(null)

export function useModuleSidebar(): ModuleSidebarContextValue {
  const context = useContext(ModuleSidebarContext)

  if (!context) {
    throw new Error('useModuleSidebar must be used within ModuleSidebarContext.Provider')
  }

  return context
}
