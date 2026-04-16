import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
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

type CrossAxis = 'x' | 'y' | 'z'
type DeterminantColumn = 'c1' | 'c2' | 'c3'

const crossComponentInfo: Record<
  CrossAxis,
  {
    formula: string
    positive: readonly [string, string]
    negative: readonly [string, string]
  }
> = {
  x: {
    formula: 'a₂b₃ - a₃b₂',
    positive: ['a₂', 'b₃'],
    negative: ['a₃', 'b₂'],
  },
  y: {
    formula: 'a₃b₁ - a₁b₃',
    positive: ['a₃', 'b₁'],
    negative: ['a₁', 'b₃'],
  },
  z: {
    formula: 'a₁b₂ - a₂b₁',
    positive: ['a₁', 'b₂'],
    negative: ['a₂', 'b₁'],
  },
}

const crossMatrixCells = [
  ['a₁', 'a₂', 'a₃'],
  ['b₁', 'b₂', 'b₃'],
] as const

type DeterminantColumnInfo = {
  positiveCells: readonly string[]
  negativeCells: readonly string[]
  positiveTerm: readonly [string, string, string]
  negativeTerm: readonly [string, string, string]
}

const determinant3x3ColumnInfo: Record<DeterminantColumn, DeterminantColumnInfo> = {
  c1: {
    positiveCells: ['a11', 'a22', 'a33'],
    negativeCells: ['a11', 'a23', 'a32'],
    positiveTerm: ['a11', 'a22', 'a33'],
    negativeTerm: ['a11', 'a23', 'a32'],
  },
  c2: {
    positiveCells: ['a12', 'a23', 'a31'],
    negativeCells: ['a12', 'a21', 'a33'],
    positiveTerm: ['a12', 'a23', 'a31'],
    negativeTerm: ['a12', 'a21', 'a33'],
  },
  c3: {
    positiveCells: ['a13', 'a21', 'a32'],
    negativeCells: ['a13', 'a22', 'a31'],
    positiveTerm: ['a13', 'a21', 'a32'],
    negativeTerm: ['a13', 'a22', 'a31'],
  },
}

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
              <Suspense fallback={<p>{shellText.loadingModule}</p>}>
                <ActiveScreen />
              </Suspense>
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
        {moduleId === 'matrix3d' && <Determinant3DTheoryVisual language={language} />}
        {moduleId === 'crossProduct3d' && <CrossProductTheoryVisual language={language} />}
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

function Determinant3DTheoryVisual({ language }: { language: AppLanguage }) {
  const [selectedColumn, setSelectedColumn] = useState<DeterminantColumn>('c1')
  const selectedInfo = determinant3x3ColumnInfo[selectedColumn]
  const hint = language === 'pl' ? 'Kliknij kolumnę' : 'Click column'
  const signTitle = language === 'pl' ? 'Szachownica znaków kofaktorów' : 'Cofactor sign checkerboard'
  const signExplanation =
    language === 'pl'
      ? 'Znaki wynikają z wzoru (-1)^(i+j). Dlatego druga kolumna ma odwrócony układ znaków względem pierwszej i trzeciej.'
      : 'Signs come from (-1)^(i+j). That is why the second column has the opposite sign pattern compared with the first and third.'

  const matrixCells = [
    ['a11', 'a12', 'a13'],
    ['a21', 'a22', 'a23'],
    ['a31', 'a32', 'a33'],
  ] as const

  const getCellState = (cell: string): 'neutral' | 'positive' | 'negative' | 'dual' => {
    const isPositive = selectedInfo.positiveCells.includes(cell)
    const isNegative = selectedInfo.negativeCells.includes(cell)
    if (isPositive && isNegative) {
      return 'dual'
    }
    if (isPositive) {
      return 'positive'
    }
    if (isNegative) {
      return 'negative'
    }
    return 'neutral'
  }

  const getCellClassName = (cell: string) => {
    const state = getCellState(cell)
    if (state === 'positive') {
      return 'det3-cell det3-cell-positive'
    }
    if (state === 'negative') {
      return 'det3-cell det3-cell-negative'
    }
    if (state === 'dual') {
      return 'det3-cell det3-cell-dual'
    }
    return 'det3-cell'
  }

  return (
    <div className="det3-theory" aria-label={language === 'pl' ? 'Wizualizacja det 3x3' : 'Determinant 3x3 visual'}>
      <div className="det3-column-row">
        <p className="det3-hint">{hint}</p>
        <div className="det3-column-tabs" role="tablist" aria-label="determinant-column-tabs">
          {(['c1', 'c2', 'c3'] as const).map((column, index) => (
            <button
              key={column}
              type="button"
              className={selectedColumn === column ? 'det3-column-tab is-active' : 'det3-column-tab'}
              onClick={() => setSelectedColumn(column)}
            >
              C{index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="det3-grid" aria-hidden="true">
        {matrixCells.flat().map((cell) => {
          const state = getCellState(cell)
          return (
            <div key={cell} className={getCellClassName(cell)}>
              {state === 'dual' && (
                <span className="det3-dual-markers" aria-hidden="true">
                  <span className="det3-dual-plus">+</span>
                  <span className="det3-dual-minus">-</span>
                </span>
              )}
              {renderIndexedMatrixSymbol(cell)}
            </div>
          )
        })}
      </div>

      <p className="det3-formula">
        det(A) ={' '}
        <span
          className={
            selectedColumn === 'c1'
              ? 'det3-positive-term det3-positive-term-selected'
              : 'det3-positive-term'
          }
        >
          {renderTerm(determinant3x3ColumnInfo.c1.positiveTerm, 'c1', selectedColumn)}
        </span>{' '}
        <span className="det3-plus">+</span>{' '}
        <span
          className={
            selectedColumn === 'c2'
              ? 'det3-positive-term det3-positive-term-selected'
              : 'det3-positive-term'
          }
        >
          {renderTerm(determinant3x3ColumnInfo.c2.positiveTerm, 'c2', selectedColumn)}
        </span>{' '}
        <span className="det3-plus">+</span>{' '}
        <span
          className={
            selectedColumn === 'c3'
              ? 'det3-positive-term det3-positive-term-selected'
              : 'det3-positive-term'
          }
        >
          {renderTerm(determinant3x3ColumnInfo.c3.positiveTerm, 'c3', selectedColumn)}
        </span>{' '}
        <span className="det3-minus">-</span>{' '}
        <span
          className={
            selectedColumn === 'c1'
              ? 'det3-negative-term det3-negative-term-selected'
              : 'det3-negative-term'
          }
        >
          {renderTerm(determinant3x3ColumnInfo.c1.negativeTerm, 'c1', selectedColumn)}
        </span>{' '}
        <span className="det3-minus">-</span>{' '}
        <span
          className={
            selectedColumn === 'c2'
              ? 'det3-negative-term det3-negative-term-selected'
              : 'det3-negative-term'
          }
        >
          {renderTerm(determinant3x3ColumnInfo.c2.negativeTerm, 'c2', selectedColumn)}
        </span>{' '}
        <span className="det3-minus">-</span>{' '}
        <span
          className={
            selectedColumn === 'c3'
              ? 'det3-negative-term det3-negative-term-selected'
              : 'det3-negative-term'
          }
        >
          {renderTerm(determinant3x3ColumnInfo.c3.negativeTerm, 'c3', selectedColumn)}
        </span>
      </p>

      <div className="det3-signs">
        <p className="det3-signs-title">{signTitle}</p>
        <div className="det3-sign-grid" aria-hidden="true">
          <div className="det3-sign-cell det3-sign-positive">+</div>
          <div className="det3-sign-cell det3-sign-negative">-</div>
          <div className="det3-sign-cell det3-sign-positive">+</div>
          <div className="det3-sign-cell det3-sign-negative">-</div>
          <div className="det3-sign-cell det3-sign-positive">+</div>
          <div className="det3-sign-cell det3-sign-negative">-</div>
          <div className="det3-sign-cell det3-sign-positive">+</div>
          <div className="det3-sign-cell det3-sign-negative">-</div>
          <div className="det3-sign-cell det3-sign-positive">+</div>
        </div>
        <p className="det3-signs-explanation">{signExplanation}</p>
      </div>
    </div>
  )
}

function renderTerm(
  term: readonly [string, string, string],
  termColumn: DeterminantColumn,
  selectedColumn: DeterminantColumn,
) {
  const className = termColumn === selectedColumn ? 'det3-term-selected' : undefined
  return (
    <span className={className}>
      {renderIndexedMatrixSymbol(term[0])}*{renderIndexedMatrixSymbol(term[1])}*
      {renderIndexedMatrixSymbol(term[2])}
    </span>
  )
}

function renderIndexedMatrixSymbol(value: string) {
  const row = value.slice(1, 2)
  const column = value.slice(2, 3)
  return (
    <>
      a<sub>{row}{column}</sub>
    </>
  )
}

function CrossProductTheoryVisual({ language }: { language: AppLanguage }) {
  const [selectedAxis, setSelectedAxis] = useState<CrossAxis>('x')
  const selectedInfo = crossComponentInfo[selectedAxis]
  const hint = language === 'pl' ? 'Kliknij' : 'Click'

  const getClassName = (value: string) => {
    if (selectedInfo.positive.includes(value)) {
      return 'cross-cell cross-cell-positive'
    }
    if (selectedInfo.negative.includes(value)) {
      return 'cross-cell cross-cell-negative'
    }
    return 'cross-cell'
  }

  return (
    <div className="cross-theory" aria-label={language === 'pl' ? 'Macierz iloczynu wektorowego' : 'Cross product matrix'}>
      <div className="cross-axis-row">
        <p className="cross-theory-hint">{hint}</p>
        <div className="cross-axis-tabs" role="tablist" aria-label="cross-axis-tabs">
        {(['x', 'y', 'z'] as const).map((axis) => (
          <button
            key={axis}
            type="button"
            className={selectedAxis === axis ? 'cross-axis-tab is-active' : 'cross-axis-tab'}
            onClick={() => setSelectedAxis(axis)}
          >
            {axis}
          </button>
        ))}
        </div>
      </div>

      <div className="cross-grid" aria-hidden="true">
        <div className={selectedAxis === 'x' ? 'cross-head is-active' : 'cross-head'}>x</div>
        <div className={selectedAxis === 'y' ? 'cross-head is-active' : 'cross-head'}>y</div>
        <div className={selectedAxis === 'z' ? 'cross-head is-active' : 'cross-head'}>z</div>

        {crossMatrixCells[0].map((entry) => (
          <div key={`a-${entry}`} className={getClassName(entry)}>
            {entry}
          </div>
        ))}

        {crossMatrixCells[1].map((entry) => (
          <div key={`b-${entry}`} className={getClassName(entry)}>
            {entry}
          </div>
        ))}
      </div>

      <p className="cross-formula">
        {selectedAxis} = <span className="cross-pos">{selectedInfo.formula.split(' - ')[0]}</span>{' '}
        <span className="cross-minus">-</span>{' '}
        <span className="cross-neg">{selectedInfo.formula.split(' - ')[1]}</span>
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
      loadingModule: 'Ładowanie modułu...',
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
    loadingModule: 'Loading module...',
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
