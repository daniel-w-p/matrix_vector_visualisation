# Vector Lab - AI-Built Linear Algebra Learning App

Vector Lab is a web-first educational app for learning linear algebra through direct manipulation, visual intuition, and synchronized algebraic views.

The app teaches vectors, dot product, cross product, matrices, determinants, and eigen concepts.
It is intentionally not a calculator-first tool.

## How This App Was Created

This project was built with a strong AI-assisted workflow in just two evenings.

- GPT-5.4 first analyzed the product idea and prepared the initial repository structure.
- GPT-5.4 generated the core project documentation for Codex (large contribution): scope, architecture, roadmap, tasks, and prompt sequence.
- Codex then implemented the app step by step using prompts from `prompts/`.
- The developer supervised each step, added ongoing corrections and practical instructions during execution, and made directional decisions.
- Some of those runtime instructions were intentionally not stored in the repository, so the process can later be compared with a "just say continue" prompt flow.

A key takeaway from this project: topic knowledge still matters. AI accelerates delivery, but quality depended on active domain-aware supervision.

## Dual Educational Value

This project has two educational layers:

1. Linear algebra learning itself through interactive visualization.
2. Public AI engineering case study: the full repo shows how to build a real app collaboratively with AI.

## Product Intent

Build a web app that helps learners see and manipulate linear algebra ideas:

- vector addition, subtraction, and scaling
- dot product as projection and cosine of angle
- cross product as oriented area and normal direction
- matrix addition, subtraction, scaling, and matrix-vector multiplication
- determinant as area/volume scaling and orientation change
- eigenvalues and eigenvectors with live verification of `A v = lambda v`

## Architecture Overview

The app is client-heavy by design.

- Frontend owns math, interaction, and rendering.
- Backend (Django) is intentionally thin and focused on hosting.
- Math logic, rendering logic, and teaching content are separated.

### Frontend structure

- `frontend/src/math/` - pure math functions (typed, testable)
- `frontend/src/scene2d/` - reusable SVG scene primitives for 2D
- `frontend/src/scene3d/` - reusable 3D helpers for R3F/Three.js
- `frontend/src/modules/` - module-specific UI and interaction flows
- `frontend/src/content/` - lesson text, presets, and pedagogical content
- `frontend/src/app/` - app shell, navigation, preferences, shared contexts

### Backend structure

- `backend/` - Django host shell
- Serves HTML shell and built frontend assets
- Keeps room for optional future API endpoints

## Technology Stack

- Frontend: React + TypeScript + Vite
- 2D rendering: SVG
- 3D rendering: React Three Fiber + Three.js
- Testing: Vitest + Testing Library
- Linting: ESLint
- Backend host: Django

## Third-Party Software

Vector Lab uses open-source third-party software, including:

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - static typing
- [Vite](https://vite.dev/) - frontend build tool and dev server
- [Three.js](https://threejs.org/) - 3D graphics engine
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) - React renderer for Three.js
- [@react-three/drei](https://github.com/pmndrs/drei) - utility helpers for R3F scenes
- [Vitest](https://vitest.dev/) - unit/integration testing
- [Testing Library](https://testing-library.com/) - UI testing utilities
- [ESLint](https://eslint.org/) - code quality checks
- [Django](https://www.djangoproject.com/) - backend hosting layer

Please review each dependency license in `package.json` / lockfiles before production distribution.

## Prompt-Driven Development Flow

Recommended usage pattern:

1. Start from `FIRST_PROMPT.md`.
2. Run prompts from `prompts/` one by one.
3. Review and adjust after each step.
4. Keep changes small and verifiable.

Do not paste the full prompt sequence into one session.

## Repository Map

- `AGENTS.md` - standing instructions for Codex
- `PRODUCT_SPEC.md` - product scope and teaching goals
- `ARCHITECTURE.md` - technical structure and ownership
- `ROADMAP.md` - milestone order
- `TASKS.md` - prioritized backlog
- `PROMPTS.md` - index of prompt sequence
- `FIRST_PROMPT.md` - first prompt to run
- `PLANS_TEMPLATE.md` - planning template for larger tasks
- `docs/modules/` - module feature specs
- `docs/ux/` - UI and pedagogy notes
- `docs/deployment/` - Django hosting plan
- `prompts/` - copy-paste prompt files for Codex

## Recommended Build Order

1. Frontend scaffold
2. Django host scaffold
3. Quality gates
4. Pure math core
5. SVG scene foundation
6. Vector 2D module
7. Dot product module
8. Matrix 2D + determinant module
9. 3D foundation
10. Cross product module
11. Matrix 3D module
12. Eigen module
13. Workers and performance
14. Django integration and release polish

## Local Commands

### Frontend

- install dependencies: `cd frontend && npm install`
- run dev server: `cd frontend && npm run dev`
- lint: `cd frontend && npm run lint`
- tests: `cd frontend && npm run test`
- production build: `cd frontend && npm run build`

### Backend

- install dependencies: `cd backend && py -3 -m pip install -r requirements.txt`
- run development server: `cd backend && py -3 manage.py runserver`
- Django system checks: `cd backend && py -3 manage.py check`
- backend tests: `cd backend && py -3 manage.py test vectorlab_web`

## Working Principle

Priorities for this project:

1. conceptual clarity
2. stable architecture
3. incremental delivery
4. visual quality
5. performance optimization
6. backend expansion only when truly needed
