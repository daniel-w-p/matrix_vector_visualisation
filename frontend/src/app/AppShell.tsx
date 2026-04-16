import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  AppPreferencesContext,
  type AppLanguage,
  type AppTheme,
} from './AppPreferencesContext'
import {
  ModuleSidebarContext,
  type ModuleSidebarContent,
} from './ModuleSidebarContext'
import {
  getLocalizedText,
  moduleCards,
  moduleOrder,
  type ModuleKey,
} from '../content/moduleCards'
import { moduleScreens } from '../modules'

const STORAGE_LANGUAGE_KEY = 'vector-lab-language'
const STORAGE_THEME_KEY = 'vector-lab-theme'

export function AppShell() {
  const { selectedModule, selectModule } = useModuleSelection('vector2d')
  const [language, setLanguage] = useState<AppLanguage>(() => {
    const stored = readStorage(STORAGE_LANGUAGE_KEY)
    return stored === 'pl' || stored === 'en' ? stored : 'en'
  })
  const [theme, setTheme] = useState<AppTheme>(() => {
    const stored = readStorage(STORAGE_THEME_KEY)
    return stored === 'light' || stored === 'dark' ? stored : 'light'
  })
  const [sidebarOverride, setSidebarOverride] = useState<{
    moduleId: ModuleKey
    content: ModuleSidebarContent
  } | null>(null)
  const ActiveScreen = moduleScreens[selectedModule]

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    writeStorage(STORAGE_LANGUAGE_KEY, language)
  }, [language])

  useEffect(() => {
    writeStorage(STORAGE_THEME_KEY, theme)
  }, [theme])

  const setSidebarOverrideForModule = useCallback(
    (content: ModuleSidebarContent | null) => {
      if (!content) {
        setSidebarOverride(null)
        return
      }

      setSidebarOverride({ moduleId: selectedModule, content })
    },
    [selectedModule],
  )

  const sidebarContent = useMemo(() => {
    if (sidebarOverride && sidebarOverride.moduleId === selectedModule) {
      return sidebarOverride.content
    }

    const card = moduleCards[selectedModule]
    return {
      whatToNotice: getLocalizedText(card.defaultWhatToNotice, language),
      theory: card.defaultTheory.map((entry) => getLocalizedText(entry, language)),
      status: getLocalizedText(card.defaultStatus, language),
    }
  }, [language, selectedModule, sidebarOverride])

  const shellText = getShellText(language)

  return (
    <AppPreferencesContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      <ModuleSidebarContext.Provider
        value={{
          setSidebarOverride: setSidebarOverrideForModule,
        }}
      >
        <div className={`app-shell theme-${theme}`} data-theme={theme}>
          <header className="app-header">
            <div>
              <p className="app-kicker">Vector Lab</p>
              <h1>{shellText.title}</h1>
              <p className="app-subtitle">{shellText.subtitle}</p>
            </div>

            <div className="app-preferences" aria-label={shellText.preferences}>
              <label className="pref-label" htmlFor="language-select">
                {shellText.language}
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(event) => setLanguage(event.target.value as AppLanguage)}
              >
                <option value="en">English</option>
                <option value="pl">Polski</option>
              </select>

              <label className="pref-label" htmlFor="theme-select">
                {shellText.theme}
              </label>
              <select
                id="theme-select"
                value={theme}
                onChange={(event) => setTheme(event.target.value as AppTheme)}
              >
                <option value="light">{shellText.light}</option>
                <option value="dark">{shellText.dark}</option>
              </select>
            </div>
          </header>

          <nav className="module-nav" aria-label={shellText.moduleNavigation}>
            {moduleOrder.map((moduleId) => {
              const card = moduleCards[moduleId]
              const isActive = selectedModule === moduleId

              return (
                <button
                  key={card.id}
                  type="button"
                  className={isActive ? 'module-tab is-active' : 'module-tab'}
                  onClick={() => selectModule(moduleId)}
                  aria-pressed={isActive}
                >
                  {getLocalizedText(card.shortLabel, language)}
                </button>
              )
            })}
          </nav>

          <main className="module-layout">
            <section className="module-viewport" aria-label={shellText.moduleViewport}>
              <ActiveScreen />
            </section>

            <aside className="module-panel" aria-label={shellText.moduleDetails}>
              <ModuleDetails
                language={language}
                moduleId={selectedModule}
                sidebarContent={sidebarContent}
              />
            </aside>
          </main>
        </div>
      </ModuleSidebarContext.Provider>
    </AppPreferencesContext.Provider>
  )
}

function ModuleDetails({
  moduleId,
  language,
  sidebarContent,
}: {
  moduleId: ModuleKey
  language: AppLanguage
  sidebarContent: ModuleSidebarContent
}) {
  const card = moduleCards[moduleId]
  const shellText = getShellText(language)

  return (
    <>
      <h2>{getLocalizedText(card.title, language)}</h2>
      <p>{getLocalizedText(card.description, language)}</p>

      <section className="sidebar-card">
        <h3>{shellText.whatToNotice}</h3>
        <p>{sidebarContent.whatToNotice}</p>
      </section>

      <section className="sidebar-card">
        <h3>{shellText.theory}</h3>
        {sidebarContent.theory.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {moduleId === 'matrix2d' && <DeterminantTheoryVisual />}
      </section>

      <section className="sidebar-card">
        <h3>{shellText.status}</h3>
        <p className="module-status">{sidebarContent.status}</p>
      </section>
    </>
  )
}

function DeterminantTheoryVisual() {
  return (
    <div className="det-theory">
      <div className="det-grid" aria-hidden="true">
        <div className="det-cell det-main">
          a<sub>11</sub>
        </div>
        <div className="det-cell det-second">
          a<sub>12</sub>
        </div>
        <div className="det-cell det-second">
          a<sub>21</sub>
        </div>
        <div className="det-cell det-main">
          a<sub>22</sub>
        </div>
      </div>
      <p className="det-formula">
        det(A) ={' '}
        <span className="det-main">
          a<sub>11</sub>*a<sub>22</sub>
        </span>{' '}
        <span className="det-minus">-</span>{' '}
        <span className="det-second">
          a<sub>12</sub>*a<sub>21</sub>
        </span>
      </p>
    </div>
  )
}

function useModuleSelection(initialModule: ModuleKey) {
  const [selectedModule, setSelectedModule] = useState<ModuleKey>(initialModule)

  return {
    selectedModule,
    selectModule: setSelectedModule,
  }
}

function getShellText(language: AppLanguage) {
  if (language === 'pl') {
    return {
      title: 'Laboratorium eksploracji algebry liniowej',
      subtitle:
        'Odkrywaj pojęcia przez bezpośrednią manipulację i zsynchronizowane widoki algebraiczne.',
      preferences: 'Preferencje',
      language: 'Język',
      theme: 'Motyw',
      light: 'Jasny',
      dark: 'Ciemny',
      moduleNavigation: 'Nawigacja modułów',
      moduleViewport: 'Widok modułu',
      moduleDetails: 'Szczegóły modułu',
      whatToNotice: 'Do zapamiętania',
      theory: 'Teoria',
      status: 'Status',
    }
  }

  return {
    title: 'Linear Algebra Exploration Lab',
    subtitle: 'Explore each concept through direct manipulation and synchronized algebraic views.',
    preferences: 'Preferences',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    moduleNavigation: 'Module navigation',
    moduleViewport: 'Module viewport',
    moduleDetails: 'Module details',
    whatToNotice: 'What to notice',
    theory: 'Theory',
    status: 'Status',
  }
}

function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignore storage errors in restricted environments.
  }
}
