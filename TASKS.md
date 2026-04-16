# Task Backlog

Use this file as the high-level implementation queue.

## Status key

- `[ ]` not started
- `[~]` in progress
- `[x]` done
- `[!]` blocked / needs decision

---

## Foundation

- [x] Create docs-first starter repository
- [ ] Run `FIRST_PROMPT.md` in Codex Ask/Plan mode
- [x] Scaffold `frontend/` with React + TypeScript + Vite
- [x] Scaffold `backend/` with Django host shell
- [x] Add build/lint/test quality gates
- [x] Add base README instructions for local development

## Frontend core

- [x] Create app shell and module navigation
- [ ] Create shared UI primitives for controls and panels
- [ ] Create content/preset loading strategy
- [x] Define domain types for vectors and matrices
- [x] Implement pure math core for v1 operations
- [x] Add tests for pure math core

## 2D scene foundation

- [x] Axes primitive
- [x] Grid primitive
- [x] Vector arrow primitive
- [x] Label primitive
- [x] Angle arc primitive
- [x] Polygon / area highlight primitive
- [x] Drag interaction helpers
- [x] Scene-to-data coordinate mapping tests

## Module 1 - Vector 2D

- [x] Vector 2D screen
- [x] Add/subtract/scale controls
- [x] Tail-to-head and parallelogram views
- [x] Live algebra panel
- [x] Pedagogical presets
- [x] Module tests

## Module 2 - Dot product

- [ ] Dot product screen
- [ ] Projection visualization
- [ ] Angle + cosine view
- [ ] Positive / zero / negative state callouts
- [ ] Unit-vector teaching mode
- [ ] Module tests

## Module 3 - Matrix 2D and determinant

- [ ] Matrix 2D edit controls
- [ ] Matrix add/subtract/scale interaction
- [ ] Matrix-vector multiplication view
- [ ] Transformed basis view
- [ ] Transformed grid view
- [ ] Unit square to parallelogram determinant view
- [ ] Orientation flip indicator
- [ ] Module tests

## 3D foundation

- [ ] Shared R3F canvas wrapper
- [ ] Axes helper
- [ ] Vector mesh helper
- [ ] Camera / controls setup
- [ ] Overlay strategy for labels and explanations

## Module 4 - Cross product

- [ ] Cross product screen
- [ ] Parallelogram visualization
- [ ] Sine-of-angle visualization
- [ ] Normal vector visualization
- [ ] Operand-order swap mode
- [ ] Module tests

## Module 5 - Matrix 3D

- [ ] Matrix 3D edit controls
- [ ] Matrix add/subtract/scale interaction
- [ ] Matrix-vector multiplication view
- [ ] Basis transformation view
- [ ] Unit cube to parallelepiped view
- [ ] Determinant as volume scale
- [ ] Module tests

## Module 6 - Eigen

- [ ] Eigen screen
- [ ] Candidate vector selection
- [ ] `A v` overlay
- [ ] `? v` overlay
- [ ] Difference vector overlay
- [ ] Presets for special cases
- [ ] 2D no-real-eigenvector rotation case
- [ ] Module tests

## Performance and workers

- [ ] Identify candidate heavy computations
- [ ] Add worker boundary only where justified
- [ ] Add worker tests / fallback strategy
- [ ] Verify UI responsiveness with larger scenes

## Pedagogy layer

- [ ] Preset system
- [ ] Explanation text mapping
- [ ] "What to notice" panel
- [ ] Compare mode
- [ ] Prediction-before-reveal mode
- [ ] Challenge prompts

## Deployment and release

- [ ] Frontend production build wired into Django
- [ ] Django static handling configured
- [ ] Local dev instructions finalized
- [ ] Release checklist
- [ ] Smoke test deployed shell

## Phase 2 / backlog

- [ ] Jacobian / polar coordinates module
- [ ] Saved presets
- [ ] Account system
- [ ] Analytics
- [ ] Teacher mode
