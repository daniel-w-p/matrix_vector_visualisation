import { useModuleSelection } from '../hooks/useModuleSelection'
import { moduleCards, moduleOrder, type ModuleKey } from '../content/moduleCards'
import { moduleScreens } from '../modules'

export function AppShell() {
  const { selectedModule, selectModule } = useModuleSelection('vector2d')
  const ActiveScreen = moduleScreens[selectedModule]

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Vector Lab</p>
        <h1>Linear Algebra Exploration Lab</h1>
        <p className="app-subtitle">
          Explore each concept through direct manipulation and synchronized algebraic views.
        </p>
      </header>

      <nav className="module-nav" aria-label="Module navigation">
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
              {card.shortLabel}
            </button>
          )
        })}
      </nav>

      <main className="module-layout">
        <section className="module-viewport" aria-label="Module viewport">
          <ActiveScreen />
        </section>

        <aside className="module-panel" aria-label="Module details">
          <ModuleDetails moduleId={selectedModule} />
        </aside>
      </main>
    </div>
  )
}

function ModuleDetails({ moduleId }: { moduleId: ModuleKey }) {
  const card = moduleCards[moduleId]
  const isInteractive = moduleId === 'vector2d'

  return (
    <>
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      <p className="module-status">
        Status: <strong>{isInteractive ? 'Interactive module' : 'Placeholder screen'}</strong>
      </p>
    </>
  )
}
