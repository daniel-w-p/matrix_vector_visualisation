# Architecture Plan

## 1. Overall approach

Use a **docs-driven monorepo layout** with a client-heavy frontend and a minimal Django host.

## 2. Repository structure

```text
/
├─ frontend/
│  └─ src/
│     ├─ app/
│     ├─ components/
│     ├─ content/
│     ├─ hooks/
│     ├─ math/
│     ├─ modules/
│     ├─ scene2d/
│     ├─ scene3d/
│     ├─ workers/
│     ├─ styles/
│     └─ tests/
├─ backend/
│  ├─ config/
│  └─ vectorlab_web/
└─ docs/
```

## 3. Frontend architecture

### 3.1 App layer
Responsible for:

- app shell
- high-level navigation
- page/module selection
- shared layout
- global theme and common UI state
- language selection (`pl` / `en`)
- light/dark mode switching

Suggested path:
- `frontend/src/app/`

### 3.2 Domain math layer
Pure functions and types only.

Responsibilities:
- vector operations
- matrix operations
- determinant calculations
- eigen calculations
- projection helpers
- geometric helper functions

Suggested path:
- `frontend/src/math/`

Rules:
- keep it framework-agnostic
- no DOM code
- no rendering code
- make functions testable in isolation

### 3.3 2D scene layer
Reusable SVG primitives and interaction helpers.

Responsibilities:
- axes
- grid
- vector arrows
- labels
- angle arcs
- polygon fills
- draggable handles
- coordinate transforms between scene and data

Suggested path:
- `frontend/src/scene2d/`

### 3.4 3D scene layer
Reusable R3F scene helpers.

Responsibilities:
- shared canvas wrappers
- camera and orbit controls
- axes
- planes
- vector meshes
- parallelogram / parallelepiped visuals
- labels or screen-space overlays

Suggested path:
- `frontend/src/scene3d/`

### 3.5 Module layer
Feature-specific screens and module logic.

Suggested modules:
- `vector2d`
- `dotProduct`
- `matrix2d`
- `crossProduct3d`
- `matrix3d`
- `eigen`

Suggested path:
- `frontend/src/modules/`

Each module should own:
- its page/screen component
- local UI state
- pedagogical presets
- module-specific explanatory text mapping
- composition of math + rendering pieces

Shared shell expectation across all modules:
- right column always renders:
  1. `What to notice`
  2. `Theory` (with concise examples)
  3. `Status`

### 3.6 Content layer
Pedagogical copy and presets.

Responsibilities:
- lesson text
- guided prompts
- edge-case presets
- “what to notice” copy
- compare-mode labels

Suggested path:
- `frontend/src/content/`

### 3.7 Worker layer
Dedicated background computations only when justified.

Suggested path:
- `frontend/src/workers/`

Candidate workloads:
- dense sampling for eigen direction search
- repeated heavy transform sampling
- more expensive numerical routines
- future animation precomputation if needed

Do **not** move trivial dot/cross/matrix operations into workers.

## 4. State management strategy

Start simple:

- local component state
- React context for app-wide preferences if needed

Avoid adding a global state library in the first milestone unless a real pain point appears.

## 5. Backend architecture

Django is initially a **host shell**, not a compute engine.

Responsibilities:
- serve the HTML entry point
- serve collected frontend static assets
- optionally expose small future APIs
- handle deployment integration

Non-responsibilities in early versions:
- math computation
- scene rendering
- business logic unrelated to hosting

Suggested backend shape:
- `backend/config/` — Django project config
- `backend/vectorlab_web/` — app for index/template/static integration

## 6. Development workflow

### Local development
- run Vite frontend separately
- run Django separately only when backend work is needed
- keep a clean boundary between frontend and backend concerns

### Production
- build frontend with Vite
- deliver built assets through Django static handling
- keep same-origin deployment simple

## 7. Testing strategy by layer

### Math layer
High confidence unit tests.

### Scene helpers
Focused tests on coordinate conversion and non-trivial helper logic.

### Module UI
Component/integration tests for key flows:
- drag/update
- toggle/update
- preset load
- explanation sync

### Backend
Smoke tests only at first:
- index route
- static asset configuration
- future API tests when APIs exist

## 8. Design decisions

- SVG is the default for 2D because the visuals are discrete, geometric, and label-heavy.
- R3F is the default for interactive 3D scenes.
- Client-side math is the default because the app should remain lightweight on the server.
- Workers are an optimization boundary, not a default destination for all logic.

## 9. Architectural risks to manage

- mixing math and UI too early
- turning modules into isolated one-off demos with no shared primitives
- overusing workers before measurement
- adding backend behavior prematurely
- cluttering the UI with too much text or too many controls
