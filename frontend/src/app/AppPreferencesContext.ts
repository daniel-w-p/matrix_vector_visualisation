import { createContext, useContext } from 'react'

export type AppLanguage = 'en' | 'pl'
export type AppTheme = 'light' | 'dark'

export type AppPreferencesContextValue = {
  language: AppLanguage
  setLanguage: (language: AppLanguage) => void
  theme: AppTheme
  setTheme: (theme: AppTheme) => void
}

export const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null)

export function useAppPreferences(): AppPreferencesContextValue {
  const context = useContext(AppPreferencesContext)

  if (!context) {
    throw new Error('useAppPreferences must be used within AppPreferencesContext.Provider')
  }

  return context
}
